import { Component } from '@angular/core';
import { GeekListSearchService } from './geek-list-search.service';
import { GeekList } from './geek-list';
import { GeekListItem } from './geek-list-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public listSearchTerm: string;
  public geekList:GeekList;
  public errorMessage;
  public searchInProgress : boolean;

  constructor(private listSearchService: GeekListSearchService) {
    this.listSearchTerm = '196401';
  }

  search(): void {
    console.log('searching for ' + this.listSearchTerm);
    this.searchInProgress = true;
    this.listSearchService.getList(this.listSearchTerm)
                  .then(res => {
                    this.searchInProgress = false;
                    this.geekList = res;
                  }).catch(err => {
                    this.searchInProgress = false;
                    this.errorMessage = err;
                  });
                  //  .subscribe(
                  //    list => this.geekList = list,
                  //    error =>  this.errorMessage = <any>error);
  }
}
