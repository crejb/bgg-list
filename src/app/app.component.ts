import { Component } from '@angular/core';
import { GeekListSearchService } from './geek-list-search.service';
import { ItemDetailsRetrievalService } from './item-details-retrieval.service';
import { GeekListService } from './geek-list.service';
import { GeekList } from './geek-list';
import { GeekListItemDetail } from './geek-list-item-detail';
import { SortTypes } from './sort-types.enum';
import { SortDirections } from './sort-directions.enum';
import { ListSortCriteria } from './geek-list-sort-criteria/list-sort-criteria';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public listSearchTerm: string;
  public geekList: GeekList;
  public errorMessage;
  public searchStatus: string;
  public displayItems: Array<GeekListItemDetail>;
  public sortTypes = [SortTypes.Name, SortTypes.Rating, SortTypes.Rank, SortTypes.Thumbs];
  public currentSortType : SortTypes;

  constructor(private listSearchService: GeekListSearchService, private itemsRetrievalService : ItemDetailsRetrievalService, private itemService : GeekListService) {
    this.listSearchTerm = '196401';
    this.itemService.subscribe(items => this.displayItems = items);
  }

  search(): void {
    console.log('searching for ' + this.listSearchTerm);
    this.searchStatus = 'retrieving_list';
    this.geekList = null;
    this.listSearchService.getList(this.listSearchTerm)
      .then(res => {
        this.searchStatus = 'retrieving_items';
        this.geekList = res;
        return this.itemsRetrievalService.retrieveItemsDetail(res);
      }).then(items => {
        this.searchStatus = 'complete';
        this.itemService.setListItems(items);
      }).catch(err => {
        this.searchStatus = 'complete';
        this.errorMessage = err;
      });
  }

  onSortToggled(event: [SortTypes, SortDirections]): void {
    this.currentSortType = event[0];
    console.log('sorting by ' + event[0] + ':' + event[1]);

    this.itemService.setSortCriteria(new ListSortCriteria(event[0], event[1]));
  }
}
