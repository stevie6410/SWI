import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardScreenComponent } from './dashboard-screen/dashboard-screen.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DashboardScreenComponent
  ],
  declarations: [DashboardScreenComponent]
})
export class DashboardModule { }
