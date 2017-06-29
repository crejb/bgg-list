import { Component } from '@angular/core';
import { GeekListSearchService } from './geek-list-search.service';
import { GeekList } from './geek-list';
import { GeekListItem } from './geek-list-item';
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
  public searchInProgress: boolean;
  public displayItems: Array<GeekListItem>;
  public sortTypes = [SortTypes.Name, SortTypes.Rating, SortTypes.Thumbs];

  constructor(private listSearchService: GeekListSearchService) {
    this.listSearchTerm = '196401';
  }

  search(): void {
    console.log('searching for ' + this.listSearchTerm);
    this.searchInProgress = true;
    this.geekList = null;
    this.listSearchService.getList(this.listSearchTerm)
      .then(res => {
        this.searchInProgress = false;
        this.geekList = res;
        this.displayItems = this.geekList.items;
      }).catch(err => {
        this.searchInProgress = false;
        this.errorMessage = err;
      });
    //  .subscribe(
    //    list => this.geekList = list,
    //    error =>  this.errorMessage = <any>error);
  }

  itemFilterTermChanged(): void {
    if (this.itemFilterTerm) {
      let filter = this.itemFilterTerm.toLowerCase();
      this.displayItems = this.geekList.items.filter(i => i.name.toLowerCase().indexOf(filter) >= 0);
    } else {
      this.displayItems = this.geekList.items;
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
    this.displayItems = this.geekList.items.sort((a, b) => {
      let lessThan = this.getSortValue(a, event[0]) < this.getSortValue(b, event[0]);
      if (event[1] == SortDirections.Descending) {
        return lessThan ? 1 : -1;
      } else {
        return lessThan ? -1 : 1;
      }
    });
  }

  getSortValue(item: GeekListItem, sortType: SortTypes): any {
    switch (sortType) {
      case SortTypes.Name: return item.name;
      case SortTypes.Thumbs: return item.thumbs;
      case SortTypes.Rating: return item.id;
    }
    return null;
  }
}
