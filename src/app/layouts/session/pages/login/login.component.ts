import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { LOGIN } from 'src/app/store/actions';

import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  sessionSubscription: Subscription;

  constructor(
    public store: Store<AppState>,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.sessionSubscription = this.store.select('session').subscribe(session => {
      // this.loading = session.loading;
      // this.errormsg = null;
      // this.showError = false;
      // if (session.error !== null) {
      //   this.error = session.error.errorMsg;
      //   this.showError = true;
      // }
      // this.loaded = session.loaded;
      console.log(session);

      if (session.session) {
        this.router.navigate(['/']);
      }
    });

  }


  ngOnDestroy() {
    this.sessionSubscription?.unsubscribe();
  }

  onSubmit(): void {
    if (this.loginForm.invalid) { return; }
    const { username, password } = this.loginForm.value;
    this.store.dispatch(LOGIN({ username, password }));
  }

}
