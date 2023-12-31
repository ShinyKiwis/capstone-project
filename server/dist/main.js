"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const session = require("express-session");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors();
    app.use(session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1800000,
        },
    }));
    await app.listen(3500);
}
bootstrap();
//# sourceMappingURL=main.js.map