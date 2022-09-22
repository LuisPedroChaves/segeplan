import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as moment from 'moment';

import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';
import { CLOSE_FULL_DRAWER, CLOSE_FULL_DRAWER2, CREATE_IDEA, OPEN_FULL_DRAWER2, READ_PRODUCTS, SET_ALTERNATIVE } from 'src/app/store/actions';
import { IdeaStore } from 'src/app/store/reducers';
import { ProductStore } from '../../../../store/reducers/product.reducer';
import { IProduct } from 'src/app/core/models/adicionales/Product';
import { PossibleEffect } from 'src/app/core/models/informationGeneral/PossibleEffect';
import { PossibleCause } from 'src/app/core/models/informationGeneral/PossibleCause';
import { PossibleAlternative } from 'src/app/core/models/informationGeneral/PossibleAlternative';
import { MatDrawer } from '@angular/material/sidenav';
import { IdeaAlternative } from 'src/app/core/models/alternative/ideaAlternative';
import { AppState } from '../../../../store/app.reducer';
import { User } from '../../../../core/models/adicionales/user';

@Component({
  selector: 'app-new-idea',
  templateUrl: './new-idea.component.html',
  styleUrls: ['./new-idea.component.scss']
})
export class NewIdeaComponent implements OnInit, OnDestroy {

  @ViewChild('fullDrawer2') fullDrawer2!: MatDrawer;

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
    _product: new FormControl<string | IProduct>('', Validators.required),
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
  filteredProducts: Observable<IProduct[]>;
  productStoreSubscription = new Subscription();

  idea: GeneralInformation = null!
  ideaStoreSubscription = new Subscription();

  sessionSubscription: Subscription;
  usuario: User;

  drawerSubscription = new Subscription();
  fullTitle = '';
  fullTitle2 = '';
  fullComponent2 = '';
  idEntidad = '';

  constructor(
    private productStore: Store<ProductStore>,
    private ideaStore: Store<IdeaStore>,
    public store: Store<AppState>,
    private FormBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.sessionSubscription = this.store.select('session').subscribe(session => {
      // this.loading = session.loading;
      // this.errormsg = null;
      // this.showError = false;
      // if (session.error !== null) {
      //   this.error = session.error.errorMsg;
      //   this.showError = true;
      // }
      // this.loaded = session.loaded;
      this.usuario = session.session.usuario;
      this.idEntidad = session.session.usuario.id_inst.toString()
    });
    this.drawerSubscription = this.ideaStore.select('drawer')
      .subscribe(state => {
        this.fullTitle = state.fullTitle

        if (this.fullDrawer2) {
          this.fullDrawer2.opened = state.fullDrawer2
        }
        this.fullTitle2 = state.fullTitle2
        this.fullComponent2 = state.fullComponent2
      });

    this.productStoreSubscription = this.productStore.select('product')
      .subscribe(state => {
        this.products = state.products;
      })

    this.ideaStoreSubscription = this.ideaStore.select('idea')
      .subscribe(state => {
        this.idea = state.idea;
      })

    

    this.productStore.dispatch(READ_PRODUCTS({ filtro: this.idEntidad }))

    this.filteredProducts = this.generalInformation.controls['_product'].valueChanges.pipe(
      startWith(''),
      map(value => {
        const nombre = typeof value === 'string' ? value : value?.nombre;
        return nombre ? this._filter(nombre as string) : this.products;
      }),
    );


  }

  ngOnDestroy(): void {
    this.drawerSubscription?.unsubscribe();
    this.productStoreSubscription?.unsubscribe();
    this.ideaStoreSubscription?.unsubscribe();
    this.sessionSubscription?.unsubscribe();
  }

  closeFullDrawer(): void {
    this.ideaStore.dispatch(CLOSE_FULL_DRAWER())
  }

  openFullDrawer2(fullTitle2: string, fullComponent2: string, alternative: IdeaAlternative): void {
    this.ideaStore.dispatch(SET_ALTERNATIVE({ alternative }))
    this.ideaStore.dispatch(OPEN_FULL_DRAWER2({ fullTitle2, fullComponent2 }))
  }

  closeFullDrawer2(): void {
    this.ideaStore.dispatch(CLOSE_FULL_DRAWER2())
  }

  changeDescription(event: MatSlideToggleChange): void {
    const description = this.generalInformation.get('description');

    if (event.checked) {
      description!.enable();
      return
    }

    description!.disable();
  }

  private _filter(nombre: string): IProduct[] {
    const filterValue = nombre.toLowerCase();

    return this.products.filter(product => product.nombre.toLowerCase().includes(filterValue));
  }

  selectedProduct(): string {
    const PRODUCT = this.generalInformation.controls['_product'].value;
    return typeof PRODUCT === 'string' ? '' : PRODUCT?.nombre
  }

  /* #region  formArrays */

  displayProduct(product: IProduct) : string {
    return product ? product.nombre : '';
  }

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

    console.log(this.generalInformation)
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
      productId: typeof _product === 'string' ? null : _product?.codigo,
      productName: typeof _product === 'string' ? null : _product?.nombre,
      date,
      planningInstrument,
      description,
      idEntity: this.usuario.id_inst,
      nameEntity: this.usuario.name_inst,
      responsibleName,
      email,
      phone,
      Effects: possibleEffects,
      definitionPotentiality,
      Causes: possibleCauses,
      baseLine,
      descriptionCurrentSituation,
      generalObjective,
      expectedChange,
      Alternatives: possibleAlternatives,
      alternatives: [],
      author: this.usuario.id
    }

    console.log(idea);


    this.ideaStore.dispatch(CREATE_IDEA({
      idea: {
        ...idea,
        alternatives: this.idea.alternatives
      }
    }))

    this.ideaStore.dispatch(CLOSE_FULL_DRAWER())

    this.generalInformation.reset({
      date: moment(),
      planningInstrument: true
    })
  }

}
