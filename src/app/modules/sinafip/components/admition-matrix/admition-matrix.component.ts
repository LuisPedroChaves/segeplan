import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { CLOSE_FULL_DRAWER } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducer';
import { IRequest } from '../../../../core/models/sinafip/request';
import { SinafipService } from '../../../../core/services/httpServices/sinafip.service';
import { InitiativeStore } from '../../../../store/reducers';

@Component({
  selector: 'app-admition-matrix',
  templateUrl: './admition-matrix.component.html',
  styleUrls: ['./admition-matrix.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ]
})
export class AdmitionMatrixComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') stepper: MatStepper;

  drawerSubscription = new Subscription();
  fullTitle = '';
  initiativeStoreSubscription = new Subscription()
  initiative: IRequest = null;


  criterio1 = new FormGroup({
    statementNeedValue: new FormControl('', Validators.required),
    statementNeedDescription: new FormControl(''),
  })
  criterio2 = new FormGroup({
    numberBeneficiariesValue: new FormControl('', Validators.required),
    numberBeneficiariesDescription: new FormControl(''),
  })
  criterio3 = new FormGroup({
    objetivesGoalsValue: new FormControl('', Validators.required),
    objetivesGoalsDescription: new FormControl(''),
  })
  criterio4 = new FormGroup({
    tdrValue: new FormControl('', Validators.required),
    tdrDescription: new FormControl(''),
  })
  criterio5 = new FormGroup({
    estimatedCostValue: new FormControl('', Validators.required),
    estimatedCostDescription: new FormControl(''),
  })
  criterio6 = new FormGroup({
    generalScheduleValue: new FormControl('', Validators.required),
    generalScheduleDescription: new FormControl(''),
  })
  // resume = new FormGroup({
  //   descriptionGeneral: new FormControl(''),
  // })

  rating30 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  rating20 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  rating10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];




  constructor(
    private appStore: Store<AppState>,
    private initiativeStore: Store<InitiativeStore>,
    private sinafipService: SinafipService,

  ) { }

  ngOnInit(): void {
    this.initiativeStoreSubscription = this.initiativeStore.select('initiative')
      .subscribe(state => {

        if (state.initiative) {
          this.initiative = state.initiative
          console.log(this.initiative)
        }

      })

    this.drawerSubscription = this.appStore.select('drawer')
      .subscribe(state => {
        this.fullTitle = state.fullTitle
      });

  }

  ngOnDestroy(): void {
    this.drawerSubscription?.unsubscribe()
  }

  closeFullDrawer(): void {
    this.appStore.dispatch(CLOSE_FULL_DRAWER())
  }

}
