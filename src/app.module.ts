import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { GoogleStrategy } from './google.strategy'
import { User } from './entity/user.entity';
@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   url: 'postgres://postgres:secret@127.0.0.1:5432/google_auth',
    //   host: '127.0.0.1',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'secret',
    //   database: 'google_auth',
    //   synchronize: false, 
    // }),
    // TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
