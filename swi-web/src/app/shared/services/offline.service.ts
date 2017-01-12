import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { DbSyncEvent } from '../models/SysModels';

@Injectable()
export class OfflineService {

    registeredDBSync: any[] = [];

    constructor() { }
    monitorConnection(): Observable<boolean> {
        var obs = Observable.create(function (observer: Observer<boolean>) {
            setInterval(function () {
                observer.next(navigator.onLine);
            }, 2000);
        });
        return obs;
    }

    registerDBSync(dbSync: any) {
        this.registeredDBSync.push(dbSync);
    }

    monitorDBSync(): Observable<DbSyncEvent> {
        return Observable.create((obs: Observer<DbSyncEvent>) => {
            this.registeredDBSync.forEach(db => {
                db
                    .on('change', (info) => obs.next(new DbSyncEvent('change', info)))
                    .on('paused', (err) => obs.next(new DbSyncEvent('paused', err)))
                    .on('active', () => obs.next(new DbSyncEvent('active', null)))
                    .on('denied', (err) => obs.next(new DbSyncEvent('denied', err)))
                    .on('complete', (info) => obs.next(new DbSyncEvent('complete', info)))
                    .on('error', (err) => obs.next(new DbSyncEvent('error', err)));
            });
        });
    }

    monitorAppCache(): Observable<string> {
        return Observable.create((obs: Observer<string>) => {
            setInterval(function () {
                var appCache = window.applicationCache;
                var status: string;
                switch (appCache.status) {
                    case appCache.UNCACHED: // UNCACHED == 0
                        status = 'UNCACHED';
                        break;
                    case appCache.IDLE: // IDLE == 1
                        status =  'IDLE';
                        break;
                    case appCache.CHECKING: // CHECKING == 2
                        status =  'CHECKING';
                        break;
                    case appCache.DOWNLOADING: // DOWNLOADING == 3
                        status =  'DOWNLOADING';
                        break;
                    case appCache.UPDATEREADY:  // UPDATEREADY == 4
                        status =  'UPDATEREADY';
                        break;
                    case appCache.OBSOLETE: // OBSOLETE == 5
                        status =  'OBSOLETE';
                        break;
                    default:
                        status =  'UKNOWN CACHE STATUS';
                        break;
                };
                obs.next(status);
            }, 2000);
        });
    }

//Attempt AppCache Update
updateAppCache() {
    window.applicationCache.update();
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
      window.applicationCache.swapCache();  // The fetch was successful, swap in the new cache.
    } else {
      console.log("No new AppCache version could be found");
    }
  }

}