import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';
import { CLOSE_FULL_DRAWER, OPEN_FULL_DRAWER, UPDATE_CREATED_IDEA, UPDATE_SEND_IDEA } from 'src/app/store/actions';
import { IdeaStore } from 'src/app/store/reducers';
import { AlertDialogComponent } from '../../../../shared/components/alert-dialog/alert-dialog.component';
import { GeneralInformationService } from 'src/app/core/services/httpServices/generalInformation.service';

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

  constructor(
    public dialog: MatDialog,
    private generalInformationService: GeneralInformationService,
    private ideaStore: Store<IdeaStore>,
  ) { }

  ngOnInit(): void {

    this.ideaStoreSubscription =  this.ideaStore.select('idea')
    .subscribe(state => {
      this.currentIdea = state.idea;
    })

  }

  openFullDrawer(fullTitle: string, fullComponent: string): void {
    this.ideaStore.dispatch(OPEN_FULL_DRAWER({fullTitle, fullComponent}))
  }

  sendIdea(): void {

    this.generalInformationService.getAlternatives(this.currentIdea.codigo)
      .subscribe(data => {
        this.alternatives = data
        if (data?.length <= 0) {
          const dialogRef = this.dialog.open(AlertDialogComponent, {
            width: '250px',
            data: {title: 'No se puede enviar la Idea', description: 'Para Enviar la idea, es necesario crear al menos una alternativa'}
          });
      
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
          });
          return;
        }
        else{
          this.currentIdea = {
            ...this.currentIdea,
            state: 'ENVIADA'
          }
          this.ideaStore.dispatch( UPDATE_CREATED_IDEA({idea: this.currentIdea}) )
          this.ideaStore.dispatch( CLOSE_FULL_DRAWER() )
        }
      });



  }

  finishIdea(): void {

    if(this.currentIdea.result === 'PENDIENTE'){
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        width: '250px',
        data: {title: 'No se puede finalizar el analisis', description: 'Para finalizar el analisis, es necesario que califique al menos una alternativa'}
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
    this.ideaStore.dispatch( UPDATE_SEND_IDEA({idea: this.currentIdea}) )
    this.ideaStore.dispatch( CLOSE_FULL_DRAWER() )
  }
  getAlternatives(): void {
    console.log(this.currentIdea);

  }
}
