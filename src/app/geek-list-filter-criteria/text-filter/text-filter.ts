import { ListItemFilter } from '../list-item-filter';
import { GeekListItemDetail } from '../../geek-list-item-detail';

export class TextFilter implements ListItemFilter{
  value : string;

  constructor(value : string){
    this.value = value;
  }
  
  GetText(): string {
    return `${this.value}`;
  }

  Passes(item: GeekListItemDetail): boolean {
    return !this.value || item.summary.name.toLowerCase().indexOf(this.value) >= 0;
  }
}