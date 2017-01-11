import { Component, OnInit } from '@angular/core';

import { SwiBuilderService } from '../../../shared/services/swi-builder.service';
import { SwiHeader, SwiStage } from '../../../shared/models/SwiAppModels';

@Component({
  selector: 'swi-builder-screen',
  templateUrl: './swi-builder-screen.component.html',
  styleUrls: ['./swi-builder-screen.component.css']
})
export class SwiBuilderScreenComponent implements OnInit {

  swiHeader: SwiHeader;

  constructor(
    private swiBuilderService: SwiBuilderService
  ) { }

  ngOnInit() {

    this.swiBuilderService.getSWI(4).subscribe(
      (data) => {
        console.log(data);
        this.swiHeader = data;
      },
      (err) => {
        console.log("SWI Header");
      }
    );

  }

  get swiDiag(): string{
    return JSON.stringify(this.swiHeader, null, "\t");
  }

}
