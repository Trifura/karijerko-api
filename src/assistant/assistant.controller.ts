import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { AssistantService } from './assistant.service';
import { AuthGuard } from '../auth/guards/Auth.guard';
import { CreateAssistantMessageDto } from './dto/create-assistant-message.dto';

@Controller('assistant')
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @UseGuards(AuthGuard)
  @Post('message/:companyId')
  sendMessage(
    @Request() req: any,
    @Param('companyId') companyId: string,
    @Body() createMessageDto: CreateAssistantMessageDto,
  ) {
    return this.assistantService.sendMessage(
      createMessageDto,
      companyId,
      req.account.user,
    );
  }

  @UseGuards(AuthGuard)
  @Get('messages/:companyId')
  fetchMessages(@Request() req: any, @Param('companyId') companyId: string) {
    const query = { userId: req.account.user.id, companyId };
    return this.assistantService.fetchMessages(query);
  }

  @UseGuards(AuthGuard)
  @Get('companies')
  fetchCompanies(@Request() req: any) {
    return this.assistantService.fetchCompanies(req.account.user.id);
  }
}
