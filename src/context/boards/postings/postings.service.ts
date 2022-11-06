import {
  Customer,
  CustomerPostingFilter,
  filterToAgeRange,
  filterToConsider,
  filterToIngredient,
  Pharmacist,
  Prisma,
} from '@prisma/client';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostingDto, OrderBy } from './dto/postings.dto';

@Injectable()
export class PostingsService {
  constructor(private prismaService: PrismaService) {}

  async createPosting(
    createPostingDto: CreatePostingDto,
    pharmacist: Pharmacist,
  ) {
    const {
      title,
      content,
      merchandiseIds,
      ingredientIds,
      ageIds,
      considerIds,
      gender,
    } = createPostingDto;

    if (!title.length || !content.length)
      throw new InternalServerErrorException();

    const postingToMerchandiseCreateManyInput = merchandiseIds.map(
      (merchandiseId) => {
        return { merchandiseId };
      },
    );
    const postingToAgeRangeCreateManyInput = ageIds.map((ageRangeId) => {
      return { ageRangeId };
    });
    const postingToConsiderCreateManyInput = considerIds.map((considerId) => {
      return { considerId };
    });
    const postingToIngredientCreateManyInput = ingredientIds.map(
      (ingredientId) => {
        return { ingredientId };
      },
    );

    const createdPosting = await this.prismaService.posting.create({
      data: {
        title,
        content,
        pharmacistId: pharmacist.id,
        MerchandiseToPosting: {
          createMany: { data: postingToMerchandiseCreateManyInput },
        },
        PostingToAgeRange: {
          createMany: { data: postingToAgeRangeCreateManyInput },
        },
        PostingToConsider: {
          createMany: { data: postingToConsiderCreateManyInput },
        },
        PostingToIngredient: {
          createMany: { data: postingToIngredientCreateManyInput },
        },
        gender,
      },
      include: {
        MerchandiseToPosting: {
          select: {
            merchandise: { select: { Image: { select: { url: true } } } },
          },
        },
        PostingToAgeRange: { select: { ageRange: { select: { name: true } } } },
        PostingToIngredient: {
          select: { ingredient: { select: { name: true } } },
        },
        PostingToConsider: { select: { consider: { select: { name: true } } } },
      },
    });

    return { result: createdPosting, message: '칼럼작성 완료!' };
  }

  async getPosting(id: number, customer?: Customer) {
    const posting = await this.prismaService.posting.findUnique({
      where: { id },
      include: {
        pharmacist: {
          select: {
            userName: true,
            pharmacyName: true,
            pharmacyAddress: true,
            Image: true,
          },
        },
        postingLikes: { where: { customerId: customer ? customer.id : null } },
        MerchandiseToPosting: {
          include: {
            merchandise: {
              include: { Image: { select: { url: true } }, Comment: true },
            },
          },
        },
        PostingToAgeRange: { select: { ageRange: { select: { name: true } } } },
        PostingToConsider: { select: { consider: { select: { name: true } } } },
        PostingToIngredient: {
          select: { ingredient: { select: { name: true } } },
        },
      },
    });

    return { result: posting, message: `${id}번 칼럼 조회 완료` };
  }

  async getPostings(customer?: Customer, orderBy?: OrderBy, keyword?: string) {
    let whereArg = {};
    let postingFilter;
    if (customer) {
      postingFilter = await this.prismaService.customerPostingFilter.findUnique(
        {
          where: { customerId: customer.id },
          include: {
            filterToAgeRange: { select: { ageRangeId: true } },
            filterToConsider: { select: { considerId: true } },
            filterToIngredient: { select: { ingredientId: true } },
          },
        },
      );
      const ageRangeIds: number[] = postingFilter
        ? postingFilter.filterToAgeRange.map(
            (filterToAgeRange: filterToAgeRange) => filterToAgeRange.ageRangeId,
          )
        : [];
      const considerIds: number[] = postingFilter
        ? postingFilter.filterToConsider.map(
            (filterToConsider: filterToConsider) => filterToConsider.considerId,
          )
        : [];
      const ingredientIds: number[] = postingFilter
        ? postingFilter.filterToIngredient.map(
            (filterToIngredient: filterToIngredient) =>
              filterToIngredient.ingredientId,
          )
        : [];

      whereArg = {
        PostingToAgeRange: { some: { ageRangeId: { in: ageRangeIds } } },
        PostingToConsider: { some: { considerId: { in: considerIds } } },
        PostingToIngredient: { some: { ingredientId: { in: ingredientIds } } },
        gender: postingFilter ? { equals: postingFilter.gender } : {},
      };
    }

    if (keyword)
      Object.assign(whereArg, {
        OR: [
          { content: { contains: keyword } },
          { title: { contains: keyword } },
        ],
      });

    let postings = await this.prismaService.posting.findMany({
      where: whereArg,
      include: {
        pharmacist: {
          select: {
            userName: true,
            pharmacyName: true,
            pharmacyAddress: true,
            Image: { select: { url: true } },
          },
        },
        postingLikes: { where: { customerId: customer ? customer.id : null } },
        MerchandiseToPosting: { select: { merchandise: true } },
        PostingToAgeRange: { select: { ageRange: { select: { name: true } } } },
        PostingToConsider: { select: { consider: { select: { name: true } } } },
        PostingToIngredient: {
          select: { ingredient: { select: { name: true } } },
        },
      },
      orderBy:
        orderBy === OrderBy.likes
          ? { postingLikes: { _count: 'desc' } }
          : { createdAt: 'desc' },
    });

    if (!postings.length)
      postings = await this.prismaService.posting.findMany({
        include: {
          pharmacist: {
            select: {
              userName: true,
              pharmacyName: true,
              pharmacyAddress: true,
              Image: { select: { url: true } },
            },
          },
          postingLikes: {
            where: { customerId: customer ? customer.id : null },
          },
          MerchandiseToPosting: { select: { merchandise: true } },
          PostingToAgeRange: {
            select: { ageRange: { select: { name: true } } },
          },
          PostingToConsider: {
            select: { consider: { select: { name: true } } },
          },
          PostingToIngredient: {
            select: { ingredient: { select: { name: true } } },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

    return { result: postings, message: '칼럼 조회 완료' };
  }

  // async updatePosting(id: number, posting: Posting, pharmacist: Pharmacist) {
  //   const { title, content } = posting;

  //   const _posting = await this.prismaService.posting.findFirst({
  //     where: { id, pharmacistId: pharmacist.id },
  //   });

  //   const updatedPosting = await this.prismaService.posting.update({
  //     where: { id: _posting.id },
  //     data: {
  //       title,
  //       content,
  //     },
  //     include: {
  //       pharmacist: {
  //         select: { userName: true, pharmacyName: true, pharmacyAddress: true },
  //       },
  //     },
  //   });

  //   return { result: updatedPosting, message: '칼럼이 수정되었습니다' };
  // }

  async toggleLike(id: number, customer: Customer) {
    const postingId = id;
    const like = await this.prismaService.postingLikes.findUnique({
      where: { postingId_customerId: { customerId: customer.id, postingId } },
    });

    const message = like ? '좋아요 취소 완료' : '좋아요 완료';

    const updatedLike = like
      ? await this.prismaService.postingLikes.delete({
          where: {
            postingId_customerId: { customerId: customer.id, postingId },
          },
        })
      : await this.prismaService.postingLikes.create({
          data: { customerId: customer.id, postingId },
        });

    return { result: updatedLike, message };
  }
}
