import { ListItemFilter } from '../list-item-filter';
import { GeekListItemDetail } from '../../geek-list-item-detail';

export class PlayerCountFilter implements ListItemFilter{
  value : number;

  constructor(){
    this.value = null;
  }
  
  GetText(): string {
    return `${this.value}`;
  }

  Passes(item: GeekListItemDetail): boolean {
    return this.value == null || (this.value >= item.minPlayers && this.value <= item.maxPlayers);
  }
}