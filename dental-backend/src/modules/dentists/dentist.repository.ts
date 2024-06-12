import { Injectable } from '@nestjs/common';
import { Context } from '../../prisma/prisma.context';
import { Dentist } from '@prisma/client';
import { DentistDto } from 'src/dtos';

@Injectable()
export class DentistRepository {
  constructor(private readonly context: Context) {}

  async addDentist(data: DentistDto): Promise<Dentist> {
    return this.context.dentist.create({ data });
  }

  async getAllDentist(): Promise<Dentist[]> {
    return this.context.dentist.findMany({
      include: {
        appointments: true,
      },
    });
  }
}
