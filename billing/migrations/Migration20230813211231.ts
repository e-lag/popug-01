import { Migration } from '@mikro-orm/migrations';

export class Migration20230813211231 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "account" add column "assign_sum" int not null default 0, add column "finish_sum" int not null default 0;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "account" drop column "assign_sum";');
    this.addSql('alter table "account" drop column "finish_sum";');
  }

}
