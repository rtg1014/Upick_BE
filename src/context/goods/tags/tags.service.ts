import { Injectable, BadRequestException } from '@nestjs/common';
import { Customer, Gender } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePostingFilterDto } from './dto/tags.dto';

@Injectable()
export class TagsService {
  constructor(private prismaService: PrismaService) {}

  async makeSeed() {
    const isNotFirstTime = await this.prismaService.consider.findFirst({});
    if (isNotFirstTime)
      throw new BadRequestException(`It's not first time to make seed`);
    const considers = [
      '피로감',
      '눈 건강',
      '피부 건강',
      '체지방',
      '혈관 & 혈액순환',
      '간 건강',
      '장 건강',
      '스트레스 & 수면',
      '면역 기능',
      '혈중 콜레스테롤',
      '뼈 건강',
      '노화 & 항산화',
      '여성 건강',
      '소화 & 위식도 건강',
      '남성 건강',
      '혈압',
      '운동 능력 & 근육량',
      '두뇌활동',
      '혈당',
      '혈중 중성지방',
      '치아 & 잇몸',
      '임산부 & 태아건강',
      '탈모 & 손톱 건강',
      '관절 건강',
      '여성 갱년기',
      '호흡기 건강',
      '갑상선 건강',
      '빈혈',
    ];
    const ageRangs = ['20대 이하', '30대', '40대', '50대', '60대 이상'];

    const considerCreateManyInput = considers.map((e) => {
      return { name: e };
    });
    const ageRangeCreateManyInput = ageRangs.map((e) => {
      return { name: e };
    });

    const promises = [];
    const ageRangesPromise = this.prismaService.ageRange.createMany({
      data: ageRangeCreateManyInput,
    });
    const considersPromise = this.prismaService.consider.createMany({
      data: considerCreateManyInput,
    });
    promises.push(ageRangesPromise);
    promises.push(considersPromise);

    const seed = await Promise.all(promises);
    return { result: seed, message: '시드 생성 완료' };
  }

  async getAllTags() {
    const selectArg = {
      select: { id: true, name: true },
    };
    const tags = {
      ingredients: await this.prismaService.ingredient.findMany(selectArg),
      ageRanges: await this.prismaService.ageRange.findMany(selectArg),
      considers: await this.prismaService.consider.findMany(selectArg),
      gender: [Gender.male, Gender.female],
    };

    return { result: tags, message: '태그 조회 완료' };
  }

  async getCustomerPostingFilter(customer: Customer) {
    const customerPostingFilterSelectArg = {
      filterToAgeRange: {
        select: { ageRange: { select: { name: true } } },
      },
      filterToConsider: {
        select: { consider: { select: { name: true } } },
      },
      filterToIngredient: {
        select: { ingredient: { select: { name: true } } },
      },
      gender: true,
    };

    let customerPostingFilter =
      await this.prismaService.customerPostingFilter.findUnique({
        where: { customerId: customer.id },
        select: customerPostingFilterSelectArg,
      });

    if (!customerPostingFilter)
      customerPostingFilter =
        await this.prismaService.customerPostingFilter.create({
          data: { customerId: customer.id },
          select: customerPostingFilterSelectArg,
        });

    return { result: customerPostingFilter, message: '칼럼 필터 조회 완료' };
  }

  async updateCustomerPostingFilter(
    customer: Customer,
    updatePostingFilterDto: UpdatePostingFilterDto,
  ) {
    const { ageRangeIds, considerIds, gender, ingredientIds } =
      updatePostingFilterDto;

    const deleteManyArg = {
      where: { customerPostingFilter: { customerId: customer.id } },
    };
    const filterToAgeRangeCreateManyInput = ageRangeIds.map((ageRangeId) => {
      return { ageRangeId };
    });
    const filterToConsiderCreateManyInput = considerIds.map((considerId) => {
      return { considerId };
    });
    const filterToIngredientCreateManyInput = ingredientIds.map(
      (ingredientId) => {
        return { ingredientId };
      },
    );

    // delete origin data
    await this.prismaService.filterToAgeRange.deleteMany(deleteManyArg);
    await this.prismaService.filterToConsider.deleteMany(deleteManyArg);
    await this.prismaService.filterToIngredient.deleteMany(deleteManyArg);

    const updatedCustomerPostingFilter =
      await this.prismaService.customerPostingFilter.update({
        where: { customerId: customer.id },
        data: {
          gender,
          filterToAgeRange: {
            createMany: { data: filterToAgeRangeCreateManyInput },
          },
          filterToConsider: {
            createMany: { data: filterToConsiderCreateManyInput },
          },
          filterToIngredient: {
            createMany: { data: filterToIngredientCreateManyInput },
          },
        },
      });

    return {
      result: updatedCustomerPostingFilter,
      message: '칼럼 필터 변경 완료',
    };
  }
}
