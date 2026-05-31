import { Module } from '@nestjs/common';
import { ThreatIntelController } from './controllers/threat-intel.controller';
import { ThreatIntelService } from './services/threat-intel.service';

@Module({
    controllers: [ThreatIntelController],
    providers: [ThreatIntelService],
})
export class AppModule { }