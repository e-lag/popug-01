import { Migration } from '@mikro-orm/migrations';

export class Migration20230813122447 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" uuid not null, "avatar" varchar(255) null, "email" varchar(255) not null, "role" varchar(255) not null, "nik_name" varchar(255) null, "phone" varchar(255) null, "is_active" boolean not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "user_pkey" primary key ("id"));');

    this.addSql('create table "task" ("id" uuid not null, "title" varchar(255) not null, "description" varchar(255) not null, "assigner_id" uuid not null, "price_assign" int not null, "price_finish" int not null, "status" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "task_pkey" primary key ("id"));');

    this.addSql('alter table "task" add constraint "task_assigner_id_foreign" foreign key ("assigner_id") references "user" ("id") on update cascade;');
  }

}
