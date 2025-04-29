import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription, interval, take } from 'rxjs';
import { Router } from '@angular/router';
import { MainService } from '../../core/services/main.service';
import { Product } from '../../core/models/product';
import { ProductsService } from '../../core/services/products.service';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../core/models/user';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor (
    private router: Router,
    private el: ElementRef,
    private mainService: MainService,
    private productsService: ProductsService,
    private usersService: UsersService
  ) { }

  navbarVisibleSubscription: Subscription = new Subscription();
  cartSubscription: Subscription = new Subscription();
  cartProducts: Product[] = [];
  cartItems: number = 0;

  usersSubscription: Subscription = new Subscription();
  user: User = new User();
  showSidebar = true;
  ngOnInit(): void {

    this.navbarVisibleSubscription = this.mainService.NavbarVisibleSubject.subscribe((isVisible: boolean) => {
      this.showSidebar = isVisible;
    });
    this.cartSubscription = this.productsService.cartSubject.subscribe((cartProducts) => {
      this.cartProducts = cartProducts;
      this.cartItems = this.cartProducts.reduce((sum, item) => sum + (item.quantity || 0), 0);
    });
    this.productsService.getCartItems();
    this.getUser();
  }

  ngOnDestroy(): void {
    this.navbarVisibleSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
  }
  getUser() {
    this.usersService.getCurrentUser();
    let userLocalStorage = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser') || "") : new User();
    this.user = userLocalStorage;
    if (!this.user.id) {
      this.usersSubscription = this.usersService.currentUserSubject.subscribe((user) => {
        this.user = user;
       });
    }
  }
  logOut() {
    this.usersService.logOut();
    this.router.navigate(['/login']);
  }


  showPanel(event: any) {
    if (!this.navbarExpanded) {
      event.classList?.remove('d-none');
    }
    else {
      event.classList?.add('d-none');
    }
  }

  hidePanel(event: any) {
    event.classList?.add('d-none');
  }


  //for the small menus
  togglePanel(event: any) {
    if (event.classList.contains('d-none')) {
      event.classList?.remove('d-none');
    }
    else {
      event.classList?.add('d-none');
    }
  }
  navbarExpanded = true;
  smallVerticalPanelCollapsed : boolean = true;
}
