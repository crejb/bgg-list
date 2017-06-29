import { Component, OnInit, OnChanges, SimpleChange, Input, Output, EventEmitter } from '@angular/core';
import { SortTypes } from '../sort-types.enum';
import { SortDirections } from '../sort-directions.enum';

@Component({
  selector: 'app-geek-list-sort-criteria',
  templateUrl: './geek-list-sort-criteria.component.html',
  styleUrls: ['./geek-list-sort-criteria.component.css']
})
export class GeekListSortCriteriaComponent implements OnInit, OnChanges {

  private _sortType: SortTypes;
  public sortTypeName : string;
  @Input() currentSortType : SortTypes;
  @Output() sortToggled = new EventEmitter<[SortTypes, SortDirections]>();

  @Input()
  set sortType(value : SortTypes){
    this._sortType = value;
    this.setSortTypeName();
  }

  public SortDirections;
  public currentSortDirection: SortDirections;
  public isSortActive: Boolean;

  constructor() { 
    this.SortDirections = SortDirections; // Needed to access enum values from template
  }

  ngOnInit() {
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if(changes.currentSortType.currentValue != null && changes.currentSortType.currentValue != this._sortType){
      this.disableSort();
    }
  }

  public toggleSort(): void {
    if (this.isSortActive) {
      this.currentSortDirection = this.currentSortDirection == SortDirections.Ascending ? SortDirections.Descending : SortDirections.Ascending;
    } else {
      this.isSortActive = true;
      this.currentSortDirection = SortDirections.Ascending;
    }
    this.sortToggled.emit([this._sortType, this.currentSortDirection]);
  }

  private disableSort(): void {
    this.isSortActive = false;
  }

  private setSortTypeName() : void {
    switch(this._sortType){
      case SortTypes.Name:
        this.sortTypeName = 'Name';
        break;
      case SortTypes.Rating:
        this.sortTypeName = 'Rating';
        break;
      case SortTypes.Thumbs:
        this.sortTypeName = 'Thumbs';
        break;
    }
  }
}
