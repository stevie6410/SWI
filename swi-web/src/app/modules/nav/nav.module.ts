import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { NetStatusComponent } from './net-status/net-status.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
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
