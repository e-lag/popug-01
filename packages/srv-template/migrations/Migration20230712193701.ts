import { Migration } from '@mikro-orm/migrations';

export class Migration20230712193701 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "vehicle" ("vin" varchar(255) not null, "license_plate" varchar(255) not null, "make_model_year" varchar(255) not null, "dealer_name" varchar(255) not null, "dealer_address" varchar(255) not null, constraint "vehicle_pkey" primary key ("vin"));');
  }

}
