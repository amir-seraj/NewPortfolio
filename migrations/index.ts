import * as migration_20260705_221905_initial from './20260705_221905_initial';
import * as migration_20260706_184137_project_layout_blocks from './20260706_184137_project_layout_blocks';

export const migrations = [
  {
    up: migration_20260705_221905_initial.up,
    down: migration_20260705_221905_initial.down,
    name: '20260705_221905_initial',
  },
  {
    up: migration_20260706_184137_project_layout_blocks.up,
    down: migration_20260706_184137_project_layout_blocks.down,
    name: '20260706_184137_project_layout_blocks'
  },
];
