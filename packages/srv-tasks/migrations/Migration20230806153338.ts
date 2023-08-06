import { Migration } from '@mikro-orm/migrations';

export class Migration20230806153338 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "task" add column "assigner_id" uuid not null;');
    this.addSql('alter table "task" add constraint "task_assigner_id_foreign" foreign key ("assigner_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "task" rename column "assigner" to "status";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "task" drop constraint "task_assigner_id_foreign";');

    this.addSql('alter table "task" drop column "assigner_id";');
    this.addSql('alter table "task" rename column "status" to "assigner";');
  }

}
