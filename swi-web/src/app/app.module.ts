import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SwiSecurityService } from './shared/services/swi-security.service';
import { SwiBuilderModule } from './modules/swi-builder/swi-builder.module';
import { SwiBuilderScreenComponent } from './modules/swi-builder/swi-builder-screen/swi-builder-screen.component';
import { NavModule } from './modules/nav/nav.module';
import { SWIService } from './shared/services/swi.service';
import { OfflineService } from './shared/services/offline.service';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { DashboardScreenComponent } from './modules/dashboard/dashboard-screen/dashboard-screen.component';

const appRoutes: Routes = [
  { path: '', component: DashboardScreenComponent },
  { path: 'dashboard', component: DashboardScreenComponent },
  { path: 'swibuilder', component: SwiBuilderScreenComponent }
];



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    SwiBuilderModule,
    NavModule,
    DashboardModule
  ],
  providers: [
    SwiSecurityService,
    SWIService,
    OfflineService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
