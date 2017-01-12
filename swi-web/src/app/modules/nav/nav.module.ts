import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { NetStatusComponent } from './net-status/net-status.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    TopbarComponent
  ],
  declarations: [
    TopbarComponent,
    NetStatusComponent
  ]
})
export class NavModule { }
