import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterCompanyDto } from './dto/register-company.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('register/company')
  registerCompany(@Body() registerCompanyDto: RegisterCompanyDto) {
    return this.authService.registerCompany(
      registerCompanyDto.email,
      registerCompanyDto.password,
      registerCompanyDto.name,
    );
  }

  @Post('register/user')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(
      registerUserDto.email,
      registerUserDto.password,
      registerUserDto.firstName,
      registerUserDto.lastName,
    );
  }

  // Google login
  @Post('google')
  handleGoogleLogin(@Body() body: { accessToken: string }) {
    return { msg: body.accessToken };
  }
}
