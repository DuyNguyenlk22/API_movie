import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

@Module({
  imports: [JwtModule.register({})],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule { }
