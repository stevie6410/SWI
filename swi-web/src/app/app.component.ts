import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { SWIService } from './shared/services/swi.service';
import { SwiHeader } from './shared/models/SwiAppModels';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./_paper.scss'],
  encapsulation: ViewEncapsulation.None //Opened this up to make the bootswatch styles global (root styles.scss was not working for me?)
})
export class AppComponent implements OnInit {

  title: string = 'app works!';
  docs: any[];

  constructor(
    private swiService: SWIService
  ) { 
  }

  ngOnInit() {
    this.swiService.getSWIs().then(
      data => {
        console.log(data);
        this.docs = data;
      }
    );
  }

  addDoc() {
    let newDoc: SwiHeader = new SwiHeader();
    newDoc.title = this.title;
    this.swiService.addSWI(newDoc);
  }
}
