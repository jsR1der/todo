import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('PGHOST'),
        port: configService.get<number>('DBPORT'),
        password: configService.get<string>('PGPASSWORD'),
        username: configService.get<string>('PGUSER'),
        entities: [],
        database: configService.get<string>('PGDATABASE'),
        synchronize: configService.get<boolean>('synchronize'),
        logging: configService.get<boolean>('logging'),
        ssl: configService.get<boolean>('ssl'),
      }),
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
