import { Injectable } from '@angular/core';
import { Http, Request, Response, RequestOptions, Headers } from '@angular/http';

import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { ClientSecurityToken } from '../models/SwiSecurityModels';

@Injectable()
export class SwiSecurityService {

  private baseUrl: string = "http://localhost:4001/api/security/";

  constructor(private http: Http) { }

  public login(username: string, password: string, clientName: string): Observable<any> {

    let subject: Subject<boolean> = new Subject<boolean>();
    let url: string = this.baseUrl + 'login';
    let loginBody = {
      username: username,
      password: password,
      clientName: clientName
    };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, loginBody, options)
     // .do(console.log)
      .map((res) => {
        return res.json();
      })
      .subscribe(
      (data) => {
        this.updateStoredToken(data);
        subject.next(true);
        subject.complete();
      },
      (err) => {
        subject.error(err);
      }
      );

    return subject.asObservable();
  }

  public refreshToken(): Observable<boolean>{
    let subject: Subject<boolean> = new Subject<boolean>();
    let currentToken = localStorage.getItem("token");
    let url: string = this.baseUrl + 'refreshtoken';
    let refreshBody = {
      token: currentToken
    };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, refreshBody, options)
      .map(
      data => {
        return data.json();
      }
      )
      .subscribe(
      data => {
        this.updateStoredToken(data);
        subject.next(true);
        subject.complete();
      },
      err => {
        subject.error(err);
      }
      );

    return subject.asObservable();
  }

  private updateStoredToken(token: ClientSecurityToken) {
    localStorage.setItem("token", token.token);
    localStorage.setItem("expiresOn", token.expiresOn.toString());
  }

}
