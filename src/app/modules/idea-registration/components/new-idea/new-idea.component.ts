import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { IProduct } from 'src/app/core/models/Product';
import { ProductStore } from '../../../../store/reducers/product.reducer';

@Component({
  selector: 'app-new-idea',
  templateUrl: './new-idea.component.html',
  styleUrls: ['./new-idea.component.scss']
})
export class NewIdeaComponent implements OnInit, OnDestroy {

  generalInformation = new FormGroup({
    _product: new FormControl(null, Validators.required),
    date: new FormControl('', Validators.required),
    planningInstrument: new FormControl(true, Validators.required),
    description: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
  });

  products: IProduct[] = [];
  productStoreSubscription = new Subscription();

  constructor(
    private store: Store<ProductStore>,
  ) { }

  ngOnInit(): void {
    this.productStoreSubscription = this.store.select('product')
      .subscribe(state => {
        this.products = state.products;
      })
  }

  ngOnDestroy(): void {
    this.productStoreSubscription?.unsubscribe();
  }

  changeDescription(event: MatSlideToggleChange): void {
    const description = this.generalInformation.get('description');

    if (event.checked) {
      description!.enable();
      return
    }

    description!.disable();
  }

}
