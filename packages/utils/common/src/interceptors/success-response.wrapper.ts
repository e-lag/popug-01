import { AppResponse } from './response.interface';

export class SuccessResponse<Response extends AppResponse | unknown = AppResponse, Meta = unknown>
  implements AppResponse<Response, Meta>
{
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  readonly meta?: Meta | undefined;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  readonly data?: Response | undefined;

  constructor(response: Response) {
    if (!response) {
      this.data = undefined;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.meta = { success: true };
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { data = undefined, meta = undefined, ...resp } = response;

      if (Array.isArray(data)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.data = data;
      } else {
        this.data = { ...data, ...resp };
      }

      this.meta = meta;
    }
  }
}
