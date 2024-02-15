import { Migration } from '@mikro-orm/migrations';

export class Migration20230807054126 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "task" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "description" varchar(255) not null, "assigner" varchar(255) not null, "price" varchar(255) not null, "status" varchar(255) not null, constraint "task_pkey" primary key ("id"));');

    this.addSql('create table "account_assign_task" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "task_id" uuid not null, constraint "account_assign_task_pkey" primary key ("id"));');
    this.addSql('alter table "account_assign_task" add constraint "account_assign_task_task_id_unique" unique ("task_id");');

    this.addSql('create table "users" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "avatar" varchar(255) null default null, "email" varchar(255) not null, "role" int not null, "nik_name" varchar(255) null, "phone" varchar(255) null, "is_active" boolean not null, constraint "users_pkey" primary key ("id"));');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');

    this.addSql('create table "account" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "assigner_id" uuid not null, "date" varchar(255) not null, "balance" int not null, "paid" boolean not null, "report_send" boolean not null, constraint "account_pkey" primary key ("id"));');

    this.addSql('create table "account_finished_tasks" ("account_id" uuid not null, "task_id" uuid not null, constraint "account_finished_tasks_pkey" primary key ("account_id", "task_id"));');

    this.addSql('create table "account_assigned_tasks" ("account_id" uuid not null, "task_id" uuid not null, constraint "account_assigned_tasks_pkey" primary key ("account_id", "task_id"));');

    this.addSql('alter table "account_assign_task" add constraint "account_assign_task_task_id_foreign" foreign key ("task_id") references "task" ("id") on update cascade;');

    this.addSql('alter table "account" add constraint "account_assigner_id_foreign" foreign key ("assigner_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "account_finished_tasks" add constraint "account_finished_tasks_account_id_foreign" foreign key ("account_id") references "account" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "account_finished_tasks" add constraint "account_finished_tasks_task_id_foreign" foreign key ("task_id") references "task" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "account_assigned_tasks" add constraint "account_assigned_tasks_account_id_foreign" foreign key ("account_id") references "account" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "account_assigned_tasks" add constraint "account_assigned_tasks_task_id_foreign" foreign key ("task_id") references "task" ("id") on update cascade on delete cascade;');
  }

}
