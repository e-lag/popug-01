import { Migration } from '@mikro-orm/migrations';

export class Migration20230820113036 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "task" add column "jira_id" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "task" drop column "jira_id";');
  }

}
