import { ROLE } from 'src/constant/account.constant';
import { PrismaService } from 'src/prisma/prisma.service';
import { Customer, SignInDto } from './dto/customer.dto';
import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {JwtPayload, sign} from 'jsonwebtoken'
@Injectable()
export class CustomersService {
  constructor(private prismaService: PrismaService) {}
  async customerSignup(customer: Customer, customerSignUpSecret: string) {
    const { email, password, nickname, age, activity, gender, provider } =
      customer;
    
    console.log(customer)
    const CUSTOMER_PASSWORD_SALT = parseInt(process.env.CUSTOMER_PASSWORD_SALT);

    if (customerSignUpSecret !== process.env.CUSTOMER_SIGNUP_SECRET)
      throw new BadRequestException();

    const isExist = await this.prismaService.customer.findFirst({
      where: { email },
    });
    if (isExist) throw new InternalServerErrorException();

    const hashedPassword = await bcrypt.hash(password, CUSTOMER_PASSWORD_SALT);

    const _customer = await this.prismaService.customer.create({
      data: {
        email,
        password: hashedPassword,
        nickname,
        activity,
        gender,
        provider,
        age,
      },
    });
    delete _customer.password

    return { result: _customer, message: '회원가입 완료' };
  }

  async customerSignIn(signInDto : SignInDto) {
    const{ email, password} = signInDto;
    const customer = await this.prismaService.customer.findUnique({
      where: { email },
    });

    const validatePassword = await bcrypt.compare(
      password,
      customer.password,
    );

    if (!email || !validatePassword) {
      throw new BadRequestException();
    }

    const payload: JwtPayload = {
      sub: customer.email,
      role: ROLE.CUSTOMER,
      username: customer.nickname,
    };

 
    const secret = process.env.CUSTOMER_JWT_SECRET ;
    const expiresIn = '3h';
    const token = sign(payload, secret, { expiresIn });

    
    return { result: token, message: 'Login success' };
  }
}
//TODO 로그인, 토큰을 쿠키에 담아서 로그인 상태 유지 하기 
// 궁국적으로 약사만 글을 쓸수 있게 
// ci-cd 관심은(깃허브액션 사용) 있으나 도저언!! 
// 로그인까지 해보고 깃헙액션 공부
