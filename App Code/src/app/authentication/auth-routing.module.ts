import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { LoginAuthGuard } from './auth/guards/login.auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginAuthGuard] },

  { path: 'register', component: RegisterComponent, canActivate: [LoginAuthGuard] },

  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
    canActivate: [LoginAuthGuard],
  },

  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
    canActivate: [LoginAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
