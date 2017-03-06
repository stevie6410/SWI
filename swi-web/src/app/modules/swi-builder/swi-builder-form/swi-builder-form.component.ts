import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import 'rxjs/add/operator/switchMap';

import { SWIHeader, SWIStage } from '../../../shared/models/SwiAppModels';
import { SwiBuilderService } from '../../../shared/services/swi-builder.service';
import { SwiBuilderEditStageComponent } from '../swi-builder-edit-stage/swi-builder-edit-stage.component';

@Component({
  selector: 'swi-builder-form',
  templateUrl: './swi-builder-form.component.html',
  styleUrls: ['./swi-builder-form.component.css']
})
export class SwiBuilderFormComponent implements OnInit {

  @Input() swi: SWIHeader;
  headerForm: FormGroup;
  newStage: SWIStage;
  @Output() onSave: EventEmitter<SWIHeader> = new EventEmitter<SWIHeader>();

  constructor(
    private formBuilder: FormBuilder
  ) {
    //Build the form object
    this.headerForm = this.formBuilder.group({
      title: ['', Validators.required],
      revision: ['', Validators.required],
      isReleased: ['', Validators.required],
      swiStages: this.formBuilder.array([
        
      ])
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("SimpleChange", changes);
    if (changes['swi'].currentValue) {
      console.log("Picked up changes", changes['swi']);
      this.headerForm.patchValue(changes['swi'].currentValue);
    }
  }

  get stageCount(): number {
    return this.swi.swiStages ? this.swi.swiStages.length : 0;
  }

  addStage() {
    this.newStage = new SWIStage;
    this.newStage.sequence = this.swi.swiStages ? this.swi.swiStages.length + 1 : 1;
  }

  saveStage() {
    if (!this.swi.swiStages) this.swi.swiStages = new Array<SWIStage>();
    this.swi.swiStages.push(this.newStage);
    this.newStage = null;
  }

  removeStage(stage: SWIStage) {
    this.swi.swiStages = this.swi.swiStages.filter(s => s.sequence != stage.sequence);
    //now we need to update the sequence numbers as we may have removed a stage in the middle of the array
    this.reorderList();
  }

  reorderList() {
    var stages: any[] = this.swi.swiStages;
    for (var index = 0; index < stages.length; index++) {
      stages[index].sequence = index + 1;
    }
  }

  saveDocument() {
    console.log('Save Document from Form', this.headerForm.value);
    this.onSave.emit(this.headerForm.value);
  }
}
