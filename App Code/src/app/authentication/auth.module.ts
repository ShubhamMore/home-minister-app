import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [BrowserModule, SharedModule, AuthRoutingModule],
  providers: [],
  bootstrap: [],
})
export class AuthModule {}
