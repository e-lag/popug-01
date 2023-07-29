import { PrimaryKey, Property } from '@mikro-orm/core';
import { UuidGenerator } from '@popug/utils-common';

import type { Identifiable } from './identifiable';

export abstract class Identified implements Identifiable {
  @PrimaryKey({ defaultRaw: 'uuid_generate_v4()', type: 'uuid' })
  public id: string = UuidGenerator.generate();

  @Property()
  public createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt: Date = new Date();
}
