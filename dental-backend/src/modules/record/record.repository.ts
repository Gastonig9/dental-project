/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { MedicalHistory } from '@prisma/client';
import { MedicalHistoryRequestDto } from 'src/dtos/record.dto';
import { Context } from 'src/prisma/prisma.context';

@Injectable()
export class RecordRepository {
    constructor(private readonly context: Context) {}

    async addRecord(data: MedicalHistoryRequestDto): Promise<MedicalHistory> {
        return this.context.medicalHistory.create({ data });
    }

    async getRecords(): Promise<MedicalHistory[]> {
        return this.context.medicalHistory.findMany();
    }

    async updateRecord(id: number, data: Partial<MedicalHistoryRequestDto>): Promise<MedicalHistory> {
        return this.context.medicalHistory.update({
            where: { id },
            data,
        });
    }
}
