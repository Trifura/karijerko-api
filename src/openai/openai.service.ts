import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import OpenAIApi, { OpenAI } from 'openai';
import { ChatCompletion } from 'openai/resources';
import { ConfigService } from '@nestjs/config';
import ChatCompletionMessageParam = OpenAI.ChatCompletionMessageParam;
import { AssistantMessage } from '../assistant/entities/assistant_message.entity';
import { GeneralMessage } from '../assistant/entities/general_message.entity';

@Injectable()
export class OpenAIService {
  public openAi: OpenAIApi;

  constructor(private configService: ConfigService) {
    // Inject the OpenAIApi instance
    // Initialize OpenAIApi with the provided API key from the environment
    this.openAi = new OpenAIApi({
      apiKey: this.configService.get('OPEN_AI_SECRET_KEY'),
    });
  }

  async chatGptRequest(
    prompt: string,
    systemPrompt: string,
    messages?: AssistantMessage[] | GeneralMessage[],
  ): Promise<string> {
    try {
      // Convert message history to the format expected by the OpenAI API
      const history = messages.map(
        (message): ChatCompletionMessageParam => ({
          role: message.role,
          content: message.content,
        }),
      );

      // Make a request to the ChatGPT model
      const completion: ChatCompletion =
        await this.openAi.chat.completions.create({
          model: 'gpt-3.5-turbo-0125',
          messages: [
            { role: 'system', content: systemPrompt },
            ...history,
            { role: 'user', content: prompt },
          ],
          // temperature: 0.5,
          // max_tokens: 1000,
        });

      // Extract the content from the response
      const [content] = completion.choices.map(
        (choice) => choice.message.content,
      );

      return content;
    } catch (e) {
      // Log and propagate the error
      console.error(e);
      throw new ServiceUnavailableException('Failed request to ChatGPT');
    }
  }
}
