import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DxTextBoxModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxSelectBoxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
