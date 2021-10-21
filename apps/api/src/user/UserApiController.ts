import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UserApiService } from './UserApiService';
import { User } from '@app/entity/domain/user/User.entity';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from '@app/common-config/res/ResponseEntity';
import { UserShowDto } from './dto/UserShowDto';
import { LocalDateTime } from 'js-joda';
import { UserSignupReq } from './dto/UserSignupReq';
import { plainToClass } from 'class-transformer';

@Controller('/user')
@ApiTags('유저 API')
export class UserApiController {
  constructor(
    private readonly userApiService: UserApiService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get('/hello')
  @ApiOperation({
    summary: '테스트 API',
  })
  @ApiOkResponse({
    description: '테스트 API.',
    type: ResponseEntity,
  })
  getHello(): ResponseEntity<string> {
    this.logger.info('>>>>>>>>>>> Test');
    return ResponseEntity.OK_WITH(this.userApiService.getHello());
  }

  @Get('/show')
  show(): ResponseEntity<UserShowDto> {
    return ResponseEntity.OK_WITH(
      new UserShowDto(
        User.signup('KilDong', 'Hong', LocalDateTime.of(2021, 10, 17, 0, 0, 0)),
      ),
    );
  }

  @Get('/')
  async getUsers(): Promise<User[]> {
    return await this.userApiService.findAll();
  }

  @Post('/signup')
  async signup(
    @Body() userSignupReq: UserSignupReq,
  ): Promise<ResponseEntity<string>> {
    const dto = plainToClass(UserSignupReq, userSignupReq);
    try {
      await this.userApiService.signup(dto.toEntity());
      return ResponseEntity.OK();
    } catch (e) {
      this.logger.error(`dto = ${JSON.stringify(userSignupReq)}`, e);
      return ResponseEntity.ERROR_WITH('회원 가입에 실패하였습니다.');
    }
  }
}
