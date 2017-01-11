import { Injectable } from '@angular/core';
import { Http, Request, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx'; // adds ALL RxJS statics & operators to Observable

import { SwiHeader } from '../../shared/models/SwiAppModels';

@Injectable()
export class SwiBuilderService {

  apiBaseUrl: string = "http://localhost:4001/api/swiheaders/";

  constructor(
    private http: Http
  ) {

  }

  public getSWIs(): Observable<SwiHeader[]> {
    return this.http.get(this.apiBaseUrl)
      // .do(console.log)
      .map(this.handleData)
      .catch(this.handleError);
  }

  public getSWI(id: number): Observable<SwiHeader> {

    let apiUrl = this.apiBaseUrl + (+id);

    return this.http.get(apiUrl)
      .map(this.handleData)
      .catch(this.handleError);
  }

  handleData(res: Response) {
    return res.json();
  }

  handleError(err: Response | any) {
    console.log(err);

    return Observable.throw(err);
  }

}
