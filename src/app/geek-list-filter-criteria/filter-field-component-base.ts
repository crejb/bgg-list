import { ListItemFilter } from './list-item-filter';

export abstract class FilterFieldComponentBase{
  itemFilter : ListItemFilter

  constructor(defaultFilter : ListItemFilter){
    this.itemFilter = defaultFilter;
  }
}