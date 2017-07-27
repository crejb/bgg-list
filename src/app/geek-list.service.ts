import { Injectable } from '@angular/core';
import * as Rx from 'Rxjs';

import { ListItemFilter } from './geek-list-filter-criteria/list-item-filter';
import { AndFilter } from './geek-list-filter-criteria/and-filter';
import { ListSortCriteria } from './geek-list-sort-criteria/list-sort-criteria';
import { SortTypes } from './sort-types.enum';
import { SortDirections } from './sort-directions.enum';
import { GeekListItemDetail } from './geek-list-item-detail';

@Injectable()
export class GeekListService {
  private filtersMap: Map<string, Rx.Observable<ListItemFilter>> = new Map<string, Rx.Observable<ListItemFilter>>();
  private filtersUpdates: Rx.BehaviorSubject<Rx.Observable<ListItemFilter>[]>;
  private itemsStream: Rx.BehaviorSubject<GeekListItemDetail[]>;
  private sortUpdates: Rx.BehaviorSubject<ListSortCriteria>;

  private itemsOutputStream: Rx.Observable<GeekListItemDetail[]>;

  constructor() {
    this.configureStreams();
  }

  public subscribe(callback: (value: GeekListItemDetail[]) => void): Rx.Subscription {
    return this.itemsOutputStream.subscribe(callback);
  }

  public registerFilter(filterName: string, filterUpdateStream: Rx.Observable<ListItemFilter>): void {
    this.filtersMap.set(filterName, filterUpdateStream);
    this.filtersUpdates.next(Array.from(this.filtersMap.values()));
  }

  public setSortCriteria(sortCriteria: ListSortCriteria): void {
    this.sortUpdates.next(sortCriteria);
  }

  public setListItems(items: GeekListItemDetail[]): void {
    this.itemsStream.next(items);
  }

  private configureStreams() : void {
    this.itemsStream = new Rx.BehaviorSubject<GeekListItemDetail[]>([]);
    this.sortUpdates = new Rx.BehaviorSubject<ListSortCriteria>(null);
    this.filtersUpdates = new Rx.BehaviorSubject<Rx.Observable<ListItemFilter>[]>([]);

    let sortedItemsStream = Rx.Observable.combineLatest(this.itemsStream, this.sortUpdates, (items, sort) => this.applySortCriteria(items, sort));

    let filterBuilderStream = this.filtersUpdates.switchMap(s =>
      s.length == 0
        ? Rx.Observable.of(null as AndFilter)
        : Rx.Observable.combineLatest(s, (...filters: Array<ListItemFilter>) => new AndFilter(filters))
    ).do(filter => console.log(`Latest filter is:${filter ? filter.GetText() : 'null'}`));

    this.itemsOutputStream = Rx.Observable.combineLatest(sortedItemsStream, filterBuilderStream, (items, filter) => this.applyFilterCriteria(items, filter));
  }

  private applySortCriteria(items: GeekListItemDetail[], sort: ListSortCriteria): GeekListItemDetail[] {
    if (!sort) return items;
    return items.sort((a, b) => {
      let lessThan = this.getSortValue(a, sort.type) < this.getSortValue(b, sort.type);
      if (sort.direction == SortDirections.Descending) {
        return lessThan ? 1 : -1;
      } else {
        return lessThan ? -1 : 1;
      }
    });
  }

  private applyFilterCriteria(items: GeekListItemDetail[], filter: ListItemFilter): GeekListItemDetail[] {
    if (!filter) return items;
    return items.filter(item => filter.Passes(item));
  }

  private getSortValue(item: GeekListItemDetail, sortType: SortTypes): any {
    switch (sortType) {
      case SortTypes.Name: return item.summary.name;
      case SortTypes.Thumbs: return item.summary.thumbs;
      case SortTypes.Rating: return item.rating;
      case SortTypes.Rank: return Number.isNaN(item.rank) ? Number.MAX_SAFE_INTEGER : item.rank;
    }
    return null;
  }
}
