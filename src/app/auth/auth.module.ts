import { NgModule } from '@angular/core';
import { AuthRouterModule } from './auth.router.module';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [AuthRouterModule, MaterialModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  exports: [AuthRouterModule],

})
export class AuthModule {


}
