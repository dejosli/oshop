import { ProductService } from './../product.service';
import { Component, OnDestroy } from '@angular/core';
import { Product } from '../models/products';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscription: Subscription;

  category: string;

  constructor(
    route: ActivatedRoute,
    private productService: ProductService) {

    this.subscription = this.productService.getAll()
    .pipe(switchMap(products => {
      this.products = products;
      return route.queryParamMap;
    })).subscribe(params => {
        this.category = params.get('category');
  
        this.filteredProducts = (this.category) ? 
          this.products.filter(p => p.category === this.category) :
          this.products;
      });



   }

   ngOnDestroy():void {
     this.subscription.unsubscribe();
   }


}
