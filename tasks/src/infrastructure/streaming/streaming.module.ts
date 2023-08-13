import { Module } from '@nestjs/common';
import { UserStreamingSubscriber } from './user-streaming.subscriber';

@Module({
  providers: [UserStreamingSubscriber],
})
export class StreamingModule {}
