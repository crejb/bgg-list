import { GeekListItemSummary } from './geek-list-item-summary';

export class GeekListItemDetail {
    constructor(public summary : GeekListItemSummary,
                public id : number,
                public rating : Number,
                public rank : Number,
                public weighting : Number,
                public yearPublished : string,
                public minPlayers : number,
                public maxPlayers : number,
                public playingTime : number,
                public categories : string[],
                public mechanics : string[]){

    }
}
