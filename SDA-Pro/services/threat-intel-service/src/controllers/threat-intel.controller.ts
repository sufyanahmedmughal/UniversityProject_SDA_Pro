import { Controller, Post, Body } from '@nestjs/common';
import { ThreatIntelService } from '../services/threat-intel.service';
import { IndicatorType } from '../services/adapter/threat-intel-provider.interface';

@Controller('threat-intel')
export class ThreatIntelController {
    constructor(private threatIntelService: ThreatIntelService) { }

    @Post('reputation')
    async checkReputation(
        @Body() body: { indicator: string; type: IndicatorType },
    ) {
        return this.threatIntelService.checkReputation(body.indicator, body.type);
    }
}