import { Migration } from '@mikro-orm/migrations';

export class Migration20230813142633 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "account" ("id" uuid not null, "day" timestamptz(0) not null, "assigner_id" uuid not null, "balance" int not null, "paid" boolean not null, "report_send" boolean not null, constraint "account_pkey" primary key ("id"));');

    this.addSql('create table "account_finished_tasks" ("account_id" uuid not null, "task_id" uuid not null, constraint "account_finished_tasks_pkey" primary key ("account_id", "task_id"));');

    this.addSql('create table "account_assigned_tasks" ("account_id" uuid not null, "task_id" uuid not null, constraint "account_assigned_tasks_pkey" primary key ("account_id", "task_id"));');

    this.addSql('alter table "account" add constraint "account_assigner_id_foreign" foreign key ("assigner_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "account_finished_tasks" add constraint "account_finished_tasks_account_id_foreign" foreign key ("account_id") references "account" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "account_finished_tasks" add constraint "account_finished_tasks_task_id_foreign" foreign key ("task_id") references "task" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "account_assigned_tasks" add constraint "account_assigned_tasks_account_id_foreign" foreign key ("account_id") references "account" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "account_assigned_tasks" add constraint "account_assigned_tasks_task_id_foreign" foreign key ("task_id") references "task" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "account_finished_tasks" drop constraint "account_finished_tasks_account_id_foreign";');

    this.addSql('alter table "account_assigned_tasks" drop constraint "account_assigned_tasks_account_id_foreign";');

    this.addSql('drop table if exists "account" cascade;');

    this.addSql('drop table if exists "account_finished_tasks" cascade;');

    this.addSql('drop table if exists "account_assigned_tasks" cascade;');
  }

}
