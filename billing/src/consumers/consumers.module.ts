import { Module, Provider } from '@nestjs/common';
import { TaskStreamingConsumer } from './streaming/task-streaming.consumer';
import { UserStreamingConsumer } from './streaming/user-streaming.consumer';

const BE_CONSUMERS: Provider[] = [];
const STREAMING_CONSUMERS: Provider[] = [
  UserStreamingConsumer,
  TaskStreamingConsumer,
];

@Module({
  providers: [...STREAMING_CONSUMERS, ...BE_CONSUMERS],
})
export class ConsumersModule {}
