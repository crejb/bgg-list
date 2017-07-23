import { GeekListItemSummary } from './geek-list-item-summary';

export class GeekListItemDetail {
    constructor(public summary : GeekListItemSummary,
                public id : number,
                public rating : number,
                public rank : number,
                public weighting : number,
                public yearPublished : string,
                public minPlayers : number,
                public maxPlayers : number,
                public playingTime : number,
                public categories : string[],
                public mechanics : string[]){

    }
}
