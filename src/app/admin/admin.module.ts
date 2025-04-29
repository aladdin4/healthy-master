import { NgModule, importProvidersFrom } from '@angular/core';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SharedModule } from '../shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin.component';
import { adminRouterModule } from './admin.router.module';
import { FilterPipe } from '../shared/pipes/filter-pipe/filter.pipe';
import { AddEditUserDialog } from './users/add-edit-user-dialog/add-edit-user.dialog';
import { SalesComponent } from './sales/sales.component';

@NgModule({
  declarations: [
    AdminComponent,
    AddEditUserDialog,
    UsersComponent,
    SalesComponent
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
    adminRouterModule,
    AccordionModule.forRoot(),
    FormsModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FilterPipe,
  ],
  exports: [adminRouterModule],
  providers: [importProvidersFrom(MatNativeDateModule)]
})
export class AdminModule { }
