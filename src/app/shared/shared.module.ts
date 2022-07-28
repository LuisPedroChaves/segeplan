import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* #region Material  */
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatRippleModule} from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';
/* #endregion */

import { FlexLayoutModule } from '@angular/flex-layout';
import { SimplebarAngularModule } from 'simplebar-angular';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';

@NgModule({
  declarations: [
    MobileMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    /* #region  Material */
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatSidenavModule,
    MatStepperModule,
    MatInputModule,
    MatCheckboxModule,
    MatBottomSheetModule,
    MatTooltipModule,
    MatRippleModule,
    MatChipsModule,
    /* #endregion */
    FlexLayoutModule,
    SimplebarAngularModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    /* #region  Material */
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatSidenavModule,
    MatStepperModule,
    MatInputModule,
    MatCheckboxModule,
    MatBottomSheetModule,
    MatTooltipModule,
    MatRippleModule,
    MatChipsModule,
    /* #endregion */
    FlexLayoutModule,
    SimplebarAngularModule
  ]
})
export class SharedModule { }
