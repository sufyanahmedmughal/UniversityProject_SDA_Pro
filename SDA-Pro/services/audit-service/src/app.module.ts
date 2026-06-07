import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditEntity } from './repositories/audit.entity';
import { AuditService } from './services/audit.service';
import { AuditController } from './controllers/audit.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: process.env.DB_USER || 'sdapro',
      password: process.env.DB_PASS || 'sdapro123',
      database: process.env.DB_NAME || 'sdapro',
      entities: [AuditEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([AuditEntity]),
  ],
  controllers: [AuditController],
  providers: [AuditService],
})
export class AppModule {}