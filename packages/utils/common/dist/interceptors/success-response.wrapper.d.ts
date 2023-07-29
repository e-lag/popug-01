import { AppResponse } from './response.interface';
export declare class SuccessResponse<Response extends AppResponse | unknown = AppResponse, Meta = unknown> implements AppResponse<Response, Meta> {
    readonly meta?: Meta | undefined;
    readonly data?: Response | undefined;
    constructor(response: Response);
}
