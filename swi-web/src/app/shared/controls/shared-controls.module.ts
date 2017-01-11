import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormTextComponent } from './form-text/form-text.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [
    FormTextComponent
  ],
  exports: [
    FormTextComponent
  ]
})
export class SharedControlsModule { }
