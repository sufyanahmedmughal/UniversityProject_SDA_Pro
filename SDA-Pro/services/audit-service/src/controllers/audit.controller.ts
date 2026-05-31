import { Controller, Get, Query } from '@nestjs/common';
import { AuditService } from '../services/audit.service';

@Controller('audit')
export class AuditController {
  constructor(private auditService: AuditService) {}

  @Get('logs')
  async getLogs(@Query('eventType') eventType?: string) {
    if (eventType) {
      return this.auditService.getByEventType(eventType);
    }
    return this.auditService.getAll();
  }
}