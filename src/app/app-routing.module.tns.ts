import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { appRoutes } from './app.routes';

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(appRoutes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
