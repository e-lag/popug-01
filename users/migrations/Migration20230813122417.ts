import { Migration } from '@mikro-orm/migrations';

export class Migration20230813122417 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" uuid not null, "avatar" varchar(255) null, "block_until" timestamptz(0) null, "count_error_logins" varchar(255) not null default 0, "email" varchar(255) not null, "email_confirmed" varchar(255) not null, "role" varchar(255) not null, "nik_name" varchar(255) null, "password" jsonb null, "phone" varchar(255) null, "is_active" boolean not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
  }

}
