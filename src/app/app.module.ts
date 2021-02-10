import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { IconsModule } from './icons/icons.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';

@NgModule({
  declarations: [AppComponent, PlayerComponent],
  imports: [BrowserModule, AppRoutingModule, IconsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
