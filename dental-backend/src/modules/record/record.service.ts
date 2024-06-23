/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { RecordRepository } from './record.repository';
import { MedicalHistoryRequestDto } from 'src/dtos/record.dto';
import { MedicalHistory } from '@prisma/client';

@Injectable()
export class RecordService {
    constructor(
        private readonly recordRepository: RecordRepository,
    ) {}

    async addNewRecord(data: MedicalHistoryRequestDto): Promise<MedicalHistory> {
        try {
            return this.recordRepository.addRecord(data);
        } catch (error) {
            return error
        }

    }

    async updateRecord(id: number, data: Partial<MedicalHistoryRequestDto>): Promise<MedicalHistory> {
        return this.recordRepository.updateRecord(id, data);
    }
}
