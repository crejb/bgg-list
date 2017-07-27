import { ListItemFilter } from '../list-item-filter';
import { GeekListItemDetail } from '../../geek-list-item-detail';

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

  Passes(item: GeekListItemDetail): boolean {
    if(this.minimum != null && item.weighting < this.minimum){
      return false;
    }
    if(this.maximum != null && item.weighting > this.maximum){
      return false;
    }
    return true;
  }
}