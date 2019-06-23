import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { A1Component } from './a1/a1.component';
import { B1Component } from './a1/b1/b1.component';
import { C1Component } from './a1/b1/c1/c1.component';
import { A2Component } from './a2/a2.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [ AppComponent, A1Component, B1Component, C1Component, A2Component ],
  imports: [ BrowserModule ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
