import { Migration } from '@mikro-orm/migrations';

export class Migration20230813165607 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "account" add column "close" boolean not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "account" drop column "close";');
  }

}
