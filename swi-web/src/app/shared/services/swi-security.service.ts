import { Injectable } from '@angular/core';
import { Http, Request, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

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
      .map((res) => {
        return res.json();
      })
      .subscribe(
      (data: ClientSecurityToken) => {
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

  public refreshToken(): Observable<boolean> {
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

  public logout(): Observable<boolean> {
    let subject: Subject<boolean> = new Subject<boolean>();
    let currentToken = localStorage.getItem("token");
    if (!currentToken) {
      subject.next(false);
      subject.complete();
    } else {
      let url: string = this.baseUrl + 'logout';
      let refreshBody = { token: currentToken };
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      this.http.post(url, refreshBody, options)
        .subscribe(
        data => {
          subject.next(true);
          subject.complete();
        },
        err => {
          subject.error(err);
        }
        );
    }
    localStorage.removeItem("token");
    localStorage.removeItem("expiresOn");
    return subject;
  }

  public isSessionValid(): Observable<boolean> {
    let subject: Subject<boolean> = new Subject<boolean>();
    let currentToken = localStorage.getItem("token");
    let url: string = this.baseUrl + 'validatetoken';
    let refreshBody = { token: currentToken };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post(url, refreshBody, options)
      .subscribe(
      data => {
        if (data.status == 202) {
          subject.next(true);
          subject.complete();
        } else {
          subject.next(false);
          subject.complete();
        }
      },
      err => {
        if (err.status == 400) {
          subject.next(false);
          subject.complete();
        }
        else if (err.status == 406) {
          subject.next(false);
          subject.complete();
        }
      }
      );
    return subject.asObservable();
  }

  private updateStoredToken(token: ClientSecurityToken) {
    localStorage.setItem("token", token.token);
    localStorage.setItem("expiresOn", token.expiresOn.toString());
  }
}
