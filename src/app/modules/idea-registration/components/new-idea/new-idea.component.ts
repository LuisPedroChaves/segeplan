import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { GeneralInformation } from 'src/app/core/models/GeneralInformation';
import { IProduct } from 'src/app/core/models/Product';
import { UPDATE_IDEA } from 'src/app/store/actions';
import { IdeaStore } from 'src/app/store/reducers';
import { ProductStore } from '../../../../store/reducers/product.reducer';

@Component({
  selector: 'app-new-idea',
  templateUrl: './new-idea.component.html',
  styleUrls: ['./new-idea.component.scss']
})
export class NewIdeaComponent implements OnInit, OnDestroy {

  generalInformation = new FormGroup({
    _product: new FormControl(null, Validators.required),
    date: new FormControl(moment(), Validators.required),
    planningInstrument: new FormControl(true, Validators.required),
    description: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    responsibleName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
  });

  products: IProduct[] = [];
  productStoreSubscription = new Subscription();

  idea: GeneralInformation = null!
  ideaStoreSubscription = new Subscription();

  constructor(
    private productStore: Store<ProductStore>,
    private ideaStore: Store<IdeaStore>,
  ) { }

  ngOnInit(): void {
    this.productStoreSubscription = this.productStore.select('product')
      .subscribe(state => {
        this.products = state.products;
      })

    this.ideaStoreSubscription = this.ideaStore.select('idea')
      .subscribe(state => {
        this.idea = state.idea;
      })
  }

  ngOnDestroy(): void {
    this.productStoreSubscription?.unsubscribe();
    this.ideaStoreSubscription?.unsubscribe();
  }

  changeDescription(event: MatSlideToggleChange): void {
    const description = this.generalInformation.get('description');

    if (event.checked) {
      description!.enable();
      return
    }

    description!.disable();
  }

  saveGeneralInformation(): void {
    const PRODUCT: IProduct = this.generalInformation.controls['_product'].value!;

    const {
      _product
    } = this.generalInformation.value

    if (this.idea) {

      // this.ideaStore.dispatch(UPDATE_IDEA({
      //   idea:
      //   {
      //     productId: PRODUCT.code!,
      //     productName: PRODUCT.name,
      //     date: this.generalInformation.controls['date'].value,
      //     planningInstrument: this.generalInformation.controls['planningInstrument'].value,
      //   }
      // }))
    }
  }

}
