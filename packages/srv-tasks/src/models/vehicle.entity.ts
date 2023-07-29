import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Vehicle {
  @PrimaryKey()
  public vin: string;

  /** госномер*/
  @Property({ nullable: false })
  public licensePlate: string;

  @Property({ nullable: false })
  public brand: string;

  @Property({ nullable: false })
  public model: string;

  @Property({ nullable: false })
  public makeModelYear: string;

  @Property({ nullable: false })
  public dealerName: string;

  @Property({ nullable: false })
  public dealerAddress: string;

  constructor(vehicle: Vehicle) {
    this.vin = vehicle.vin;
    this.licensePlate = vehicle.licensePlate;
    this.brand = vehicle.brand;
    this.model = vehicle.model;
    this.makeModelYear = vehicle.makeModelYear;
    this.dealerName = vehicle.dealerName;
    this.dealerAddress = vehicle.dealerAddress;
  }
}
