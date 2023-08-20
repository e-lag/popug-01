import { Module } from '@nestjs/common';
import { UserStreamingConsumer } from './user-streaming.consumer';

@Module({
  providers: [UserStreamingConsumer],
})
export class StreamingConsumersModule {}
