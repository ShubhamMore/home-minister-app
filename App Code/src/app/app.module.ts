import { AuthModule } from './authentication/auth.module';
import { NgModule } from '@angular/core';

// MODULE
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';

// COMPONANTS
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

// ROUTING
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AuthModule,
    DashboardModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
