import { Module } from '@nestjs/common';
import { ResponseController } from './controllers/response.controller';

@Module({
    controllers: [ResponseController],
    providers: [],
})
export class AppModule { }