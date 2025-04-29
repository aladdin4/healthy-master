import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.router';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.modules';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, MaterialModule, SharedModule, CoreModule, BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
