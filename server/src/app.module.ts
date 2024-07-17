import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UsersModule } from './routes/users/users.module';
import { DataSource } from 'typeorm';
import { Users } from './routes/users/user.entity';

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
        entities: [Users],
        database: configService.get<string>('PGDATABASE'),
        synchronize: configService.get<boolean>('synchronize'),
        logging: configService.get<boolean>('logging'),
        ssl: configService.get<boolean>('ssl'),
      }),
    }),
    UsersModule,
  ],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {}
}
