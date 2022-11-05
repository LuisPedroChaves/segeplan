import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';
import { CLOSE_FULL_DRAWER, OPEN_FULL_DRAWER, UPDATE_CREATED_IDEA, UPDATE_SEND_IDEA } from 'src/app/store/actions';
import { IdeaStore } from 'src/app/store/reducers';
import { AlertDialogComponent } from '../../../../shared/components/alert-dialog/alert-dialog.component';
import { GeneralInformationService } from 'src/app/core/services/httpServices/generalInformation.service';
import { User } from '../../../../core/models/adicionales/user';
import { AppState } from '../../../../store/app.reducer';
import { IdeaAlternative } from '../../../../core/models/alternative/ideaAlternative';

@Component({
  selector: 'app-idea-card',
  templateUrl: './idea-card.component.html',
  styleUrls: ['./idea-card.component.scss']
})
export class IdeaCardComponent implements OnInit {

  alternatives: any[] = [
    {
      preliminaryName: {
        typeProject: 'Proyecto 1...',
        proccess: 'Process...',
        object: 'Object...'
      },
      projectDescription: {
        complexity: 'Alto...'
      }
    }
  ];

  ideaStoreSubscription = new Subscription();
  currentIdea: GeneralInformation = null;

  sessionSubscription: Subscription;
  usuario: User;


  constructor(
    public dialog: MatDialog,
    private generalInformationService: GeneralInformationService,
    public store: Store<AppState>,
    private ideaStore: Store<IdeaStore>,
  ) { }

  ngOnInit(): void {

    this.ideaStoreSubscription = this.ideaStore.select('idea')
      .subscribe(state => {
        this.currentIdea = state.idea;
      })

    this.sessionSubscription = this.store.select('session').subscribe(session => {
      this.usuario = session.session.usuario;
    });
  }

  openFullDrawer(fullTitle: string, fullComponent: string): void {
    this.ideaStore.dispatch(OPEN_FULL_DRAWER({ fullTitle, fullComponent }))
  }

  sendIdea(): void {

    this.generalInformationService.getAlternatives(this.currentIdea.codigo)
      .subscribe(data => {
        this.alternatives = data
        if (data?.length <= 0) {
          const dialogRef = this.dialog.open(AlertDialogComponent, {
            width: '250px',
            data: { title: 'No se puede enviar la Idea', description: 'Para Enviar la idea, es necesario crear al menos una alternativa' }
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
          });
          return;
        }
        else {
          this.currentIdea = {
            ...this.currentIdea,
            state: 'ENVIADA'
          }
          this.ideaStore.dispatch(UPDATE_CREATED_IDEA({ idea: this.currentIdea }))
          this.ideaStore.dispatch(CLOSE_FULL_DRAWER())
        }
      });
  }

  finishIdea(): void {

    let alternativesPending = this.currentIdea.alternatives.find((alternative: IdeaAlternative) => alternative.state == 'CREADA');

    if (this.currentIdea.result === 'PENDIENTE') {
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        width: '250px',
        data: { title: 'No se puede finalizar el analisis', description: 'Es necesario iniciar con el analisis antes de finalizar', confimation: false }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
      });
      return;
    } else if (alternativesPending) {
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        width: '250px',
        data: { title: 'No se puede finalizar el analisis', description: 'Es necesario que califique todas las alternativas para finalizar el analisis, ', confirmation: false }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
      });
      return;
    }

    this.currentIdea = {
      ...this.currentIdea,
      state: 'CALIFICADA'
    }
    this.ideaStore.dispatch(UPDATE_SEND_IDEA({ idea: this.currentIdea }))
    this.ideaStore.dispatch(CLOSE_FULL_DRAWER())
  }
  getAlternatives(): void {
    console.log(this.currentIdea);

  }
}
