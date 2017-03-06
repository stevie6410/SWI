import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SWIStage } from '../../../shared/models/SwiAppModels';
@Component({
  selector: 'swi-builder-stage',
  templateUrl: './swi-builder-stage.component.html',
  styleUrls: ['./swi-builder-stage.component.css']
})
export class SwiBuilderStageComponent implements OnInit {

  @Input() swiStage: SWIStage;
  @Output() onSave: EventEmitter<SWIStage> = new EventEmitter<SWIStage>();

  constructor() { }

  ngOnInit() {
  }

  save(){
    this.onSave.emit(this.swiStage);
  }

}
