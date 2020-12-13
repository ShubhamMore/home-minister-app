import { CartService } from './../services/cart.service';
import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../authentication/auth/auth-service/auth.service';
import { User } from '../authentication/auth/auth-model/user.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() id: string;
  isAuthenticated: boolean;
  isProduction: boolean;
  private userSub: Subscription;
  user: User;
  logo: string;
  title: string;

  cartItem: number;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.logo = environment.logo;
    this.title = environment.title;
    this.isProduction = environment.production;
    this.isAuthenticated = false;
    this.userSub = this.authService.getUser().subscribe((user) => {
      this.isAuthenticated = !!user;
      this.user = user;
      if (this.user) {
        this.id = this.user._id;
      }
    });

    this.cartItem = 0;

    this.cartService.getCartItemsCount().subscribe((items: number) => {
      this.cartItem = items;
    });
  }

  goToCart() {
    if (!!this.user && this.user.userType === 'user') {
      this.router.navigate(['/dashboard/cart'], { relativeTo: this.route });
    }
  }

  goToHome() {
    if (!!this.user && this.user.userType === 'user') {
      this.router.navigate(['/dashboard'], { relativeTo: this.route });
    } else {
      this.router.navigate(['/'], { relativeTo: this.route });
    }
  }

  onLogout() {
    this.authService.logout();
  }

  onLogoutAll() {
    this.authService.logoutAll();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
