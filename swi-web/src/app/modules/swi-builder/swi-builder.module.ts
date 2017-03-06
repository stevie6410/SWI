import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { SharedControlsModule } from '../../shared/controls/shared-controls.module';

import { SwiBuilderScreenComponent } from './swi-builder-screen/swi-builder-screen.component';
import { SwiBuilderService } from '../../shared/services/swi-builder.service';
import { SwiBuilderFormComponent } from './swi-builder-form/swi-builder-form.component';
import { SwiBuilderEditStageComponent } from './swi-builder-edit-stage/swi-builder-edit-stage.component';
import { LocalSWIService } from '../../shared/services/swi-local.service';
import { SwiBuilderStageComponent } from './swi-builder-stage/swi-builder-stage.component';

@NgModule({
  imports: [
    BrowserModule,
    SharedControlsModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2Bs3ModalModule
  ],
  declarations: [
    SwiBuilderScreenComponent,
    SwiBuilderFormComponent,
    SwiBuilderEditStageComponent,
    SwiBuilderStageComponent
  ],
  exports: [
    SwiBuilderScreenComponent
  ],
  providers: [
    SwiBuilderService,
    LocalSWIService
  ]
})
export class SwiBuilderModule { }
