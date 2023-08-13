export type BaseResponseDto<Data = unknown, Meta = unknown | undefined> = {
  data: Data;
  meta?: Meta & { error?: string; info?: string };
};
