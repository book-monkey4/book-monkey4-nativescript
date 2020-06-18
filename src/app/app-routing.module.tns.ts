import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { AppRoutes } from './app.routes';

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(AppRoutes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
