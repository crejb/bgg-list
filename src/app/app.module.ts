import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { GeekListSearchService } from './geek-list-search.service';
import { GeekListItemComponent } from './geek-list-item/geek-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    GeekListItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  providers: [GeekListSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
