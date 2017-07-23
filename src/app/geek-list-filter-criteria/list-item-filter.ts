export interface ListItemFilter{
  GetText() : string;
  Passes(item : any) : boolean;
}