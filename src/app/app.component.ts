import { Component } from '@angular/core';
import { GeekListSearchService } from './geek-list-search.service';
import { GeekList } from './geek-list';
import { GeekListItem } from './geek-list-item';

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

  public currentSortBy: string;
  public currentSortDirection: string;

  sortBy(sortType: string): void {
    if (this.isSortedBy(sortType)) {
      this.currentSortDirection = this.currentSortDirection == 'ascending' ? 'descending' : 'ascending';
    } else {
      this.currentSortBy = sortType;
      this.currentSortDirection = 'ascending';
    }

    this.displayItems = this.geekList.items.sort((a, b) => {
      let lessThan = this.getSortValue(a, this.currentSortBy) < this.getSortValue(b, this.currentSortBy);
      if (this.currentSortDirection == 'descending') {
        return lessThan ? 1 : -1;
      } else {
        return lessThan ? -1 : 1;
      }
    })

  }

  getSortValue(item: GeekListItem, sortType: string): any {
    switch (sortType) {
      case 'name': return item.name;
      case 'thumbs': return item.thumbs;
    }
    return null;
  }

  isSortedBy(sortType: string): boolean {
    return this.currentSortBy == sortType;
  }
}
