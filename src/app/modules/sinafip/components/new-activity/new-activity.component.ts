import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Activity } from 'src/app/core/models/sinafip/activity';
import { CLOSE_FORM_DRAWER } from 'src/app/store/actions';
import { InitiativeStore } from 'src/app/store/reducers';
import { SET_ACTIVITY } from '../../../../store/actions/initiative.actions';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.scss']
})
export class NewActivityComponent implements OnInit {

  subtotal = 0;
  @Input() priceU: number;

  activity = new FormGroup({
    activity: new FormControl('', Validators.required),
    unitMeasure: new FormControl('', Validators.required),
    cant: new FormControl<number>(null, Validators.required),
    priceU: new FormControl<number>(null, Validators.required),
    // subTotal: new FormControl<number>(null, Validators.required),
  })

  constructor(
    private initiativeStore: Store<InitiativeStore>
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {

    const {
      activity,
      unitMeasure,
      cant,
      priceU,
    } = this.activity.value

    const NEW_ACTIVITY: Activity = {
      activity,
      unitMeasure,
      cant,
      priceU,
      subTotal: this.subtotal
    }

    this.initiativeStore.dispatch( SET_ACTIVITY({ activity: NEW_ACTIVITY }) )
    this.activity.reset()
    this.initiativeStore.dispatch( CLOSE_FORM_DRAWER() )

  }
  updateSubtotal(event){
    console.log(event)
    const {
      cant,
      priceU,
    } = this.activity.value;
    
    console.log(cant, priceU, this.subtotal);
    this.subtotal =  cant * priceU;

  }

}
