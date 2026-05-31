import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertEntity } from './domain/alert/alert.entity';
import { AlertRepository } from './repositories/alert.repository';
import { AlertIngestionService } from './services/ingestion/alert-ingestion.service';
import { AlertIngestionController } from './controllers/alert-ingestion.controller';

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
            synchronize: true,
        }),
        TypeOrmModule.forFeature([AlertEntity]),
    ],
    controllers: [AlertIngestionController],
    providers: [AlertIngestionService, AlertRepository],
})
export class AppModule { }