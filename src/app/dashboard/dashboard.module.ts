import { NgModule, importProvidersFrom } from '@angular/core';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SharedModule } from '../shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DashboardComponent } from './dashboard.component';
import { dashboardRouterModule } from './dashboard.router.module';
import { ProductsComponent } from './products/products.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { AddEditProductDialog } from './products/add-edit-product-dialog/add-edit-product.dialog';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CheckoutComponent,
    CartComponent,
    ProductsComponent,
    HomeComponent,
    AddEditProductDialog


  ],
  imports: [MaterialModule, ReactiveFormsModule, CommonModule, dashboardRouterModule, AccordionModule.forRoot(), FormsModule, SharedModule, MatDatepickerModule, MatNativeDateModule],
  exports: [dashboardRouterModule],
  providers: [importProvidersFrom(MatNativeDateModule)]
})
export class DashboardModule { }
