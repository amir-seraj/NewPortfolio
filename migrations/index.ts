import * as migration_20260705_221905_initial from './20260705_221905_initial';

export const migrations = [
  {
    up: migration_20260705_221905_initial.up,
    down: migration_20260705_221905_initial.down,
    name: '20260705_221905_initial'
  },
];
