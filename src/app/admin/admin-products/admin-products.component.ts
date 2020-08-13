import { Product } from './../../models/products';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filterdProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) { 
    this.subscription = this.productService.getAll()
      .subscribe((products:any) => this.filterdProducts = this.products = products);
  }

  filter(query: string) {
    console.log(query);
    this.filterdProducts = (query) ?
      this.products.filter(p => p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) : 
      this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

}
