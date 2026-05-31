import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidentEntity } from './domain/incident/incident.entity.db';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: 5432,
            username: process.env.DB_USER || 'sdapro',
            password: process.env.DB_PASS || 'sdapro123',
            database: process.env.DB_NAME || 'sdapro',
            entities: [IncidentEntity],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([IncidentEntity]),
    ],
})
export class AppModule { }