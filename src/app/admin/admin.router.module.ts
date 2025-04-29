import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin.component';
import { SalesComponent } from './sales/sales.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
                  
    children: [
      {                                         
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        path: 'sales',
        component: SalesComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class adminRouterModule { }
