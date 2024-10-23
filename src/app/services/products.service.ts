import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IProduct, ISearch } from '../interfaces';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';
@Injectable({
    providedIn: 'root'
  })
  export class ProductsService extends BaseService<IProduct> {
    protected override source: string = 'product';
    private productListSignal = signal<IProduct[]>([]);
    get products$() {
      return this.productListSignal;
    }
    public search: ISearch = { 
      page: 1,
      size: 5
    }
    public totalItems: any = [];
    private authService: AuthService = inject(AuthService);
    private alertService: AlertService = inject(AlertService);
  
    getAll() {
      this.findAllWithParams({ page: this.search.page, size: this.search.size}).subscribe({
        next: (response: any) => {
        console.log("Productos recibidos del backend:", response.data);
          this.search = {...this.search, ...response.meta};
          this.totalItems = Array.from({length: this.search.totalPages ? this.search.totalPages: 0}, (_, i) => i+1);
          this.productListSignal.set(response.data);
        },
        error: (err: any) => {
          console.error('error', err);
        }
      });
    }
/*
    save(category: ICategory) {
        this.add(category).subscribe({
          next: (response: any) => {
            this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
            this.getAll();
          },
          error: (err: any) => {
            this.alertService.displayAlert('error', 'An error occurred adding the order','center', 'top', ['error-snackbar']);
            console.error('error', err);
          }
        });
      }

    update(category: ICategory) {
        this.editCustomSource(`${category.id}`, category).subscribe({
          next: (response: any) => {
            this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
            this.getAll();
          },
          error: (err: any) => {
            this.alertService.displayAlert('error', 'An error occurred updating the order','center', 'top', ['error-snackbar']);
            console.error('error', err);
            this.getAll();
          }
        });
      }

      delete(category: ICategory) {
        this.delCustomSource(`${category.id}`).subscribe({
          next: (response: any) => {
            this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
            this.getAll();
          },
          error: (err: any) => {
            this.alertService.displayAlert('error', 'An error occurred deleting the order','center', 'top', ['error-snackbar']);
            console.error('error', err);
            this.getAll();
          }
        });
      }
        */
  }