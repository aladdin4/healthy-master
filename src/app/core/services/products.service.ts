import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { groupBy, map, mergeMap, reduce, BehaviorSubject, concatAll } from 'rxjs';
import { Router } from "@angular/router";
import { Product, ProductCategory, getDummyProducts } from "../models/product";
import { environment } from "../../../environments/environment";
import { ToastrDisplayService } from "./toastr.service";
import { MatDialogRef } from "@angular/material/dialog";
import { AddEditProductDialog } from "../../dashboard/products/add-edit-product-dialog/add-edit-product.dialog";
import { Category } from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor (
    private http: HttpClient,
    private toasterDisplayService: ToastrDisplayService,
    private router: Router,
  ) { }

  productsSubject = new BehaviorSubject<ProductCategory[]>([]);
  cartSubject = new BehaviorSubject<Product[]>([]);
  categoriesSubject = new BehaviorSubject<Category[]>([]);
  ordersSubject = new BehaviorSubject<any[]>([]);

  getCartItems() {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      this.cartSubject.next(JSON.parse(cartItems));
    }
  }

  addToCart(product: Product) {
    const existingItem = this.cartSubject.getValue().find(p => p.product_code === product.product_code);
    if (existingItem?.quantity) {
      existingItem.quantity += 1;
      this.cartSubject.next(this.cartSubject.getValue());
    }
    else {
      product.quantity = 1;
      this.cartSubject.next([...this.cartSubject.getValue(), product]);
    }
    this.saveCartToLocalStorage();
  }

  removeFromCart(product: Product) {
    const cartItems = this.cartSubject.getValue();
    const itemIndex = cartItems.findIndex(p => p.product_code === product.product_code);
    if (itemIndex !== -1) {
      const item = cartItems[itemIndex];
      if (item.quantity && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        cartItems.splice(itemIndex, 1);
      }
      this.cartSubject.next(cartItems);
      this.saveCartToLocalStorage();
    }
  }

  saveCartToLocalStorage() {
    const cartItems = this.cartSubject.getValue();
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  getProducts() {
    this.http
      .get<{ data: ProductCategory[] }>(environment.serviceBase + 'category?page=1')
      .subscribe((data) => {
        let productCategories = data.data;
        productCategories.forEach(category => {
          category.items.forEach(product => {
            product.category = category.category;
           //product.image = "../../../assets/Creamy_Broccoli_Vegan_Pasta.jpg";

          });
        });
        this.productsSubject.next(productCategories)
      });
    //this.productsSubject.next(getDummyProducts())
  }

  deleteProduct(product: Product) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser') || "");
    let token = currentUser.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .delete(environment.serviceBase + `admin/product/${product.product_code}`, { headers })
      .subscribe({
        next: (response: any) => {
          this.getProducts();

        },
        complete: () => this.toasterDisplayService.showSuccess('Product Deleted Successfully')
      })
  }

  saveProduct(product_formData: any, dialogRef: MatDialogRef<AddEditProductDialog>, saving: { isSaving: boolean }) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser') || "");
    let token = currentUser.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log(product_formData.get('product_code'));
    if (product_formData.get('product_code') > 0) {
      const url = environment.serviceBase + `admin/product/${product_formData.get('product_code')}/update`;
      this.updateProduct(product_formData, dialogRef, saving, headers, url);
    }
    else {
      const url = environment.serviceBase + `admin/product`;
      this.storeProduct(product_formData, dialogRef, saving, headers, url);
    
    }
  }

  storeProduct(product: any, dialogRef: MatDialogRef<AddEditProductDialog>, saving: { isSaving: boolean }, headers: HttpHeaders, url: string) {
    this.http
      .post(url, product, { headers })
      .subscribe({
        next: (response: any) => {
          this.getProducts(); dialogRef.close(response);
        },
        complete: () => {
          this.toasterDisplayService.showSuccess('Product Saved Successfully');
          saving.isSaving = false;
        },
        error: (error) => {
          console.error('Error storing product', error);
          this.toasterDisplayService.showError(error);
          saving.isSaving = false;
        }
      });
  }

  updateProduct(product: any, dialogRef: MatDialogRef<AddEditProductDialog>, saving: { isSaving: boolean }, headers: HttpHeaders, url: string) {

    this.http
      .post(url, product, { headers })
      .subscribe({
        next: (response: any) => {
          this.getProducts(); dialogRef.close(response);
        },
        complete: () => {
          this.toasterDisplayService.showSuccess('Product Updated Successfully'); saving.isSaving = false;
        },
        error: (error) => {
          console.error('Error updating product', error);
          this.toasterDisplayService.showError(error);
          saving.isSaving = false;
        }

      });

  }
 
  getCategories() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser') || "");
    let token = currentUser.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get<{ data: Category[] }>(environment.serviceBase + 'admin/category', { headers })
      .subscribe((data) => {
        this.categoriesSubject.next(data.data);
      });
  }

  createNewOrder() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser') || "");
    let token = currentUser.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let products = this.cartSubject.getValue();
    const order = {
      products: products.map(product => product.product_code),
      quentity: products.map(product => product.quantity)
    };
    this.http
      .post<{ data: any }>(environment.serviceBase + 'orders', { ...order }, { headers })
      .subscribe((data) => {
       
      },
        err => {
          let errMsg = err.error.data.email[0];
          this.toasterDisplayService.showError({ error: errMsg });
        }
      ,
        () => {
          this.toasterDisplayService.showSuccess('Order Placed Successfully');
          this.router.navigate(['/dashboard/products']);
          this.cartSubject.next([]);
          this.saveCartToLocalStorage();
        }

    );

  }

  getOrders() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser') || "");
    let token = currentUser.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http
      .get<{ data: any }>(environment.serviceBase + 'orders', { headers })
      .subscribe((data) => {
              this.ordersSubject.next(data.data);
      });
  }
}
