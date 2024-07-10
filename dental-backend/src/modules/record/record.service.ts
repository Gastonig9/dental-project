/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { RecordRepository } from './record.repository';
import { MedicalHistoryRequestDto } from 'src/dtos/record.dto';
import { MedicalHistory } from '@prisma/client';

@Injectable()
export class RecordService {
  constructor(private readonly recordRepository: RecordRepository) {}

  async getAllRecords() {
    return this.recordRepository.getRecords();
  }

  async verifyPatientRecord(pId: number) {
    return this.recordRepository.verifyPatientRecord(pId);
  }

  async addNewRecord(data: MedicalHistoryRequestDto): Promise<MedicalHistory> {
    try {
      const { patientId } = data;
      const recordExist = await this.verifyPatientRecord(patientId);
      if (recordExist)
        throw new NotFoundException(
          'Ya existe un historial medico para este paciente',
        );
      return this.recordRepository.addRecord(data);
    } catch (error) {
      throw error;
    }
  }

  async updateRecord(
    id: number,
    data: Partial<MedicalHistoryRequestDto>,
  ): Promise<MedicalHistory> {
    const record = await this.recordRepository.verifyPatientRecord(id);

    if (!record) {
      throw new NotFoundException(
        'Registo no encontrado por el ID del usuario',
      );
    }

    const { patientId, ...rest } = data;

    return this.recordRepository.updateRecord(record.id, rest);
  }
}
