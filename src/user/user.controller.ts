import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
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
}
