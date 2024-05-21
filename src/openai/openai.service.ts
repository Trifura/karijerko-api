import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import OpenAIApi from 'openai';
import { ChatCompletion } from 'openai/resources';
import { ConfigService } from '@nestjs/config';

// Define a type for message objects
type Message = {
  text: string;
  ai?: boolean; // Indicate if the message is from the AI
};

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

  /**
   * Make a request to ChatGPT to generate a response based on a prompt and message history.
   * @param prompt - The prompt for the ChatGPT model
   * @param messages - An array of messages representing the conversation history
   * @returns A string containing the generated response
   */
  async chatGptRequest(prompt: string, messages?: Message[]): Promise<string> {
    try {
      // Convert message history to the format expected by the OpenAI API
      // const history = messages.map(
      //   (message): ChatCompletionMessageParam => ({
      //     role: message.ai ? 'assistant' : 'user',
      //     content: message.text,
      //   }),
      // );

      // Make a request to the ChatGPT model
      const completion: ChatCompletion =
        await this.openAi.chat.completions.create({
          model: 'gpt-3.5-turbo-0125',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: prompt },
          ],
          // temperature: 0.5,
          // max_tokens: 1000,
        });

      // Extract the content from the response
      const [content] = completion.choices.map(
        (choice) => choice.message.content,
      );

      console.log(completion.choices);

      return content;
    } catch (e) {
      // Log and propagate the error
      console.error(e);
      throw new ServiceUnavailableException('Failed request to ChatGPT');
    }
  }
}
