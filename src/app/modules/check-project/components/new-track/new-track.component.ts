import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
    activity: new FormControl(),
    reportDate: new FormControl(),
  })

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {

  }

}
