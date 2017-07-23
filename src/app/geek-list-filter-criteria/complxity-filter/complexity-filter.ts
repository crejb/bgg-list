import { ListItemFilter } from '../list-item-filter';

export class ComplexityFilter implements ListItemFilter{
  minimum : number;
  maximum : number;

  constructor(){
    this.minimum = null;
    this.maximum = null;
  }
  
  GetText(): string {
    if(this.minimum != null && this.maximum != null){
      return `>${this.minimum} and <${this.maximum}`;
    }
    if(this.minimum != null){
      return `>${this.minimum}`;
    }
    if(this.maximum != null){
      return `<${this.maximum}`;
    }
    return null;
  }

  Passes(item: any): boolean {
    throw new Error("Method not implemented.");
  }
}