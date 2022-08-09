import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';
import { CREATE_IDEA, UPDATE_IDEA } from 'src/app/store/actions';
import { IdeaStore } from 'src/app/store/reducers';
import { ProductStore } from '../../../../store/reducers/product.reducer';
import { IProduct } from 'src/app/core/models/informationGeneral/Product';

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
    const {
      _product,
      date,
      planningInstrument,
      description,
      responsibleName,
      email,
      phone
    } = this.generalInformation.value;

    const idea: GeneralInformation = {
      productId: _product.code,
      productName: _product.name,
      date,
      planningInstrument,
      description,
      idEntity: '11111',
      nameEntity: 'testEntity',
      responsibleName,
      email,
      phone,
      definitionPotentiality: 'Definicion de la Potencialidad',
      baseLine: 'Linea base, otra descripcion',
      descriptionCurrentSituation: 'Descripcion de la situacion actual',
      generalObjective: "Descripción de objetivo general ",
      expectedChange: "Resultado o cambio esperado respecto a indicadores       (resultado final) ",
      possibleEffects: [
        {
            "description": "Posible Efecto 01"
        },
        {
            "description": "Posible Efecto 02"
        },
        {
            "description": "Posible Efecto 03"
        }
    ],
    possibleCauses: [
        {
            "description": "Posible Causa 01"
        },
        {
            "description": "Posible Causa 02"
        },
        {
            "description": "Posible Causa 03"
        }
    ],
    possibleAlternatives: [
        {
            "description": "Posible alternatives 01"
        },
        {
            "description": "Posible alternatives 02"
        },
        {
            "description": "Posible alternatives 03"
        }
    ]
    }

    if (this.idea) {
      this.ideaStore.dispatch(UPDATE_IDEA({
        idea
      }))
      return;
    }

    this.ideaStore.dispatch(CREATE_IDEA({
      idea
    }))
  }

}
