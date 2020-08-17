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
  products: any[];
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) { 
    this.subscription = this.productService.getAll().subscribe(product =>
      this.filteredProducts = this.products = product);
  }

  filter(query: string) {
    // console.log(query);
    // this.filteredProducts = (query) ?
    //   this.products.filter(p => 
    //     p.title.includes(query));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

  }

  ngOnInit(): void {
  }

}
