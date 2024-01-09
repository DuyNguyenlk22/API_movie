import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MovieManagementModule } from './movie-management/movie-management.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { JwtStrategy } from './strategy';
import { TheaterModule } from './theater/theater.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [BookingModule, UserModule, ConfigModule.forRoot({
    isGlobal: true
  }), MovieManagementModule, TheaterModule],
  providers: [JwtStrategy]
})
export class AppModule { }
