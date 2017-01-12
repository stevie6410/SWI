import { Component, OnInit } from '@angular/core';

import { SwiSecurityService } from '../../../shared/services/swi-security.service';

@Component({
  selector: 'topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(private securityService: SwiSecurityService) { }

  ngOnInit() {
  }

  //Eventually we would want this all to be put into another layer. Probably a redirect to a dedicated login/user profile module.
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
