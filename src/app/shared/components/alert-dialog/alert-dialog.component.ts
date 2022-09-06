import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogMessage } from '../../../core/models/internal/dialogMessage';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {

  body: DialogMessage;

  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogMessage) {
      this.body = data
    }

  ngOnInit() {
    console.log(this.body)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
