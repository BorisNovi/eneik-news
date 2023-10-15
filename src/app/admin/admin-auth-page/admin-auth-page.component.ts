import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-auth-page',
  templateUrl: './admin-auth-page.component.html',
  styleUrls: ['./admin-auth-page.component.scss'],
})
export class AdminAuthPageComponent {
  private static isAuthenticated = sessionStorage.getItem('isAuthenticated')
    ? Boolean(sessionStorage.getItem('isAuthenticated'))
    : false;

  accesstoken: string | null | undefined;
  refreshToken: string | null | undefined;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
    this.accesstoken;
    this.refreshToken = null;
  }

  async authentication() {
    await this.auth
      .getToken('login', 'password')
      .then(data => {
        this.accesstoken = data?.access;
        this.refreshToken = data?.refresh;
      })
      .catch(error => {
        throw error;
      });
  }

  async verification(token: string | null | undefined) {
    await this.auth
      .verifyToken(token)
      .then(data => {
        console.log('Vrification successful!', data);
      })
      .catch(error => {
        throw error;
      });
  }

  login() {
    const authenticationPromise = this.authentication();
    const verificationPromise = authenticationPromise.then(() =>
      this.verification(this.accesstoken)
    );

    Promise.all([authenticationPromise, verificationPromise])
      .then(() => {
        AdminAuthPageComponent.isAuthenticated = true;
        sessionStorage.setItem('isAuthenticated', 'true');
        this.router.navigate(['/admin']);
      })
      .catch(error => {
        if (error.error.detail) {
          console.log('Error:', error.error.detail);
        } else {
          console.log('An error occurred:', error);
        }
      });
  }

  static isAuthenticatedUser(): boolean {
    return AdminAuthPageComponent.isAuthenticated;
  }
}
