import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { Validator } from './validators';

import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  declarations: [
    // LOADING SPINNER
    LoadingSpinnerComponent,
    // PAGE NOT FOUND
    PageNotFoundComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedRoutingModule],
  exports: [
    LoadingSpinnerComponent,
    PageNotFoundComponent,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [Validator],
})
export class SharedModule {}
