import { ListItemFilter } from './list-item-filter';

export class AndFilter implements ListItemFilter{

  constructor(private filters : ListItemFilter[]){

  }

  GetText() : string{
    return '[' + this.filters.map(f => `[${f.GetText()}]`).join(' AND ') + ']';;
  }

  Passes(item : any) : boolean {
    return this.filters.every(f => f.Passes(item));
  }
}