import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Shift } from './shift.entity';

@Injectable()
export class ShiftService {
  constructor(
    @InjectRepository(Shift)
    private readonly shiftRepository: Repository<Shift>,
  ) {}

  async createShift(openingBalance: number) {
    const currentShift = await this.shiftRepository.findOne({
      where: {
        status: 'open',
      },
    });

    if (currentShift) {
      throw new BadRequestException('يوجد شفت مفتوح حاليا');
    }

    const shift = this.shiftRepository.create({
      startAt: new Date(),
      openingBalance: openingBalance,
      status: 'open',
    });

    return this.shiftRepository.save(shift);
  }

  async getCurrentShift() {
    return this.shiftRepository.findOne({
      where: {
        status: 'open',
      },
    });
  }
  async getAllShifts() {
    return this.shiftRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }
  async closeShift(id: number, closingBalance: number) {
    const shift = await this.shiftRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!shift) {
      throw new NotFoundException('الشفت غير موجود');
    }

    if (shift.status !== 'open') {
      throw new BadRequestException('هذا الشفت مغلق بالفعل');
    }

    shift.endAt = new Date();
    shift.closingBalance = closingBalance;
    shift.status = 'closed';

    return this.shiftRepository.save(shift);
  }
}
