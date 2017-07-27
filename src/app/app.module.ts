import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { GeekListSearchService } from './geek-list-search.service';
import { ItemDetailsRetrievalService } from './item-details-retrieval.service';
import { GeekListItemComponent } from './geek-list-item/geek-list-item.component';
import { GeekListSortCriteriaComponent } from './geek-list-sort-criteria/geek-list-sort-criteria.component';
import { GeekListService } from './geek-list.service';

import { MdlPopoverModule } from '@angular-mdl/popover';
import { GeekListFilterCriteriaComponent } from './geek-list-filter-criteria/geek-list-filter-criteria.component';
import { ComplexityFilterComponent } from './geek-list-filter-criteria/complxity-filter/complexity-filter.component';
import { PlayerCountFilterComponent } from './geek-list-filter-criteria/player-count-filter/player-count-filter.component';
import { TextFilterComponent } from './geek-list-filter-criteria/text-filter/text-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    GeekListItemComponent,
    GeekListSortCriteriaComponent,
    GeekListFilterCriteriaComponent,
    ComplexityFilterComponent,
    PlayerCountFilterComponent,
    TextFilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MdlPopoverModule
  ],
  providers: [GeekListSearchService, ItemDetailsRetrievalService, GeekListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
