import { Entity, Property } from '@mikro-orm/core';
import { Identified } from '@popug/utils-micro-orm';

@Entity()
export class Task extends Identified {
  @Property()
  public title: string;

  @Property({ nullable: false })
  public description: string;

  @Property({ nullable: false })
  public assigner: string;

  @Property({ nullable: false })
  public price: string;

  constructor(props: Omit<Task, keyof Identified>) {
    super();
    this.title = props.title;
    this.description = props.description;
    this.assigner = props.assigner;
    this.price = props.price;
  }
}
