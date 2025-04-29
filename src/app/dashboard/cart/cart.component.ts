import { Component } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, interval, take } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ProductsService } from '../../core/services/products.service';
import { Product, ProductCategory } from '../../core/models/product';
import { MainService } from '../../core/services/main.service';
import { ToastrDisplayService } from '../../core/services/toastr.service';
import { UsersService } from '../../core/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {


  constructor (public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private productsService: ProductsService,
    private mainService: MainService,
    private toasterDisplayService: ToastrDisplayService,
    private usersService: UsersService,
    private title: Title,
    private router: Router
  ) { }
  cartSubscription: Subscription = new Subscription();
  userSubscription: Subscription = new Subscription();

  cartItems: Product[] = [];
  currentUser = this.usersService.currentUserSubject.value;
  itemsSubtotal: number = 0;
  discount: number = 0;
  tax: number = 0;
  subtotal: number = 0;
  shippingCost: number = 0;
  total: number = 0;

  categories: string[] = [];
  activeCategory: string = '';
  ngOnInit(): void {

    this.mainService.setNavbarVisible(false);
    this.cartSubscription = this.productsService.cartSubject.subscribe((products) => {
      this.cartItems = products;
      this.calculateSummary();
    });
    this.usersService.getCurrentUser()
    this.userSubscription = this.usersService.currentUserSubject.subscribe((user) => {
      this.currentUser = user;
    });
    
    this.title.setTitle('Healthy Cart');
  }

  removeItem(item: Product) {
    this.productsService.removeFromCart(item);
    this.calculateSummary();
  }

  
    calculateSummary() {
      this.itemsSubtotal = this.cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 0)), 0);
      this.discount = this.itemsSubtotal * 0.1; // 10% discount
      this.tax = this.itemsSubtotal * 0.18; // Assuming 18% tax
      this.subtotal = this.itemsSubtotal - this.discount + this.tax;
      this.shippingCost = this.itemsSubtotal > 0 ? 15 : 0; // $15 shipping cost
      if (this.itemsSubtotal > 0) 
      this.total = this.subtotal + this.shippingCost;
  }
  checkOut() {
    //call checkout EP here from userId + cart
    this.router.navigate(['/dashboard/checkout']);
  }
  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
