import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
  @IsNotEmpty()
  @MinLength(3)
  name!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  @MaxLength(32)
  password!: string;
}

export class LoginDto {
  @IsEmail()
  email!: string;

  @MinLength(6)
  @MaxLength(32)
  password!: string;
}
