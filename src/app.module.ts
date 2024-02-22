import { MovieManagementModule } from './movie-management/movie-management.module';
import { TheaterModule } from './theater/theater.module';
import { BookingModule } from './booking/booking.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    BookingModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MovieManagementModule,
    TheaterModule
  ],
  providers: [JwtStrategy]
})
export class AppModule { }
