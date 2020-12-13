import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { AuthService, AuthResponseData } from '../auth/auth-service/auth.service';
import { EncryptService } from '../../services/shared-services/encrypt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../authentication.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  error: string = null;

  authObs: Observable<AuthResponseData>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private encryptService: EncryptService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;

    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
    this.loading = false;
  }

  login() {
    if (!this.form.valid) {
      return;
    }
    this.loading = true;

    const email = this.form.value.email;
    const password = this.encryptService.encrypt(this.form.value.password, environment.encKey);

    this.authObs = this.authService.login(email, password);
    this.authSubscribe();
  }

  authSubscribe() {
    this.authObs.subscribe(
      (resData: any) => {
        console.log(resData);
        this.loading = false;
        if (resData.userType === 'user') {
          this.router.navigate(['/dashboard/products'], { relativeTo: this.route });
        } else {
          this.router.navigate(['/login'], {
            relativeTo: this.route,
          });
        }
        this.form.reset();
      },
      (errorMessage: any) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.loading = false;
      }
    );
  }

  onErrorClose() {
    this.error = null;
  }
}
