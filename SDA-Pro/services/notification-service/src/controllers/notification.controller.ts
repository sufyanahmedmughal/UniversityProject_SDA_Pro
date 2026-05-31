import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post('dispatch')
  async dispatch(
    @Body() body: {
      title: string;
      message: string;
      severity: string;
      incidentId: string;
      type: 'critical' | 'report';
    },
  ) {
    const notification = {
      title: body.title,
      message: body.message,
      severity: body.severity,
      incidentId: body.incidentId,
    };

    if (body.type === 'critical') {
      await this.notificationService.dispatchCriticalAlert(notification);
    } else {
      await this.notificationService.dispatchReport(notification);
    }

    return { dispatched: true, channels: body.type === 'critical' ? ['PagerDuty', 'Slack'] : ['Email'] };
  }
}