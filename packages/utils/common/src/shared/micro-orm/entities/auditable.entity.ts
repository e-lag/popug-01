import { PrimaryKey, Property } from '@mikro-orm/core';

import { Identifiable } from './identifiable';

export abstract class Auditable implements Identifiable {
  @PrimaryKey({ defaultRaw: 'uuid_generate_v4()', type: 'uuid' })
  public id!: string;

  @Property()
  public createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt: Date = new Date();

  @Property()
  public createdBy!: string;

  @Property()
  public updatedBy!: string;
}
