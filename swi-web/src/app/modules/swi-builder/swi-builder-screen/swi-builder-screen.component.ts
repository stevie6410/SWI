import { Component, OnInit } from '@angular/core';

import { SwiBuilderService } from '../../../shared/services/swi-builder.service';
import { SWIHeader, SWIStage } from '../../../shared/models/SwiAppModels';
import { LocalSWIService } from '../../../shared/services/swi-local.service';
import { Guid } from '../../../shared/models/guid';

@Component({
  selector: 'swi-builder-screen',
  templateUrl: './swi-builder-screen.component.html',
  styleUrls: ['./swi-builder-screen.component.css']
})
export class SwiBuilderScreenComponent implements OnInit {
  swi: SWIHeader;
  _id: string;
  _rev: string;

  constructor(
    private swiLocalService: LocalSWIService
  ) { }

  ngOnInit() {
    //Check for input id. If blank create new else load from the db 
    this.setupNewDocument();
  }

  setupNewDocument() {
    this.swi = new SWIHeader();
    this._id = Guid.newGuid();
  }

  get swiDiag(): string {
    return JSON.stringify(this.swi, null, "\t");
  }

  saveDocument() {
    console.log('Saving Document', this.swi);

    //Create an object of the swi so that we can append DB values if needed
    let saveBody: any = this.swi;

    //Add the _id prop based on the id prop
    saveBody._id = this._id;

    //If this is an update we will have a value for _rev.
    // Include this to update else leave it out to create a new document
    if (this._rev != null) {
      saveBody._rev = this._rev;
    }

    console.log('saveBody', saveBody);

    this.swiLocalService.addSWI(saveBody).subscribe(
      (data: any) => {
        console.log('Save Successful', data);
        this._id = data._id;
        this._rev = data._rev;
      },
      (error: any) => {
        console.log('Error Adding', error)
      });
  }
}
