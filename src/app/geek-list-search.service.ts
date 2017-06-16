import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
//import {Parser} from 'xml2js';
import * as xml2js from 'xml2js';

import { GeekList } from './geek-list';
import { GeekListItem } from './geek-list-item';

@Injectable()
export class GeekListSearchService {

  private geekListUrl = 'http://www.boardgamegeek.com/xmlapi/geeklist/';

  constructor(private http: Http) {

  }

  public getList(id: string): Promise<GeekList> {
    const url = this.geekListUrl + id;
    return this.http.get(url)
      .catch(this.handleError)
      .toPromise()
      .then(this.extractData);
  }

  private extractData(res: Response) {
    return new Promise((resolve, reject) => {
      xml2js.parseString(res.text(), function (err, result) {
        if (err)
          reject(err);
        else
          resolve(result);
      });

    });

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
