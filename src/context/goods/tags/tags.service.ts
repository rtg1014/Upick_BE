import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

    const considerCreateManyInput = considers.map((e) => {
      return { name: e };
    });

    const createdConsiders = await this.prismaService.consider.createMany({
      data: considerCreateManyInput,
    });

    return { result: createdConsiders, message: '건강고민 생성 완료' };
  }
}
