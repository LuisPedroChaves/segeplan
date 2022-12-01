import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs';
import { CLOSE_FORM_DRAWER, SET_DATA_GEO } from 'src/app/store/actions';
import { AlternativeStore } from 'src/app/store/reducers';
import { DataGeo } from '../../../../core/models/alternative/DataGeo';
import { AlertDialogComponent } from '../../../../shared/components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-new-data-geo',
  templateUrl: './new-data-geo.component.html',
  styleUrls: ['./new-data-geo.component.scss']
})
export class NewDataGeoComponent implements OnInit {

  dataGeo = new FormGroup({
    governmentTerrain: new FormControl(false),
    registerGovernmentTerrain: new FormControl(false),
    // Este campo solo sirve para habilitar finca folio y libro
    // No se almacena en la DB
    switchStatus: new FormControl(false),
    // ----------------------------------
    statusDescribe: new FormControl({ value: '', disabled: true }, [Validators.maxLength(200)]),
    finca: new FormControl({ value: '', disabled: true }),
    folio: new FormControl({ value: '', disabled: true }),
    libro: new FormControl({ value: '', disabled: true }),
    plano: new FormControl(false),
    slightIncline: new FormControl(false),
    broken: new FormControl(false),
    // Este campo solo sirve para habilitar imagen y descripción
    // No se almacena en la DB
    withImage: new FormControl(false),
    // ----------------------------------
    image: new FormControl({ value: '', disabled: true }),
    description: new FormControl({ value: '', disabled: true }, [Validators.maxLength(200)]),
    basicServices: new FormControl(false),
    descriptionBasicServices: new FormControl({ value: '', disabled: true }, [Validators.maxLength(200)]),
    degreesx: new FormControl('', Validators.required),
    minutesx: new FormControl('', Validators.required),
    secondsx: new FormControl('', Validators.required),
    degreesy: new FormControl('', Validators.required),
    minutesy: new FormControl('', Validators.required),
    secondsy: new FormControl('', Validators.required),
    descriptionLocation: new FormControl('', [Validators.maxLength(200)]),
  })

  constructor(
    private alternativeStore: Store<AlternativeStore>,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {

    this.dataGeo.controls['governmentTerrain'].valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.dataGeo.controls['registerGovernmentTerrain'].disable()
          return
        }

        this.dataGeo.controls['registerGovernmentTerrain'].enable()
      });
    this.dataGeo.controls['registerGovernmentTerrain'].valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.dataGeo.controls['governmentTerrain'].disable()
          return
        }

        this.dataGeo.controls['governmentTerrain'].enable()
      });

    this.dataGeo.controls['switchStatus'].valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.dataGeo.controls['statusDescribe'].enable()
          this.dataGeo.controls['finca'].enable()
          this.dataGeo.controls['folio'].enable()
          this.dataGeo.controls['libro'].enable()
          return
        }

        this.dataGeo.controls['statusDescribe'].disable()
        this.dataGeo.controls['finca'].disable()
        this.dataGeo.controls['folio'].disable()
        this.dataGeo.controls['libro'].disable()
      });

    this.dataGeo.controls['plano'].valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.dataGeo.controls['slightIncline'].disable()
          this.dataGeo.controls['broken'].disable()
          return
        }

        this.dataGeo.controls['slightIncline'].enable()
        this.dataGeo.controls['broken'].enable()
      });
    this.dataGeo.controls['slightIncline'].valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.dataGeo.controls['plano'].disable()
          this.dataGeo.controls['broken'].disable()
          return
        }

        this.dataGeo.controls['plano'].enable()
        this.dataGeo.controls['broken'].enable()
      });
    this.dataGeo.controls['broken'].valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.dataGeo.controls['slightIncline'].disable()
          this.dataGeo.controls['plano'].disable()
          return
        }

        this.dataGeo.controls['slightIncline'].enable()
        this.dataGeo.controls['plano'].enable()
      });

    this.dataGeo.controls['withImage'].valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.dataGeo.controls['image'].enable()
          this.dataGeo.controls['description'].enable()
          return
        }

        this.dataGeo.controls['image'].disable()
        this.dataGeo.controls['description'].disable()
      });

    this.dataGeo.controls['basicServices'].valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.dataGeo.controls['descriptionBasicServices'].enable()
          return
        }

        this.dataGeo.controls['descriptionBasicServices'].disable()
      });

  }

  onSubmit(): void {

    const {
      governmentTerrain,
      registerGovernmentTerrain,
      statusDescribe,
      finca,
      folio,
      libro,
      plano,
      slightIncline,
      broken,
      image,
      description,
      basicServices,
      descriptionBasicServices,
      degreesx,
      minutesx,
      secondsx,
      degreesy,
      minutesy,
      secondsy,
      descriptionLocation,
    } = this.dataGeo.value

    const NEW_DATA_GEO: DataGeo = {
      governmentTerrain,
      registerGovernmentTerrain,
      statusDescribe,
      finca,
      folio,
      libro,
      plano,
      slightIncline,
      broken,
      image,
      description,
      basicServices,
      descriptionBasicServices,
      degreesx,
      minutesx,
      secondsx,
      degreesy,
      minutesy,
      secondsy,
      descriptionLocation,
    }

    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '250px',
      data: { title: 'Agregar', description: '¿Esta seguro que desea agregar los detalles del terreno?', confirmation: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result === true) {

        console.log(image);


        // Code of Work
        this.alternativeStore.dispatch(SET_DATA_GEO({ dataGeo: NEW_DATA_GEO }))
        this.alternativeStore.dispatch(CLOSE_FORM_DRAWER())
        this.dataGeo.reset()
      }
      else {
        return;
      }
    });
  }

}
