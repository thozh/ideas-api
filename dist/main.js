"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("./config");
const port = config_1.Config.port || 8080;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(port);
    common_1.Logger.log('Server running on port ' + port, 'Bootstrap');
}
bootstrap();
//# sourceMappingURL=main.js.map