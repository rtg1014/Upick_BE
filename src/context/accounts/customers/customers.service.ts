import { ROLE } from 'src/constant/account.constant';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  SignInDto,
  SignInKakaoRequestDto,
  SignUpDto,
  UpdateCustomerDto,
} from './dto/customer.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtPayload, sign } from 'jsonwebtoken';
import * as qs from 'qs';
import axios from 'axios';
import { Provider, Customer } from '@prisma/client';
@Injectable()
export class CustomersService {
  constructor(private prismaService: PrismaService) {}

  async customerSignup(signUpDto: SignUpDto) {
    const { email, password, name, confirmPassword } = signUpDto;
    const CUSTOMER_PASSWORD_SALT = parseInt(process.env.CUSTOMER_PASSWORD_SALT);

    if (password !== confirmPassword) throw new BadRequestException();

    const isExist = await this.prismaService.customer.findUnique({
      where: { email },
    });

    if (isExist) throw new BadRequestException(`It's existing email`);

    const hashedPassword = await bcrypt.hash(password, CUSTOMER_PASSWORD_SALT);
    const _customer = await this.prismaService.customer.create({
      data: {
        email,
        password: hashedPassword,
        name,
        provider: Provider.local,
      },
    });
    delete _customer.password;

    return { result: _customer, message: '회원가입 완료' };
  }

  async customerSignIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const customer = await this.prismaService.customer.findUnique({
      where: { email },
    });
    if (!customer) throw new BadRequestException('일치하는 아이디 없음');

    const validatePassword = await bcrypt.compare(password, customer.password);

    if (!email || !validatePassword) {
      throw new BadRequestException();
    }
    const token = this.createToken(customer);

    return { result: token, message: '로그인 완료' };
  }

  async signInKakao(signInKakaoRequestDto: SignInKakaoRequestDto) {
    const { code, redirectUri } = signInKakaoRequestDto;

    if (!code || !redirectUri) throw new Error('?');
    const client_id = process.env.CLIENT_ID;
    const kakaoTokenUrl = 'https://kauth.kakao.com/oauth/token';
    const data = qs.stringify({
      grant_type: 'authorization_code',
      client_id: client_id,
      redirect_uri: redirectUri,
      code,
    });
    const kakaoTokenOptions = {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    };

    const kakaoToken = await axios
      .post(kakaoTokenUrl, data, kakaoTokenOptions)
      .then((res) => res.data.access_token);

    const kakaoIdUrl = 'https://kapi.kakao.com/v1/user/access_token_info';
    const kakaoIdOptions = {
      headers: { Authorization: `Bearer ${kakaoToken}` },
    };

    const kakaoId = await axios
      .get(kakaoIdUrl, kakaoIdOptions)
      .then((res) => String(res.data.id));

    const customer = await this.prismaService.customer.upsert({
      where: {
        provider_providerId: { provider: Provider.kakao, providerId: kakaoId },
      },
      create: { provider: Provider.kakao, providerId: kakaoId },
      update: {},
    });

    const token = this.createToken(customer);
    return { result: token, message: '카카오 로그인 완료' };
  }

  createToken(customer: Customer) {
    const payload: JwtPayload = {
      sub: customer.email,
      role: ROLE.CUSTOMER,
    };

    const secret = process.env.CUSTOMER_JWT_SECRET;
    const expiresIn = '3h';
    const token = sign(payload, secret, { expiresIn });

    return token;
  }

  async addTakingMedicine(merchandiseId: number, customer: Customer) {
    const addedTakingMedicine = await this.prismaService.takingMedicine.create({
      data: { customerId: customer.id, merchandiseId },
    });

    return { result: addedTakingMedicine, message: '복용중인 약 추가 완료!' };
  }

  async deleteTakingMedicine(merchandiseId: number, customer: Customer) {
    const deletedTakingMedicine =
      await this.prismaService.takingMedicine.delete({
        where: {
          merchandiseId_customerId: { customerId: customer.id, merchandiseId },
        },
      });

    return { result: deletedTakingMedicine, message: '복용중인 약 삭제 완료!' };
  }

  async updateCustomer(
    customer: Customer,
    updateCustomerDto: UpdateCustomerDto,
  ) {
    const {
      name,
      age,
      gender,
      isPregnant,
      isBreastFeed,
      considerIds,
      medicineNames,
      stroke,
      heartDisease,
      highBloodPressure,
      diabetes,
      etc,
      takingExcerciseTimePerAWeek,
      memo,
    } = updateCustomerDto;

    const CustomerToConsiderCreateManyInput = considerIds.map((num) => {
      return { considerId: num };
    });
    const merchandiseIdsByMedicineName =
      await this.prismaService.merchandise.findMany({
        where: { name: { in: medicineNames } },
        select: { id: true },
      });
    const takingMedicineCreateManyInput = merchandiseIdsByMedicineName.map(
      (e) => {
        return { merchandiseId: e.id };
      },
    );

    // 기존에 연결된 다대다 테이블 삭제
    await this.prismaService.customerToConsider.deleteMany({
      where: { customerId: customer.id },
    });
    await this.prismaService.takingMedicine.deleteMany({
      where: { customerId: customer.id },
    });

    const updatedCustomer = await this.prismaService.customer.update({
      where: { id: customer.id },
      data: {
        name,
        age,
        gender,
        isPregnant,
        isBreastFeed,
        CustomerToConsider: {
          createMany: { data: CustomerToConsiderCreateManyInput },
        },
        TakingMedicine: {
          createMany: { data: takingMedicineCreateManyInput },
        },
        CustomerDetails: {
          create: {
            stroke,
            diabetes,
            heartDisease,
            highBloodPressure,
            etc,
            takingExcerciseTimePerAWeek,
            memo,
          },
        },
      },
    });

    return { result: updatedCustomer, message: '마이픽 정보 수정 완료' };
  }

  async getCustomer(customer: Customer) {
    const _customer = await this.prismaService.customer.findUnique({
      where: { id: customer.id },
      select: {
        name: true,
        gender: true,
        age: true,
        isBreastFeed: true,
        isPregnant: true,
        CustomerToConsider: { select: { considerId: true } },
        TakingMedicine: { select: { merchandise: true } },
        CustomerDetails: true,
      },
    });
    const randomNumbers = [];
    for (let i = 0; i < 4; i++) {
      const randomNumber = Math.round(Math.random() * 10) + 1;
      randomNumbers.push(randomNumber);
    }
    const merchandises = await this.prismaService.merchandise.findMany({
      where: { id: { in: randomNumbers } },
      select: { id: true, Image: true, company: true, name: true },
    });

    return {
      result: { _customer, merchandises },
      message: '마이픽 조회 완료',
    };
  }

  async getMerchandisesHaveToPick(customer: Customer) {
    const merchandises = await this.prismaService.merchandise.findMany({
      where: {
        CustomerPickUps: { some: { customerId: customer.id, isPicked: false } },
      },
      include: { CustomerPickUps: true },
    });

    return {
      result: merchandises,
      message: '픽업할 상품 조회 완료',
    };
  }

  async getMerchandisesIPicked(customer: Customer) {
    const merchandises = await this.prismaService.merchandise.findMany({
      where: {
        CustomerPickUps: { some: { customerId: customer.id, isPicked: true } },
      },
      include: { CustomerPickUps: true },
    });

    return {
      result: merchandises,
      message: '픽업한 상품 조회 완료',
    };
  }

  async getMerchandisesILike(customer: Customer) {
    const merchandises = await this.prismaService.merchandise.findMany({
      where: { MerchandiseLikes: { some: { customerId: customer.id } } },
    });

    return {
      result: merchandises,
      message: '찜한 상품 조회 완료',
    };
  }

  async getPostingsILike(customer: Customer) {
    const postings = await this.prismaService.posting.findMany({
      where: { postingLikes: { some: { customerId: customer.id } } },
    });

    return {
      result: postings,
      message: '찜한 칼럼 조회 완료',
    };
  }

  async getPharmacistsILike(customer: Customer) {
    const pharmacists = await this.prismaService.pharmacist.findMany({
      where: { PharmacistLikes: { some: { customerId: customer.id } } },
    });

    return {
      result: pharmacists,
      message: '찜한 약사 조회 완료',
    };
  }
}
