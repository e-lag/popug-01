"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = void 0;
class SuccessResponse {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    meta;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data;
    constructor(response) {
        if (!response) {
            this.data = undefined;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.meta = { success: true };
        }
        else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const { data = undefined, meta = undefined, ...resp } = response;
            if (Array.isArray(data)) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.data = data;
            }
            else {
                this.data = { ...data, ...resp };
            }
            this.meta = meta;
        }
    }
}
exports.SuccessResponse = SuccessResponse;
//# sourceMappingURL=success-response.wrapper.js.map