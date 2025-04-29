import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../core/models/user';
import { UsersService } from '../../core/services/users.service';
import { MainService } from '../../core/services/main.service';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent {
  ordersSubscription: Subscription = new Subscription();
  orders: any
  constructor (
    private title: Title,
    private dialog: MatDialog,
    private mainService: MainService,
    private productsService: ProductsService
  ) {

    this.ordersSubscription = this.productsService.ordersSubject
      .subscribe((orders: any) => {
        if (orders.length) {
          this.orders = orders.slice().reverse();
        }
      });
    this.productsService.getOrders();
  }

  ngOnInit(): void {
    this.mainService.setNavbarVisible(true);
    this.title.setTitle('Sales Report');

  }

  ngOnDestroy(): void {
    this.ordersSubscription.unsubscribe();
  }

}
