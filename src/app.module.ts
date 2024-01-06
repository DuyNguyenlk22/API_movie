import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MovieManagementModule } from './movie-management/movie-management.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { JwtStrategy } from './strategy';

@Module({
  imports: [UserModule, ConfigModule.forRoot({
    isGlobal: true
  }), MovieManagementModule],
  providers: [JwtStrategy]
})
export class AppModule { }
