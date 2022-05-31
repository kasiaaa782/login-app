import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SignInData } from 'src/app/core/model/signInData';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly mockUser = new SignInData('kate@mail.com', 'test123');

  isAuthenticated = false;

  constructor(private router: Router) {}

  authenticate(signInData: SignInData): boolean {
    if (this.checkCredentails(signInData)) {
      this.isAuthenticated = true;
      this.router.navigate(['home']);
      return true;
    }
    this.isAuthenticated = false;
    return false;
  }

  private checkCredentails(signInData: SignInData): boolean {
    return (
      this.checkEmail(signInData.getEmail()) &&
      this.checkPassword(signInData.getPassword())
    );
  }

  private checkEmail(email: string): boolean {
    return email === this.mockUser.getEmail();
  }

  private checkPassword(paswword: string): boolean {
    return paswword === this.mockUser.getPassword();
  }

  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['']);
  }
}
