import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyService } from '../company/company.service';
import { OpenAIService } from '../openai/openai.service';
import {
  AssistantMessage,
  AssistantMessageRole,
} from './entities/assistant_message.entity';
import { CreateAssistantMessageDto } from './dto/create-assistant-message.dto';
import { QueryAssistantMessageDto } from './dto/query-assistant-message.dto';
import { CreateGeneralMessageDto } from './dto/create-general-message.dto';
import { GeneralMessage } from './entities/general_message.entity';
import { Company } from '../company/entities/company.entity';

@Injectable()
export class AssistantService {
  constructor(
    @InjectRepository(AssistantMessage)
    private assistantMessageRepository: Repository<AssistantMessage>,
    @InjectRepository(GeneralMessage)
    private generalMessageRepository: Repository<GeneralMessage>,
    private company: CompanyService,
    private openAIService: OpenAIService,
  ) {}

  async sendMessage(
    createAssistantMessageDto: CreateAssistantMessageDto,
    companyId: string,
    user: User,
  ) {
    // Fetch company
    const company = await this.company.findOne(companyId);

    // Fetch messages or receive from client???
    const oldMessages = await this.fetchMessages({
      userId: user.id,
      companyId: company.id,
    });

    // Save user's message
    const newMessage = await this.assistantMessageRepository.save({
      user,
      company,
      content: createAssistantMessageDto.content,
      role: AssistantMessageRole.USER,
    });

    // Get AI response
    const systemPrompt = `You are a career assistant.
    The whole conversation should be only in Croatian language.
    The assistant is helpful, creative, clever, and very friendly.
    The assistant should give career advice on how to impress this company.
    Messages should be short and direct.
    In the first few messages feel free to ask the user about more information about him.
    When you have enough information about the user, give him portfolio and project ideas that will be useful for this company, project ideas should be very specific and short (like a list).
    If the user starts the message with No or negative tone it means he doesn't want to talk.
    Company name: ${company.name}. Company description: ${company.description}`;

    const assistantResponse = await this.openAIService.chatGptRequest(
      newMessage.content,
      systemPrompt,
      oldMessages,
    );

    // Save AI response
    await this.assistantMessageRepository.save({
      user,
      company,
      content: assistantResponse,
      role: AssistantMessageRole.ASSISTANT,
    });
    // Return AI response

    return { content: assistantResponse };
  }

  async fetchMessages(query: QueryAssistantMessageDto) {
    const { userId, companyId } = query;

    const qb = this.assistantMessageRepository
      .createQueryBuilder('assistant_message')
      .leftJoin('assistant_message.company', 'company')
      .leftJoin('assistant_message.user', 'user')
      .orderBy('assistant_message.created_at', 'ASC');

    if (userId) {
      qb.andWhere('user.id = :userId', { userId });
    }

    if (companyId) {
      qb.andWhere('company.id = :companyId', { companyId });
    }

    return await qb.getMany();
  }

  async fetchCompanies(userId: string) {
    const qb = this.assistantMessageRepository
      .createQueryBuilder('assistantMessage')
      .innerJoinAndSelect('assistantMessage.company', 'company')
      .innerJoin('assistantMessage.user', 'user')
      .where('user.id = :userId', { userId })
      .distinct(true)
      .select([
        'company.id',
        'company.name',
        'company.slug',
        'company.profile_picture',
      ]);

    const rawCompanies = await qb.getRawMany();

    return rawCompanies.map((company) => ({
      id: company.company_id,
      name: company.company_name,
      slug: company.company_slug,
      profilePicture: company.profile_picture,
    }));
  }

  async sendGeneralMessage(
    createGeneralMessageDto: CreateGeneralMessageDto,
    user: User,
  ) {
    const oldMessages = await this.fetchGeneralMessages(user.id);
    const companies = await this.company.findAll();

    // Save user's message
    const newMessage = await this.generalMessageRepository.save({
      user,
      content: createGeneralMessageDto.content,
      role: AssistantMessageRole.USER,
    });

    const companyInfos = this.mapCompanies(companies);
    console.log(companyInfos);
    // Get AI response
    const systemPrompt = `You are a guide to companies. First ask the user what he's interested. 
      Then when you have enough information recommend him best companies for him.
      Speak only on Croatian language. And give really short answers (name of the company and their specialties).
      If there are no companies to recommend, say that you're sorry and that there'll be maybe in the future.
      Companies: ${companyInfos.join('\n')}
      `;

    const assistantResponse = await this.openAIService.chatGptRequest(
      newMessage.content,
      systemPrompt,
      oldMessages,
    );

    // Save AI response
    await this.generalMessageRepository.save({
      user,
      content: assistantResponse,
      role: AssistantMessageRole.ASSISTANT,
    });
    // Return AI response

    return { content: assistantResponse };
  }

  async fetchGeneralMessages(userId: number) {
    const qb = this.generalMessageRepository
      .createQueryBuilder('general_message')
      .leftJoin('general_message.user', 'user')
      .orderBy('general_message.created_at', 'ASC');

    if (userId) {
      qb.andWhere('user.id = :userId', { userId });
    }

    return await qb.getMany();
  }

  mapCompanies(companies: Company[]) {
    return companies.map((company) => {
      const { name, description, tagline } = company;

      const skillNames = company.skills.map((skill) => skill.name).join(', ');
      const industryName = company.industry?.nameHr;

      return `Name: ${name}. Description: ${description}. Tagline: ${tagline}. Industry: ${industryName}. Specialites: ${skillNames}`;
    });
  }
}
