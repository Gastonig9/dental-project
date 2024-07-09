import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  HttpStatus,
  Put,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { Odontogram, Patient, Prestations } from '@prisma/client';
import {
  PatientRequestDto,
  PatientResponseDto,
  PrestationCreateDto,
} from 'src/dtos';
import { PatientService } from './patients.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { UpdatePatientDto } from 'src/dtos';
import { PrestationUpdateDto } from 'src/dtos/prestation-update.dto';

@Public()
@ApiTags('Pacientes')
@Controller('/patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get('get-patients')
  @ApiQuery({ name: 'gender', required: false })
  @ApiQuery({ name: 'dni', required: false })
  @ApiQuery({ name: 'name', required: false })
  async getAllPatients(
    @Query('dni') dni?: string,
    @Query('name') name?: string,
    @Query('gender') gender?: string,
  ): Promise<{ statusCode: number; patients: Patient[] }> {
    const patients = await this.patientService.getAllPatients(
      dni,
      name,
      gender,
    );
    return {
      statusCode: 200,
      patients,
    };
  }

  @Put('/update-benefits')
  @ApiBody({ type: PrestationUpdateDto })
  async updateBenefits(@Body() data: PrestationUpdateDto) {
    const { odontogram, ...rest } = data;
    const response = await this.patientService.updatePrestation(
      rest,
      odontogram,
    );

    return response;
  }

  @Get('/get-benefits/:id')
  async getBenefits(@Param('id') id: string): Promise<any> {
    const response = await this.patientService.getPrestationsByPatientId(
      parseInt(id),
    );

    return response;
  }

  @Post('/add-benefits')
  @ApiBody({ type: PrestationCreateDto })
  async addBenefits(@Body() data: PrestationCreateDto) {
    const { odontogram, ...rest } = data;
    const response = await this.patientService.createPrestation(
      rest,
      odontogram,
    );

    return response;
  }

  @Delete('/delete-benefit')
  async deleteBenefits(@Query('benefitId') benefitId: string) {
    await this.patientService.deletePrestation(parseInt(benefitId));
  }

  @Post()
  @ApiBody({ type: PatientRequestDto })
  async addPatient(
    @Body() data: PatientRequestDto,
  ): Promise<Omit<PatientResponseDto, 'prestations' | 'appointments'>> {
    try {
      const response = await this.patientService.addPatient(data);

      return response;
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async getPatient(@Param('id') id: string): Promise<PatientResponseDto> {
    const response = await this.patientService.getPatient(parseInt(id));

    return response;
  }

  @Put(':id')
  @ApiBody({ type: UpdatePatientDto })
  async updatePatient(
    @Param('id') id: string,
    @Body() data: Partial<Patient>,
  ): Promise<Patient> {
    const response = await this.patientService.updatePatientById(
      parseInt(id),
      data,
    );

    return response;
  }

  // Endpoint temporal para mockear pacientes
  @Post('mock-patients')
  async mockPatients(): Promise<{ statusCode: number }> {
    await this.patientService.mockPatients();
    return {
      statusCode: HttpStatus.OK,
    };
  }
}
