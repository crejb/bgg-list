import { GeekListItemSummary } from './geek-list-item-summary';

export class GeekList {
    constructor(
        public name:string,
        public id:number,
        public addedDate:Date,
        public thumbs:number,
        public description:string,
        public items:GeekListItemSummary[]
    ){}
}
