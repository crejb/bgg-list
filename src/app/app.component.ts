import { Component } from '@angular/core';
import { GeekListSearchService } from './geek-list-search.service';
import { ItemDetailsRetrievalService } from './item-details-retrieval.service';
import { GeekList } from './geek-list';
import { GeekListItemDetail } from './geek-list-item-detail';
import { SortTypes } from './sort-types.enum';
import { SortDirections } from './sort-directions.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public listSearchTerm: string;
  public itemFilterTerm: string;
  public geekList: GeekList;
  public errorMessage;
  public searchStatus: string;
  public originalItems: Array<GeekListItemDetail>;
  public displayItems: Array<GeekListItemDetail>;
  public sortTypes = [SortTypes.Name, SortTypes.Rating, SortTypes.Rank, SortTypes.Thumbs];

  constructor(private listSearchService: GeekListSearchService, private itemsRetrievalService : ItemDetailsRetrievalService) {
    this.listSearchTerm = '196401';
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
        this.originalItems = items;
        this.displayItems = items;
      }).catch(err => {
        this.searchStatus = 'complete';
        this.errorMessage = err;
      });
    //  .subscribe(
    //    list => this.geekList = list,
    //    error =>  this.errorMessage = <any>error);
  }

  itemFilterTermChanged(): void {
    if (this.itemFilterTerm) {
      let filter = this.itemFilterTerm.toLowerCase();
      this.displayItems = this.originalItems.filter(i => i.summary.name.toLowerCase().indexOf(filter) >= 0);
    } else {
      this.displayItems = this.originalItems;
    }
  }

  clearItemFilterTerm(): void {
    this.itemFilterTerm = null;
    this.itemFilterTermChanged();
  }

  public currentSortType : SortTypes;

  onSortToggled(event: [SortTypes, SortDirections]): void {
    this.currentSortType = event[0];
    console.log('sorting by ' + event[0] + ':' + event[1]);
    this.displayItems = this.originalItems.sort((a, b) => {
      let lessThan = this.getSortValue(a, event[0]) < this.getSortValue(b, event[0]);
      if (event[1] == SortDirections.Descending) {
        return lessThan ? 1 : -1;
      } else {
        return lessThan ? -1 : 1;
      }
    });
    this.itemFilterTermChanged();
  }

  getSortValue(item: GeekListItemDetail, sortType: SortTypes): any {
    switch (sortType) {
      case SortTypes.Name: return item.summary.name;
      case SortTypes.Thumbs: return item.summary.thumbs;
      case SortTypes.Rating: return item.rating;
      case SortTypes.Rank: return Number.isNaN(item.rank) ? Number.MAX_SAFE_INTEGER : item.rank;
    }
    return null;
  }
}
