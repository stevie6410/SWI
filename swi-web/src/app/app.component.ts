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
      (data) => { console.log("logged in", data); },
      (err) => { console.log("error logging in", err) }
      );
  }

  logout() {

  }

}
