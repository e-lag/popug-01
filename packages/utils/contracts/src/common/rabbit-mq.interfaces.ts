export interface RabbitMQExchangeConfig {
  name: string;
  type?: string;
  createExchangeIfNotExists?: boolean;
  options?: AssertExchange;
}

interface AssertExchange {
  durable?: boolean | undefined;
  internal?: boolean | undefined;
  autoDelete?: boolean | undefined;
  alternateExchange?: string | undefined;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  arguments?: any;
}
