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

@Injectable()
export class AssistantService {
  constructor(
    @InjectRepository(AssistantMessage)
    private assistantMessageRepository: Repository<AssistantMessage>,
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
}
