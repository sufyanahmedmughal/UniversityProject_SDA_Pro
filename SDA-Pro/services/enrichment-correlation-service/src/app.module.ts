import { Module } from '@nestjs/common';
import { EnrichmentService } from './services/enrichment.service';
import { EnrichmentController } from './controllers/enrichment.controller';

@Module({
    controllers: [EnrichmentController],
    providers: [EnrichmentService],
})
export class AppModule { }