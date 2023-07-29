import { Migration } from '@mikro-orm/migrations';

export class Migration20230729183723 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "avatar" varchar(255) null default null, "block_until" varchar(255) null default null, "count_error_logins" varchar(255) not null default 0, "email" varchar(255) not null, "email_confirmed" varchar(255) not null default false, "roles" text[] not null default \'{}\', "nik_name" varchar(255) null default null, "password" varchar(255) null, "phone" varchar(255) null default null, constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "user_email_confirm" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id" varchar(255) not null, "email" varchar(255) not null, "code" varchar(255) not null, "active_until" timestamptz(0) not null, "confirmed" boolean not null, constraint "user_email_confirm_pkey" primary key ("id"));');

    this.addSql('create table "user_login" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id" varchar(255) not null, "device_id" varchar(255) not null, "active" boolean not null, "refresh_token" varchar(255) not null, constraint "user_login_pkey" primary key ("id"));');
  }

}
