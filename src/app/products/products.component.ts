import { ShoppingCartService } from './../shopping-cart.service';
import { ProductService } from './../product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../models/products';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  // subscription: Subscription;
  category: string;
  cart: any;
  subscriptions: Subscription[] = []

  constructor(
    route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService,
    private productService: ProductService) {

      this.subscriptions.push(this.productService.getAll()
        .pipe(switchMap(products => {
          this.products = products;
          return route.queryParamMap;
        })).subscribe(params => {
          this.category = params.get('category');

          this.filteredProducts = (this.category) ?
            this.products.filter(p => p.category === this.category) :
            this.products;
        }));

  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  async ngOnInit() {
    this.subscriptions.push((await this.shoppingCartService.getCart())
    .valueChanges()
    .subscribe((cart) => (this.cart = cart)));

  }


}
