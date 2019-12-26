"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const idea_module_1 = require("./idea/idea.module");
const idea_entity_1 = require("./idea/idea.entity");
const Config_1 = require("./config/Config");
const http_error_filter_1 = require("./shared/http-error.filter");
const logging_interceptor_1 = require("./shared/logging.interceptor");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: '127.0.0.1',
                port: 3306,
                username: Config_1.Config.DB_USERNAME,
                password: Config_1.Config.DB_PASSWORD,
                database: Config_1.Config.DB_DATABASE,
                synchronize: true,
                logging: true,
                entities: [idea_entity_1.IdeaEntity],
            }),
            idea_module_1.IdeaModule,
        ],
        providers: [
            { provide: core_1.APP_FILTER, useClass: http_error_filter_1.HttpErrorFilter },
            { provide: core_1.APP_INTERCEPTOR, useClass: logging_interceptor_1.LoggingInterceptor },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map