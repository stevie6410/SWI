import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { SharedControlsModule } from '../../shared/controls/shared-controls.module';

import { SwiBuilderScreenComponent } from './swi-builder-screen/swi-builder-screen.component';
import { SwiBuilderService } from '../../shared/services/swi-builder.service';
import { SwiBuilderFormComponent } from './swi-builder-form/swi-builder-form.component';
import { SwiBuilderEditStageComponent } from './swi-builder-edit-stage/swi-builder-edit-stage.component';

@NgModule({
  imports: [
    CommonModule,
    SharedControlsModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2Bs3ModalModule
  ],
  declarations: [
    SwiBuilderScreenComponent,
    SwiBuilderFormComponent,
    SwiBuilderEditStageComponent
  ],
  exports: [
    SwiBuilderScreenComponent
  ],
  providers: [
    SwiBuilderService
  ]
})
export class SwiBuilderModule { }
