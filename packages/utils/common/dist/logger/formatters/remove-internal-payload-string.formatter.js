"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeInternalPayloadStringFormatter = void 0;
const winston_1 = require("winston");
/**
 * Функция-преобразователь для winston лога
 * Убирает internalPayloadString из лога
 */
exports.removeInternalPayloadStringFormatter = (0, winston_1.format)((info) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { internalPayloadString, ...rest } = info;
    return rest;
});
//# sourceMappingURL=remove-internal-payload-string.formatter.js.map