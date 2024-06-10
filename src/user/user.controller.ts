import {
  Controller,
  Get,
  Query,
  UseGuards,
  Request,
  Post,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guards/Auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('feed')
  feed(@Request() req: any, @Query() query: any) {
    return this.userService.fetchFeed(req.account, +query.profileId);
  }

  @UseGuards(AuthGuard)
  @Post('subscription/:companyId')
  subscribe(@Request() req: any, @Param('companyId') companyId: string) {
    return this.userService.subscribeCompany(req.account, companyId);
  }

  @UseGuards(AuthGuard)
  @Delete('subscription/:companyId')
  unsubscribe(@Request() req: any, @Param('companyId') companyId: string) {
    return this.userService.unsubscribeCompany(req.account, companyId);
  }
}
