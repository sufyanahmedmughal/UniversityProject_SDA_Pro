"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const alert_entity_1 = require("./domain/alert/alert.entity");
const alert_repository_1 = require("./repositories/alert.repository");
const alert_ingestion_service_1 = require("./services/ingestion/alert-ingestion.service");
const alert_ingestion_controller_1 = require("./controllers/alert-ingestion.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST || 'localhost',
                port: 5432,
                username: process.env.DB_USER || 'sdapro',
                password: process.env.DB_PASS || 'sdapro123',
                database: process.env.DB_NAME || 'sdapro',
                entities: [alert_entity_1.AlertEntity],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([alert_entity_1.AlertEntity]),
        ],
        controllers: [alert_ingestion_controller_1.AlertIngestionController],
        providers: [alert_ingestion_service_1.AlertIngestionService, alert_repository_1.AlertRepository],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map