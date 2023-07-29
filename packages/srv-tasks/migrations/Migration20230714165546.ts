import { Migration } from '@mikro-orm/migrations';

export class Migration20230714165546 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "vehicle" add column "brand" varchar(255)  default \'\', add column "model" varchar(255) default \'\';');
    this.addSql(`alter table "vehicle"
    alter column "brand" set not null, alter column "brand" drop default;`);
    this.addSql(`alter table "vehicle"
    alter column "model" set not null, alter column "model" drop default;`);

  }

  async down(): Promise<void> {
    this.addSql('alter table "vehicle" drop column "brand";');
    this.addSql('alter table "vehicle" drop column "model";');
  }

}
