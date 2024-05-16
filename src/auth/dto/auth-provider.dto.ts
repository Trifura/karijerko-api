import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class AuthProviderDto {
  @IsNotEmpty()
  @IsEnum(['google'])
  providerType: string;

  @IsString()
  @IsNotEmpty()
  providerId?: string;
}
