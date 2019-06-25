import { Injectable } from '@angular/core';
import { AccountN1Service } from 'app/core/auth/accountN1.service';
import { AuthServerProvider } from 'app/core/auth/auth-jwt.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private accountService: AccountN1Service, private authServerProvider: AuthServerProvider) {}

  login(credentials, callback?) {
    const cb = callback || function() {};

    return new Promise((resolve, reject) => {
      this.authServerProvider.login(credentials).subscribe(
        data => {
          this.accountService.identity(true).then(account => {
            resolve(data);
          });
          return cb();
        },
        err => {
          this.logout();
          reject(err);
          return cb(err);
        }
      );
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  logoutDirectly() {
    this.accountService.authenticate(null);
  }

  logout() {
    if (this.accountService.isAuthenticated()) {
      this.authServerProvider.logout().subscribe(() => this.accountService.authenticate(null));
    } else {
      this.accountService.authenticate(null);
    }
  }
}
