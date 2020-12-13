import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [BrowserModule, SharedModule, DashboardRoutingModule],
  providers: [],
  bootstrap: [DashboardComponent],
})
export class DashboardModule {}
