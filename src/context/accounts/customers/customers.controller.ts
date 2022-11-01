import { Merchandise } from '@prisma/client';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import {
  Customer as TCustomer,
  SignInDto,
  SignInKakaoRequestDto,
} from './dto/customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('sign-up')
  signUp(@Body() customer: TCustomer, customerSignUpSecret: string) {
    return this.customersService.customerSignup(customer, customerSignUpSecret);
  }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.customersService.customerSignIn(signInDto);
  }

  @Post('sign-in/kakao')
  signInKakao(@Body() signInKakaoRequestDto: SignInKakaoRequestDto) {
    return this.customersService.signInKakao(signInKakaoRequestDto);
  }

  @Get('my-pick/takenmedicine')
  getMedicine() {
    return this.customersService.getMedicine();
  }

  @Patch('my-pick/:merchandiseId')
  patchMedicine(
    @Param('merchandiseId', ParseIntPipe) merchandiseId: number,
    @Body('customerId') customerId: number,
  ) {
    return this.customersService.patchMedicine(merchandiseId, customerId);
  }
}
