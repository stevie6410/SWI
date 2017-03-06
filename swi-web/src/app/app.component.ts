import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { SWIService } from './shared/services/swi.service';
import { SWIHeader } from './shared/models/SwiAppModels';

import { Http, Request, Response } from '@angular/http';
import { SWIDoc, SWIImage } from './swi-doc.models';

var PouchDB = require('pouchdb');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None //Opened this up to make the bootswatch styles global (root styles.scss was not working for me?)
})
export class AppComponent implements OnInit {

  title: string = 'app works!';

  constructor( ) {
  }

  ngOnInit() {

  }
}
