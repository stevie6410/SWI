import { Component, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import 'rxjs/add/operator/switchMap';

import { SwiHeader, SwiStage } from '../../../shared/models/SwiAppModels';
import { SwiBuilderService } from '../../../shared/services/swi-builder.service';
import { SwiBuilderEditStageComponent } from '../swi-builder-edit-stage/swi-builder-edit-stage.component';

@Component({
  selector: 'swi-builder-form',
  templateUrl: './swi-builder-form.component.html',
  styleUrls: ['./swi-builder-form.component.css']
})
export class SwiBuilderFormComponent implements OnInit {

  @ViewChild('#stageEditModal') modal : SwiBuilderFormComponent;

  swi: SwiHeader;
  swi_id: number = 3;
  headerForm: FormGroup;


  constructor(private swiService: SwiBuilderService, private formBuilder: FormBuilder) {
    //Build the form object
    this.headerForm = this.formBuilder.group({
      title: ['', Validators.required],
      revision: ['', Validators.required],
      isReleased: ['', Validators.required]
    });
  }

  ngOnInit() {
    // this.route.params
    //   .switchMap((params: Params) => 

    this.swiService.getSWI(this.swi_id)
      .subscribe((swi: SwiHeader) => {
        this.swi = swi
        this.headerForm.patchValue(this.swi);
        console.log(this.swi);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("SimpleChange", changes);
    if (changes['swi'].currentValue) {
      console.log("Picked up changes", changes['swi']);
      this.headerForm.patchValue(changes['swi'].currentValue);
    }
  }

  openStageModal(){
    this.modal.openStageModal();
  }

  addStage() {
    let newStage = new SwiStage;
    newStage.sequence = this.swi.swiStages.length + 1;
    this.swi.swiStages.push(newStage);
  }

  removeStage(stage: SwiStage) {
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

}
