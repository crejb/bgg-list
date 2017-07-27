import { SortTypes } from '../sort-types.enum';
import { SortDirections } from '../sort-directions.enum';

export class ListSortCriteria {
    constructor(public type: SortTypes, public direction: SortDirections) {

    }
}