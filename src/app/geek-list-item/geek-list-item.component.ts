import { Component, OnInit, Input } from '@angular/core';
import { GeekListItemDetail } from '../geek-list-item-detail';
import { ItemDetailsRetrievalService } from '../item-details-retrieval.service';

@Component({
  selector: 'app-geek-list-item',
  templateUrl: './geek-list-item.component.html',
  styleUrls: ['./geek-list-item.component.css']
})
export class GeekListItemComponent implements OnInit {

  @Input() item: GeekListItemDetail;

  constructor() { }

  ngOnInit() {
  }

  getItemLink() : string {
    return `https://boardgamegeek.com/boardgame/${this.item.id}`;
  }

  public getPlayersText() : string {
    if(this.item.minPlayers != this.item.maxPlayers){
      return `${this.item.minPlayers}-${this.item.maxPlayers}`;
    }
    return `${this.item.minPlayers}`;
  }
}
