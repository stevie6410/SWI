import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SwiSecurityService } from './shared/services/swi-security.service';
import { SwiBuilderModule } from './modules/swi-builder/swi-builder.module';
import { NavModule } from './modules/nav/nav.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SwiBuilderModule,
    NavModule
  ],
  providers: [
    SwiSecurityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
