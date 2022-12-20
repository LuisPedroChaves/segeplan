import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ChekProjectService } from 'src/app/core/services/httpServices/chek-project.service';
import { CLOSE_FORM_DRAWER, READ_ENTITIES, SET_EDIT_PROJECT, SET_PROJECT, SET_TRACKING } from 'src/app/store/actions';
import { CheckProjectStore, EntityStore } from 'src/app/store/reducers';
import { Entity, IAdvisoryDoc, IAdvisoryEpi, IComment, IProject, ITrack } from '../../../../core/models';

@Component({
  selector: 'app-new-track',
  templateUrl: './new-track.component.html',
  styleUrls: ['./new-track.component.scss']
})
export class NewTrackComponent implements OnInit, OnDestroy {

  @ViewChild('stepper') stepper: MatStepper

  track = new FormGroup({
    iapa: new FormControl(null, Validators.required),
    iapb: new FormControl(null, Validators.required),
    iapc: new FormControl(null, Validators.required),
    activity: new FormControl('ASESORÍA A LA EPI', Validators.required),
    reportDate: new FormControl(null, Validators.required),
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
    conclusions: new FormControl('', [Validators.maxLength(400)]),
    recomend: new FormControl('', [Validators.maxLength(400)]),
  })

  comments: IComment[] = []
  theme = new FormControl('')
  description = new FormControl('', [Validators.maxLength(200)])

  entities: Entity[] = [];
  entityStoreSubscription = new Subscription();

  checkProjectSubscription = new Subscription()
  project: IProject = null;

  constructor(
    private entityStore: Store<EntityStore>,
    private checkProjectStore: Store<CheckProjectStore>,
    private checkProjectService: ChekProjectService
  ) { }

  ngOnInit(): void {

    this.entityStoreSubscription = this.entityStore.select('entity')
      .subscribe(state => {
        this.entities = state.entities;
      })
    this.entityStore.dispatch(READ_ENTITIES())

    this.checkProjectSubscription = this.checkProjectStore.select('checkProject')
      .subscribe(state => {

        if (state.project) {
          this.project = state.project
        }

      })

  }

  ngOnDestroy(): void {
    this.entityStoreSubscription?.unsubscribe()
    this.checkProjectSubscription?.unsubscribe()
  }

  addComment(): void {

    const comment: IComment = {
      theme: this.theme.value,
      description: this.description.value
    }

    this.comments.push(comment)

    this.theme.setValue(null)
    this.description.setValue(null)
  }

  removeComment(index: number): void {

    if (index > -1) {
      this.comments.splice(index, 1)
    }

  }

  onSubmit(): void {

    const {
      iapa,
      iapb,
      iapc,
      activity,
      reportDate,
    } = this.track.value

    const NEW_TRACK: ITrack = {
      iapa,
      iapb,
      iapc,
      activity,
      reportDate,
      projectId: this.project.id,
      advisoryEpi: null,
      advisoryDoc: null
    }

    if (activity === 'ASESORÍA A LA EPI') {

      const {
        goal,
        action,
        entity,
        advTheme,
        participantName,
        participantPosition,
        advDate,
        reportDate,
        place,
        objective,
        devAdv,
        conclusions,
        commitments,
        specialist,
        doc
      } = this.advisoryEpi.value

      const NEW_ADVISORY_EPI: IAdvisoryEpi = {
        goal,
        action,
        entity,
        advTheme,
        participantName,
        participantPosition,
        advDate,
        reportDate,
        place,
        objective,
        devAdv,
        conclusions,
        commitments,
        specialist,
        doc
      }

      NEW_TRACK.advisoryEpi = { ...NEW_ADVISORY_EPI }


      this.checkProjectService.addTrack(NEW_TRACK, this.project.id)
        .subscribe(project => {

          this.checkProjectStore.dispatch(SET_TRACKING({ tracking: project.tracking }))
          this.checkProjectStore.dispatch(SET_EDIT_PROJECT({ checkProject: project }))

        })

      this.stepper.reset()
      this.advisoryEpi.reset({
        doc: null
      })
      this.checkProjectStore.dispatch(CLOSE_FORM_DRAWER())

      return
    }

    if (activity === 'ASESORÍA AL DOCUMENTO') {

      const {
        goal,
        action,
        entity,
        advTheme,
        snipCode,
        projectName,
        participant,
        analysisDate,
        advDate,
        assistant,
        conclusions,
        recomend,
      } = this.advisoryDoc.value

      const NEW_ADVISORY_DOC: IAdvisoryDoc = {
        goal,
        action,
        entity,
        advTheme,
        snipCode,
        projectName,
        participant,
        analysisDate,
        advDate,
        assistant,
        conclusions,
        recomend,
        comments: this.comments
      }

      NEW_TRACK.advisoryDoc = { ...NEW_ADVISORY_DOC }


      this.checkProjectService.addTrack(NEW_TRACK, this.project.id)
        .subscribe(project => {

          this.checkProjectStore.dispatch(SET_TRACKING({ tracking: project.tracking }))
          this.checkProjectStore.dispatch(SET_EDIT_PROJECT({ checkProject: project }))

        })

      this.stepper.reset()
      this.advisoryDoc.reset()
      this.comments = []
      this.checkProjectStore.dispatch(CLOSE_FORM_DRAWER())

      return
    }


  }

}
