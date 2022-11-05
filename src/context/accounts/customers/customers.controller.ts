import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Delete,
  Get,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import {
  SignInDto,
  SignInKakaoRequestDto,
  UpdateCustomerDto,
  SignUpDto,
} from './dto/customer.dto';
import { Customer } from 'src/decorators/customer.decorator';
import { Customer as TCustomer } from '@prisma/client';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLE } from 'src/constant/account.constant';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('sign-up')
  customerSignup(@Body() signUpDto: SignUpDto) {
    return this.customersService.customerSignup(signUpDto);
  }

  @Post('sign-in')
  customerSignIn(@Body() signInDto: SignInDto) {
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

  @Get('my-pick/details')
  @Roles(ROLE.CUSTOMER)
  getCustomer(@Customer() customer: TCustomer) {
    return this.customersService.getCustomer(customer);
  }

  @Patch('my-pick/details')
  @Roles(ROLE.CUSTOMER)
  updateCustomer(
    @Customer() customer: TCustomer,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.updateCustomer(customer, updateCustomerDto);
  }

  @Get('my-pick/pick-up-list/')
  @Roles(ROLE.CUSTOMER)
  getMerchandisesHaveToPick(@Customer() customer: TCustomer) {
    return this.customersService.getMerchandisesHaveToPick(customer);
  }

  @Get('my-pick/pick-up-list/picked')
  @Roles(ROLE.CUSTOMER)
  getMerchandisesIPicked(@Customer() customer: TCustomer) {
    return this.customersService.getMerchandisesHaveToPick(customer);
  }

  @Get('my-pick/like/merchandises')
  @Roles(ROLE.CUSTOMER)
  getMerchandisesILike(customer: TCustomer) {
    return this.customersService.getMerchandisesILike(customer);
  }

  @Get('my-pick/like/postings')
  @Roles(ROLE.CUSTOMER)
  getPostingsILike(customer: TCustomer) {
    return this.customersService.getPostingsILike(customer);
  }

  @Get('my-pick/like/pharmacists')
  @Roles(ROLE.CUSTOMER)
  getPharmacistsILike(customer: TCustomer) {
    return this.customersService.getPharmacistsILike(customer);
  }
}
