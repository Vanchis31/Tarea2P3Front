import { Component, inject, ViewChild, Input } from '@angular/core';
import { ProductListComponent } from './../../components/products/product-list/product-list.component';
import { CategoriesService } from '../../services/categories.service';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { IProduct, IRoleType } from '../../interfaces';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ProductsService } from '../../services/products.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductListComponent,
    PaginationComponent,
    ModalComponent,
    LoaderComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  public productsService: ProductsService = inject(ProductsService);
  constructor() {
    this.productsService.search.page = 1;
    this.productsService.getAll();
  }
}


