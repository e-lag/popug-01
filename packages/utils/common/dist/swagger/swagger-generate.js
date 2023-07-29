"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerGenerate = void 0;
const swagger_1 = require("./swagger");
/** Инициализация и настройка параметров Swagger */
const swaggerGenerate = (app, applicationConfig) => {
    const { port, version, developPublicUrl, isProduct, appName } = applicationConfig;
    if (!isProduct) {
        (0, swagger_1.SwaggerStart)(app, port, appName, [
            {
                url: developPublicUrl,
                descr: 'dev server',
            },
            {
                url: `http://localhost:${port}/`,
                descr: 'localhost',
            },
        ], version);
    }
};
exports.swaggerGenerate = swaggerGenerate;
//# sourceMappingURL=swagger-generate.js.map