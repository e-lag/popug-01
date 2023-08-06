import { Migration } from '@mikro-orm/migrations';

export class Migration20230806151656 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "avatar" varchar(255) null default null, "email" varchar(255) not null, "role" int not null, "nik_name" varchar(255) null default null, "phone" varchar(255) null default null, "is_active" boolean not null, constraint "users_pkey" primary key ("id"));');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "users" cascade;');
  }

}
