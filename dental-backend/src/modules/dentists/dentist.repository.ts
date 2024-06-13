/* eslint-disable prettier/prettier */
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

  async getDentistById(id: number): Promise<any> {
    return this.context.dentist.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        surname: true,
        level: true,
        appointments: {
          select: {
            id: true,
            date: true,
            patient: {
              select: {
                id: true,
                name: true,
                surname: true,
              },
            },
            state: true,
            results: true,
          },
        },
      },
    });
  }
  

  async getAllDentist(): Promise<Dentist[]> {
    return this.context.dentist.findMany({
      include: {
        appointments: true,
        user: true,
      },
    });
  }
}
