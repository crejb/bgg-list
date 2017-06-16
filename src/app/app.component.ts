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

  constructor(private listSearchService: GeekListSearchService) {

  }

  search(): void {
    console.log('searching for ' + this.listSearchTerm);
    this.listSearchService.getList(this.listSearchTerm)
                  .then(res => {
                    this.geekList = res;
                  });
                  //  .subscribe(
                  //    list => this.geekList = list,
                  //    error =>  this.errorMessage = <any>error);
  }
}
