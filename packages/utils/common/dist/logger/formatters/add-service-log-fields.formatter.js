"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addServiceLogFieldsFormatter = void 0;
const winston_1 = require("winston");
function addServiceLogFieldsFormatter(options) {
    return (0, winston_1.format)((info) => {
        return {
            ...info,
            service: options.serviceName,
        };
    })();
}
exports.addServiceLogFieldsFormatter = addServiceLogFieldsFormatter;
//# sourceMappingURL=add-service-log-fields.formatter.js.map