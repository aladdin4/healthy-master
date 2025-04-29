import { Component } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
import { User } from '../../core/models/user';
import { DeleteConfirmationDialog } from '../../shared/modals/delete-confirmation-dialog/delete-confirmation.dialog';
import { AddEditProductDialog } from './add-edit-product-dialog/add-edit-product.dialog';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor (public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private productsService: ProductsService,
    private mainService: MainService,
    private toasterDisplayService: ToastrDisplayService  ,
    private title: Title,
    private usersService: UsersService
  ) { }
  productsSubscription: Subscription = new Subscription();
  usersSubscription: Subscription = new Subscription();
  user: User = new User();

  products: ProductCategory[] = [];
 
  categories: string[] = [];
  activeCategory: string = '';
  ngOnInit(): void {

    this.mainService.setNavbarVisible(false);

    this.productsSubscription = this.productsService.productsSubject.subscribe((products) => {
      this.products = products;
      this.categories = products.map(product => product.category);
      this.activeCategory = this.categories[0];
    });
    this.productsService.getProducts();
    this.getUser();

    this.productsService.getCategories();

    this.title.setTitle('Healthy Products');
  }
  setActiveCategory(category: string) {
    this.activeCategory = category;
  }

  addToMeal(product: Product) {
    this.toasterDisplayService.showSuccess('Product Added To Meal Successfully')
  }
  addToCart(product: Product) {
    this.productsService.addToCart(product);
    this.toasterDisplayService.showSuccess('Product Added To Cart Successfully')
  }
  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
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

 
  deleteProduct(product: Product) {
    const dialogRef =
      this.dialog.open(DeleteConfirmationDialog, {
        data: { title: 'Delete Product', message: 'Are you sure you want to delete this product?' },
        position: { top: '6rem' },
        width: '600px',

      }).afterClosed().subscribe(result => {
        if (result)
        this.productsService.deleteProduct(product);
      })
  }
  editProduct(element: any) {
    const dialogRef = this.dialog.open(AddEditProductDialog, {
      data: element ? element : 0,
      position: { top: '6rem' },
      width: '600px',
    });
  }

  addNewProduct() {
    const dialogRef = this.dialog.open(AddEditProductDialog, {
      data: 0,
      position: { top: '6rem' },
      width: '600px',
    });
  }
}

