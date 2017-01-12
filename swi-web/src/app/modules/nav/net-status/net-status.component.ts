import { Component, OnInit } from '@angular/core';

import { OfflineService } from '../../../shared/services/offline.service';
import { DbSyncEvent } from '../../../shared/models/SysModels';

@Component({
  selector: 'net-status',
  templateUrl: './net-status.component.html',
  styleUrls: ['./net-status.component.css']
})
export class NetStatusComponent implements OnInit {

  dbSyncStatus: DbSyncEvent;
  appcacheStatus: string = "";
  isConnected: boolean = false;

  constructor(
    private offlineService: OfflineService
  ) { }

  ngOnInit() {
    //Monitor the internet connection
    this.offlineService.monitorConnection().subscribe(
      (connected: boolean) => {
        this.isConnected = connected;
      }
    );

    //Monitor the db sync status
    this.offlineService.monitorDBSync().subscribe(
      (event: DbSyncEvent) => {
        this.dbSyncStatus = event;
        if (event.info != null){
          console.log("DbSync Event (" + event.type + ")", event.info);
        }
        // if(event.type == "change"){
        //   console.log("document changed", event.info);
          
        // }
        // if(event.type == "paused"){
        //   console.log("sync paused", event.info);
        // }
      }
    );

    //Monitor Appcache status
    this.offlineService.monitorAppCache().subscribe(
      (status: string) => {
        this.appcacheStatus = status;
      }
    );
  }  
}
