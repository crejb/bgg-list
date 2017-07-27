import { GeekListItemDetail } from '../geek-list-item-detail';

export interface ListItemFilter{
  GetText() : string;
  Passes(item : GeekListItemDetail) : boolean;
}