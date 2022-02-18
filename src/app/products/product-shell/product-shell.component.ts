import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Product } from '../product';

// NgRx
import { Store } from '@ngrx/store';
import { getCurrentProduct, getError, getProducts, getShowProductCode, State } from '../state';
import { ProductPageActions } from '../state/actions';

@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {

  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  
  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
    this.products$ = this.store.select(getProducts);
    this.errorMessage$ = this.store.select(getError);
    this.store.dispatch(ProductPageActions.loadProducts());
    this.selectedProduct$ = this.store.select(getCurrentProduct);
    this.displayCode$ = this.store.select(getShowProductCode);
  }

  checkChanged(): void {
    this.store.dispatch(ProductPageActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductPageActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductPageActions.setCurrentProduct({ currentProductId: product.id }));
  }
}
