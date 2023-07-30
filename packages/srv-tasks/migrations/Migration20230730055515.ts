import { Migration } from '@mikro-orm/migrations';

export class Migration20230730055515 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "task" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "description" varchar(255) not null, "assigner" varchar(255) not null, "price" varchar(255) not null, constraint "task_pkey" primary key ("id"));');
  }

}
