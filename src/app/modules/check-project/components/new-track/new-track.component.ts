import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IComment } from 'src/app/core/models/seguimiento/comment';
import { Entity } from 'src/app/core/models/sinafip/entity';
import { READ_ENTITIES } from 'src/app/store/actions';
import { EntityStore } from 'src/app/store/reducers';

@Component({
  selector: 'app-new-track',
  templateUrl: './new-track.component.html',
  styleUrls: ['./new-track.component.scss']
})
export class NewTrackComponent implements OnInit {

  track = new FormGroup({
    iapa: new FormControl(),
    iapb: new FormControl(),
    iapc: new FormControl(),
    activity: new FormControl('ASESORÍA A LA EPI', Validators.required),
    reportDate: new FormControl(),
  })

  advisoryEpi = new FormGroup({
    goal: new FormControl(''),
    action: new FormControl(''),
    entity: new FormControl(''),
    advTheme: new FormControl('', [Validators.maxLength(200)]),
    participantName: new FormControl(''),
    participantPosition: new FormControl(''),
    advDate: new FormControl(''),
    reportDate: new FormControl(''),
    place: new FormControl('', [Validators.maxLength(200)]),
    objective: new FormControl('', [Validators.maxLength(200)]),
    devAdv: new FormControl('', [Validators.maxLength(400)]),
    conclusions: new FormControl('', [Validators.maxLength(200)]),
    commitments: new FormControl('', [Validators.maxLength(200)]),
    specialist: new FormControl(''),
    doc: new FormControl(null),
  })

  advisoryDoc = new FormGroup({
    goal: new FormControl(''),
    action: new FormControl(''),
    entity: new FormControl(''),
    advTheme: new FormControl('', [Validators.maxLength(200)]),
    snipCode: new FormControl(''),
    projectName: new FormControl(''),
    participant: new FormControl(''),
    analysisDate: new FormControl(''),
    advDate: new FormControl(''),
    assistant: new FormControl(''),
    conclusions: new FormControl(''),
    recomend: new FormControl('', [Validators.maxLength(400)]),
    comments: new FormControl('', [Validators.maxLength(400)]),
  })

  comments: IComment[] = []
  theme = new FormControl('')
  description = new FormControl('', [Validators.maxLength(200)])

  entities: Entity[] = [];
  entityStoreSubscription = new Subscription();

  constructor(
    private entityStore: Store<EntityStore>
  ) { }

  ngOnInit(): void {

    this.entityStoreSubscription = this.entityStore.select('entity')
      .subscribe(state => {
        this.entities = state.entities;
      })
    this.entityStore.dispatch(READ_ENTITIES())

  }

  onSubmit(): void {
  }

}
