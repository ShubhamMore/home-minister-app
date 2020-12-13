import { Component, OnInit } from '@angular/core';
import { AuthResponseData, AuthService } from '../auth/auth-service/auth.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EncryptService } from '../../services/shared-services/encrypt.service';
import { environment } from '../../../environments/environment';
import { Validator } from '../../shared/validators';
import { UserService } from '../../services/shared-services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../authentication.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  userExist: boolean;
  loading: boolean;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private encryptService: EncryptService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private validator: Validator
  ) {}

  ngOnInit() {
    this.loading = true;
    if (environment.production) {
      this.router.navigate(['/page_not_found'], { relativeTo: this.route });
      return;
    }

    this.userExist = false;
    this.form = this.formBuilder.group(
      {
        name: new FormControl(null, {
          validators: [Validators.required],
        }),
        email: new FormControl(null, {
          validators: [Validators.required, Validators.email],
        }),
        password: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(6)],
        }),
        confirm_password: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      {
        validators: this.validator.passwordValidator.bind(this),
      }
    );
    this.loading = false;
  }

  checkUser() {
    if (this.form.controls.email.status === 'VALID') {
      this.userService.checkUser(this.form.value.email).subscribe(
        (resData: any) => {
          this.userExist = resData.exist;
        },
        (errorMessage: any) => {
          this.error = errorMessage;
        }
      );
    }
  }

  register() {
    if (!this.form.valid && this.form.hasError('invalidPassword')) {
      this.error = 'Please fill All the fields Correctly..';
      return;
    } else if (this.userExist) {
      return;
    }

    this.loading = true;
    this.error = null;

    const data = {
      name: this.form.value.name.toLowerCase(),
      email: this.form.value.email,
      password: this.encryptService.encrypt(this.form.value.password, environment.encKey),
    };

    let authObs: Observable<AuthResponseData>;

    authObs = this.authService.createUser(data);

    authObs.subscribe(
      (resData) => {
        this.loading = false;
        this.router.navigate(['/dashboard/products'], { relativeTo: this.route });
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.loading = false;
      }
    );

    this.form.reset();
  }

  onErrorClose() {
    this.error = null;
  }
}
