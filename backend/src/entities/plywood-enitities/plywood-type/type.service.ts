import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma/prisma.service';
import { ErrorService } from 'common/error/error.service';

@Injectable()
export class TypeService {
  constructor(private readonly prismaService: PrismaService, private readonly errorService: ErrorService) {}

  async getAll() {
    return Promise.resolve(undefined);
  }

  async getById(id: number) {
    return Promise.resolve(undefined);
  }

  async add(dto) {
    return Promise.resolve(undefined);
  }

  async update(id: number, dto) {
    return Promise.resolve(undefined);
  }

  async remove(id: number) {
    return Promise.resolve(undefined);
  }
}
