import { Injectable } from '@angular/core';
import { Http, Request, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

var PouchDB = require('pouchdb');

@Injectable()
export class LocalSWIService {

    swiDb: any;

    constructor(
        private http: Http
    ) {
        this.swiDb = new PouchDB('swiDB');
    }

    getSWI(id: number): Observable<any> {

        var res: Subject<any> = new Subject<any>();
        this.swiDb.get('abc123', function (err, doc) {
            if (err) {
                res.error(err);
            }
            res.next(doc);
            res.complete();
        });

        return res.asObservable();
    }

    getSWIs(): Observable<any> {
        var asyncResult: Subject<any> = new Subject<any>();
        this.swiDb.allDocs({ include_docs: true }).then(
            (result: any) => {
                asyncResult.next(result.rows);
                asyncResult.complete();
            }
        );
        return asyncResult;
    }

    addSWI(swi: any): Observable<any> {

        var asyncResult: Subject<any> = new Subject<any>();
        this.swiDb.put(swi).then(
            (res: any) => {
                asyncResult.next(res);
                asyncResult.complete();
            }).catch(
            (err: any) => {
                asyncResult.error(err);
            });

        return asyncResult;
    }

}