import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import {
  Play,
  Pause,
  ChevronsRight,
  ChevronsLeft,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
  RefreshCcw,
  Music,
  XCircle,
} from 'angular-feather/icons';

const icons = {
  Play,
  Pause,
  ChevronsRight,
  ChevronsLeft,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
  RefreshCcw,
  Music,
  XCircle,
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
