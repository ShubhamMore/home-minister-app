import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: '**', redirectTo: 'page-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
