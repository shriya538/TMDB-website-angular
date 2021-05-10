import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  homepage = '/home_page';

  constructor(private httpClient: HttpClient ) {}

  // tslint:disable-next-line:typedef
  getHomePage(){
    const resp = this.httpClient.get(this.homepage);
    return resp as any;
  }



  sendClickEvent(){
    //call the cast modal component how?

  }



/*  getMovieModal(id){
    const resp=this.httpClient.get(this.moviepage.)
  }*/


}
