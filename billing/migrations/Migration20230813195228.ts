import { Migration } from '@mikro-orm/migrations';

export class Migration20230813195228 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" uuid not null, "avatar" varchar(255) null, "email" varchar(255) not null, "role" varchar(255) not null, "nik_name" varchar(255) null, "phone" varchar(255) null, "is_active" boolean not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "user_pkey" primary key ("id"));');

    this.addSql('create table "task" ("id" uuid not null, "title" varchar(255) not null, "description" varchar(255) not null, "assigner_id" uuid not null, "price_assign" int not null, "price_finish" int not null, "status" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "task_pkey" primary key ("id"));');

    this.addSql('create table "account" ("id" uuid not null, "day" timestamptz(0) not null, "assigner_id" uuid not null, "balance" int not null, "close" boolean not null, "paid" boolean not null, "report_send" boolean not null, "most_expensive_task" int null, "most_chip_task" int null, constraint "account_pkey" primary key ("id"));');

    this.addSql('create table "account_finished_task" ("id" varchar(255) not null, "account_id" uuid not null, "task_id" uuid not null, "created_at" varchar(255) not null, constraint "account_finished_task_pkey" primary key ("id"));');
    this.addSql('create index "account_finished_task_account_id_index" on "account_finished_task" ("account_id");');

    this.addSql('create table "account_assigned_task" ("id" varchar(255) not null, "account_id" uuid not null, "task_id" uuid not null, "created_at" varchar(255) not null, constraint "account_assigned_task_pkey" primary key ("id"));');
    this.addSql('create index "account_assigned_task_account_id_index" on "account_assigned_task" ("account_id");');

    this.addSql('alter table "task" add constraint "task_assigner_id_foreign" foreign key ("assigner_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "account" add constraint "account_assigner_id_foreign" foreign key ("assigner_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "account_finished_task" add constraint "account_finished_task_account_id_foreign" foreign key ("account_id") references "account" ("id") on update cascade;');
    this.addSql('alter table "account_finished_task" add constraint "account_finished_task_task_id_foreign" foreign key ("task_id") references "task" ("id") on update cascade;');

    this.addSql('alter table "account_assigned_task" add constraint "account_assigned_task_account_id_foreign" foreign key ("account_id") references "account" ("id") on update cascade;');
    this.addSql('alter table "account_assigned_task" add constraint "account_assigned_task_task_id_foreign" foreign key ("task_id") references "task" ("id") on update cascade;');
  }

}
