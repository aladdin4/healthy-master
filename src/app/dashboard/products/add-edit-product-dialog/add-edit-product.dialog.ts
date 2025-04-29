
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../core/models/product';
import { Subscription } from 'rxjs';
import { Category } from '../../../core/models/category';
@Component({
  selector: 'add-edit-product-dialog',
  templateUrl: 'add-edit-product.dialog.html',
  styleUrls: ['add-edit-product.dialog.css']
})



export class AddEditProductDialog implements OnInit, OnDestroy {

  saving: { isSaving: boolean } = { isSaving: false };
  selectedFile: File | null = null;
  addEditProductForm: FormGroup;
  categoriesSubscription: Subscription = new Subscription();
  categories: Category[] = [];
  constructor (private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditProductDialog>,
    private productService: ProductsService,
    @Inject(MAT_DIALOG_DATA) public product: Product,
  ) {
    this.addEditProductForm = this.fb.group({
      product_name: ['', Validators.required],
      product_nutrition_info: ['', Validators.required],
      product_ingredients: ['', Validators.required],
      price: [0, Validators.required],
      category: [1, Validators.required],
      image: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.product) {
      this.addEditProductForm.patchValue({
        product_name: this.product.product_name,
        product_nutrition_info: this.product.product_nutrition_info,
        product_ingredients: this.product.product_ingredients,
        price: this.product.price,
        category: 1,
        image: null
      });
    }

    this.categoriesSubscription = this.productService.categoriesSubject.subscribe(categories => {
      this.categories = categories;
    });
  }
  ngOnDestroy() {
  }


  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.addEditProductForm.patchValue({ image: this.selectedFile });
    }
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }


  saveProduct() {
    this.saving.isSaving = true;
    let product: any = {
      product_code: this.product.product_code || 0,
      recipe_name: this.addEditProductForm.value.product_name || "",
      nutritional_info: this.addEditProductForm.value.product_nutrition_info || "",
      ingredients: this.addEditProductForm.value.product_ingredients || "",
      price: this.addEditProductForm.value.price || 0,
      category: this.addEditProductForm.value.category,
      created_at: "" + new Date(),
      
    }

    const formData = new FormData();
    formData.append('product_code', product.product_code);
    formData.append('recipe_name', this.addEditProductForm.get('product_name')?.value);
    formData.append('nutritional_info', this.addEditProductForm.get('product_nutrition_info')?.value);
    formData.append('ingredients', this.addEditProductForm.get('product_ingredients')?.value);
    formData.append('price', this.addEditProductForm.get('price')?.value);
    formData.append('created_at', "" + new Date());
    formData.append('category', this.addEditProductForm.get('category')?.value);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    this.productService.saveProduct(formData, this.dialogRef, this.saving);
  }
}
