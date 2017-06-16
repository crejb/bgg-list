import { GeekListItem } from './geek-list-item';

export class GeekList {
    constructor(
        public name:string,
        public id:number,
        public addedDate:Date,
        public thumbs:number,
        public description:string,
        public items:GeekListItem[]
    ){}
}
