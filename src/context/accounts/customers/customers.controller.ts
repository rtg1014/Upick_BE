import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Delete,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { SignInDto, SignInKakaoRequestDto } from './dto/customer.dto';
import { Customer } from 'src/decorators/customer.decorator';
import { Customer as TCustomer } from '@prisma/client';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLE } from 'src/constant/account.constant';

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

  @Post('my-pick/taking-medicine/:merchandiseId')
  @Roles(ROLE.CUSTOMER)
  addTakingMedicine(
    @Param('merchandiseId', ParseIntPipe) merchandiseId: number,
    @Customer() customer: TCustomer,
  ) {
    return this.customersService.addTakingMedicine(merchandiseId, customer);
  }

  @Delete('my-pick/taking-medicine/:merchandiseId')
  @Roles(ROLE.CUSTOMER)
  deleteTakingMedicine(
    @Param('merchandiseId', ParseIntPipe) merchandiseId: number,
    @Customer() customer: TCustomer,
  ) {
    return this.customersService.deleteTakingMedicine(merchandiseId, customer);
  }
}
