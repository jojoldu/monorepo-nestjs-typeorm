import { Injectable } from '@nestjs/common';
import { User } from '@app/entity/domain/user/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserName } from '@app/entity/domain/user/UserName';
import { UserApiQueryRepository } from './UserApiQueryRepository';
import { HtmlTemplate } from '@app/utils/HtmlTemplate';
import { EmailRequestDto } from './dto/EmailRequestDto';

@Injectable()
export class UserApiService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly userApiQueryRepository: UserApiQueryRepository,
    private readonly htmlTemplate: HtmlTemplate,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async signup(signupUser: User): Promise<void> {
    await this.userRepository.save(signupUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUserName(userId: number): Promise<UserName> {
    return await this.userApiQueryRepository.findUserName(userId);
  }

  async createMailDto(
    from: string,
    to: string,
    subject: string,
    templatePath: string,
    data?: any,
  ): Promise<EmailRequestDto> {
    const content = await this.htmlTemplate.templateFromFile(
      templatePath,
      data,
    );
    return new EmailRequestDto(from, to, subject, content);
  }
}
