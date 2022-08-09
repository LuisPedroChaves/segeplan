import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import * as moment from 'moment';

import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';
import { CLOSE_FULL_DRAWER, CREATE_IDEA, UPDATE_IDEA } from 'src/app/store/actions';
import { IdeaStore } from 'src/app/store/reducers';
import { ProductStore } from '../../../../store/reducers/product.reducer';
import { IProduct } from 'src/app/core/models/informationGeneral/Product';
import { PossibleEffect } from 'src/app/core/models/informationGeneral/PossibleEffect';
import { PossibleCause } from 'src/app/core/models/informationGeneral/PossibleCause';
import { PossibleAlternative } from 'src/app/core/models/informationGeneral/PossibleAlternative';

@Component({
  selector: 'app-new-idea',
  templateUrl: './new-idea.component.html',
  styleUrls: ['./new-idea.component.scss']
})
export class NewIdeaComponent implements OnInit, OnDestroy {

  get formEffects(): FormArray {
    return this.generalInformation.get('possibleEffects') as FormArray;
  }

  get formCauses(): FormArray {
    return this.generalInformation.get('possibleCauses') as FormArray;
  }

  get formAlternatives(): FormArray {
    return this.generalInformation.get('possibleAlternatives') as FormArray;
  }

  generalInformation = new FormGroup({
    _product: new FormControl(null, Validators.required),
    date: new FormControl(moment(), Validators.required),
    planningInstrument: new FormControl(true, Validators.required),
    description: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    responsibleName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    possibleEffects: this.FormBuilder.array<PossibleEffect>([]),
    definitionPotentiality: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    possibleCauses: this.FormBuilder.array<PossibleCause>([]),
    baseLine: new FormControl('', [Validators.required]),
    descriptionCurrentSituation: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    generalObjective: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    expectedChange: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    possibleAlternatives: this.FormBuilder.array<PossibleAlternative>([]),
  });

  effectsColumns: string[] = ['description', 'remove'];
  effectsSource = new BehaviorSubject<AbstractControl[]>([]);

  causesColumns: string[] = ['description', 'remove'];
  causesSource = new BehaviorSubject<AbstractControl[]>([]);

  alternativesColumns: string[] = ['description', 'remove'];
  alternativesSource = new BehaviorSubject<AbstractControl[]>([]);

  products: IProduct[] = [];
  productStoreSubscription = new Subscription();

  idea: GeneralInformation = null!
  ideaStoreSubscription = new Subscription();

  drawerSubscription = new Subscription();
  fullTitle = '';

  constructor(
    private productStore: Store<ProductStore>,
    private ideaStore: Store<IdeaStore>,
    private FormBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.drawerSubscription = this.ideaStore.select('drawer')
      .subscribe(state => {
        this.fullTitle = state.fullTitle
      });

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
    this.drawerSubscription?.unsubscribe();
    this.productStoreSubscription?.unsubscribe();
    this.ideaStoreSubscription?.unsubscribe();
  }

  closeFullDrawer(): void {
    this.ideaStore.dispatch(CLOSE_FULL_DRAWER())
  }

  changeDescription(event: MatSlideToggleChange): void {
    const description = this.generalInformation.get('description');

    if (event.checked) {
      description!.enable();
      return
    }

    description!.disable();
  }

  /* #region  formArrays */

  addEffect(): void {
    const NEW_DETAIL: FormGroup = this.FormBuilder.group({
      description: new FormControl('', Validators.required),
    });
    this.formEffects.push(NEW_DETAIL);

    this.effectsSource.next(this.formEffects.controls);
  }

  removeEffect(index: number): void {
    this.formEffects.removeAt(index);
    this.effectsSource.next(this.formEffects.controls);
  }

  addCauses(): void {
    const NEW_DETAIL: FormGroup = this.FormBuilder.group({
      description: new FormControl('', Validators.required),
    });
    this.formCauses.push(NEW_DETAIL);

    this.causesSource.next(this.formCauses.controls);
  }

  removeCauses(index: number): void {
    this.formCauses.removeAt(index);
    this.causesSource.next(this.formCauses.controls);
  }

  addAlternatives(): void {
    const NEW_DETAIL: FormGroup = this.FormBuilder.group({
      description: new FormControl('', Validators.required),
    });
    this.formAlternatives.push(NEW_DETAIL);

    this.alternativesSource.next(this.formAlternatives.controls);
  }

  removeAlternatives(index: number): void {
    this.formAlternatives.removeAt(index);
    this.alternativesSource.next(this.formAlternatives.controls);
  }
  /* #endregion */

  saveGeneralInformation(): void {

    //TODO:Condicionar si el formulario es valido

    const {
      _product,
      date,
      planningInstrument,
      description,
      responsibleName,
      email,
      phone,
      possibleEffects,
      definitionPotentiality,
      possibleCauses,
      baseLine,
      descriptionCurrentSituation,
      generalObjective,
      expectedChange,
      possibleAlternatives
    } = this.generalInformation.value;

    const idea: GeneralInformation = {
      productId: _product.code,
      productName: _product.name,
      date,
      planningInstrument,
      description,
      idEntity: '',
      nameEntity: '',
      responsibleName,
      email,
      phone,
      possibleEffects,
      definitionPotentiality,
      possibleCauses,
      baseLine,
      descriptionCurrentSituation,
      generalObjective,
      expectedChange,
      possibleAlternatives,
      alternatives: []
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

    this.ideaStore.dispatch(CLOSE_FULL_DRAWER())

    this.generalInformation.reset({
      date: moment(),
      planningInstrument: true
    })
  }

}
