import { Component, OnInit } from '@angular/core';

import { AuthService, UserData } from './authentication/auth/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'TEAM DEVELOPERS';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const userData: UserData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    this.authService.autoLogin(userData);
  }
}
