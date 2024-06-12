import { Injectable } from '@nestjs/common';
import { DentistRepository } from './dentist.repository';
import { Dentist } from '@prisma/client';
import { DentistDto } from 'src/dtos';

@Injectable()
export class DentistService {
  constructor(private readonly repository: DentistRepository) {}

  async addDentist(data: DentistDto): Promise<Dentist> {
    return this.repository.addDentist(data);
  }

  async getAllDentist(): Promise<Dentist[]> {
    return this.repository.getAllDentist();
  }
}
