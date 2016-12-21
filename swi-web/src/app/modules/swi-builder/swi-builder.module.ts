import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwiBuilderScreenComponent } from './swi-builder-screen/swi-builder-screen.component';
import { SwiBuilderHeaderComponent } from './swi-builder-header/swi-builder-header.component';
import { SwiBuilderHSPickerComponent } from './swi-builder-hspicker/swi-builder-hspicker.component';
import { SwiBuilderToolingComponent } from './swi-builder-tooling/swi-builder-tooling.component';
import { SwiBuilderStagesComponent } from './swi-builder-stages/swi-builder-stages.component';
import { SwiBuilderService } from '../../shared/services/swi-builder.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SwiBuilderScreenComponent,
    SwiBuilderHeaderComponent,
    SwiBuilderHSPickerComponent,
    SwiBuilderToolingComponent,
    SwiBuilderStagesComponent
  ],
  exports: [
    SwiBuilderScreenComponent
  ],
  providers: [
    SwiBuilderService
  ]
})
export class SwiBuilderModule { }
