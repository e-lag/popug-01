"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerStart = exports.documentSave = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/** URL по которому будет доступен Swagger */
const SWAGGER_URL = 'api-doc';
/** Генератор json файла swagger для экспорта */
const documentSave = (document, optionalUrl) => {
    const docPath = path.resolve(`assets/swaggerDoc${optionalUrl.replace('/', '_')}.json`);
    try {
        if (!fs.existsSync(docPath)) {
            fs.closeSync(fs.openSync(docPath, 'w'));
        }
        fs.writeFileSync(docPath, JSON.stringify(document, null, '  '));
    }
    catch (e) {
        common_1.Logger.error('error create swagger', e, 'SWAGGER');
    }
    common_1.Logger.log(`document save on ${docPath}`, 'SWAGGER');
};
exports.documentSave = documentSave;
/**
 * Запуск Swagger
 *
 * @param app - приложение Nest
 * @param port - Порт, где запущено приложение
 * @param title - Заголовок приложения
 * @param servers - URL для вызова API
 * @param version - Версия API
 * @param docOptions - Параметры swagger
 * @constructor
 */
function SwaggerStart(app, port, title, servers, version = '1.0', docOptions) {
    const documentBuilder = new swagger_1.DocumentBuilder().setTitle(title);
    documentBuilder.setDescription(`
Build time: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
    `);
    servers.map((server) => documentBuilder.addServer(server.url, server.descr));
    documentBuilder.setVersion(version).addBearerAuth();
    const doc = swagger_1.SwaggerModule.createDocument(app, documentBuilder.build(), docOptions);
    // documentSave(doc, optionalUrl);
    common_1.Logger.log(`swagger: http://localhost:${port}/${SWAGGER_URL}/`, 'SWAGGER');
    swagger_1.SwaggerModule.setup(SWAGGER_URL, app, doc);
    return SWAGGER_URL;
}
exports.SwaggerStart = SwaggerStart;
//# sourceMappingURL=swagger.js.map