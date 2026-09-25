import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  BadRequestException,
} from '@nestjs/common';

import { ShiftService } from './shift.service';

@Controller('shifts')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Post()
  createShift(@Body() body: { openingBalance: number }) {
    return this.shiftService.createShift(body.openingBalance);
  }

  @Get('current')
  async getCurrentShift() {
    const shift = await this.shiftService.getCurrentShift();

    if (!shift) {
      return {
        hasShift: false,
        shift: null,
      };
    }

    return {
      hasShift: true,
      shift: shift,
    };
  }

  @Get()
  getAllShifts() {
    return this.shiftService.getAllShifts();
  }

  @Patch(':id/close')
  closeShift(
    @Param('id') id: string,
    @Body() body: { closingBalance: number },
  ) {
    const shiftId = Number(id);

    if (Number.isNaN(shiftId)) {
      throw new BadRequestException('رقم الشفت غير صحيح');
    }

    return this.shiftService.closeShift(shiftId, body.closingBalance);
  }
}
