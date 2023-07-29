import { PrimaryKey, Property } from '@mikro-orm/core';

import type { Identifiable } from './identifiable';

export abstract class Identified implements Identifiable {
  @PrimaryKey({ defaultRaw: 'uuid_generate_v4()', type: 'uuid' })
  public id!: string;

  @Property()
  public createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt: Date = new Date();
}
