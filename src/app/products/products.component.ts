import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/products';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnDestroy {
  // products$;
  products: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    // this.products$ = productService.getAll();
    this.subscription = this.productService.getAll().subscribe(products => {
      this.products = products;
      console.log(products);
    });
   }

   ngOnDestroy() {
     this.subscription.unsubscribe();
   }


}
