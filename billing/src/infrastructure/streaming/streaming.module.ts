import { Module } from '@nestjs/common';
import { TaskStreamingSubscriber } from './task-streaming.subscriber';
import { UserStreamingSubscriber } from './user-streaming.subscriber';

@Module({
  providers: [UserStreamingSubscriber, TaskStreamingSubscriber],
})
export class StreamingModule {}
