import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertEntity } from './domain/alert/alert.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: 5432,
            username: process.env.DB_USER || 'sdapro',
            password: process.env.DB_PASS || 'sdapro123',
            database: process.env.DB_NAME || 'sdapro',
            entities: [AlertEntity],
            synchronize: true, // auto creates tables
        }),
        TypeOrmModule.forFeature([AlertEntity]),
    ],
})
export class AppModule { }