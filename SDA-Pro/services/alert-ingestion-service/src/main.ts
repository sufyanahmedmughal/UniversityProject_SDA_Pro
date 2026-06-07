import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    await app.listen(3001);
    console.log('Alert Ingestion Service running on port 3001');
}
bootstrap();