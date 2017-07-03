import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as xml2js from 'xml2js';
import { GeekList } from './geek-list';
import { GeekListItemSummary } from './geek-list-item-summary';
import { GeekListItemDetail } from './geek-list-item-detail';


@Injectable()
export class ItemDetailsRetrievalService {

  private itemLookupUrl = 'http://www.boardgamegeek.com/xmlapi2/thing?stats=1&id=';

  constructor(private http: Http) {

  }

  public retrieveItemsDetail(geekList: GeekList): Promise<Array<GeekListItemDetail>> {
    const url = this.itemLookupUrl + this.GetCsvItemIds(geekList);
    return this.http.get(url).map(res => res.text())
      //return Observable.of(this.HARDCODED_RESPONSE)
      .catch(this.handleError)
      .toPromise()
      .then(this.extractData)
      .then(response => this.getItemDetailsFromResponse(response, geekList));
  }

  private GetCsvItemIds(geekList: GeekList): string {
    return geekList.items.reduce((s, item) => `${s}${s ? ',' : ''}${item.objectId}`, '');
  }

  private extractData(res) {
    return new Promise((resolve, reject) => {
      xml2js.parseString(res, (err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result);
        }
      });
    });
  }

  private getItemDetailsFromResponse(response, geekList : GeekList): Array<GeekListItemDetail> {
    if (!response.items || !response.items.item || !response.items.item.length) {
      return null;
    }
    return response.items.item.map(item => {
      let summaryItem = geekList.items.find(summary => summary.objectId == item.$.id);
      if(!summaryItem){
        console.log("item not found!!");
      }
      return new GeekListItemDetail(
      summaryItem,
      item.$.id, Number(item.statistics[0].ratings[0].average[0].$.value), Number(item.statistics[0].ratings[0].ranks[0].rank[0].$.value), Number(item.statistics[0].ratings[0].averageweight[0].$.value),
      item.yearpublished[0].$.value, Number(item.minplayers[0].$.value), Number(item.maxplayers[0].$.value),
      Number(item.playingtime[0].$.value), null, null)
    });
  }

  private getItemFromResponse(response) {
    if (response.items && response.items.item && response.items.item.length) {
      return response.items.item[0];
    }
    return null;
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}