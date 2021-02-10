import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import {
  Play,
  Pause,
  ChevronsRight,
  ChevronsLeft,
} from 'angular-feather/icons';

const icons = {
  Play,
  Pause,
  ChevronsRight,
  ChevronsLeft,
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
