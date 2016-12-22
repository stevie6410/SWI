import { Component } from '@angular/core';

import { SwiSecurityService } from './shared/services/swi-security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private securityService: SwiSecurityService) {

  }

  login() {
    this.securityService.login("kents", "Sp5tfire", "SWIWebApp")
      .subscribe(
      (data) => { console.log("logged in", data); },
      (err) => { console.log("error logging in", err) }
      );
  }

  refreshToken() {
    this.securityService.refreshToken()
      .subscribe(
      (data: boolean) => { console.log("refreshed token", data); },
      (err) => { console.log("error refreshing token", err) }
      );
  }

  logout() {
    this.securityService.logout()
      .subscribe(
      (data: boolean) => { console.log("logged out", data); },
      (err) => { console.log("error logging out", err) }
      );
  }

  validateSession() {
    this.securityService.isSessionValid()
      .subscribe(
      (data: boolean) => { console.log("Session Valid", data); },
      err => { console.log("Error while checking session"); }
      );
  }

}
