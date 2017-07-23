import { ListItemFilter } from '../list-item-filter';

export class PlayerCountFilter implements ListItemFilter{
  value : number;

  constructor(){
    this.value = null;
  }
  
  GetText(): string {
    return `${this.value}`;
  }

  Passes(item: any): boolean {
    throw new Error("Method not implemented.");
  }
}