import { Component, OnInit } from '@angular/core';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private httpClient: HttpClient,private router:Router) { }
  res:any;

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((searchText) => {
        var url = '/multi_search/' + searchText;
        return this.httpClient.get(url);
      })
    );
  }

  formatter = (x: {name: string}) => x.name;

  navigate_movie(id:string){
    return this.router.navigateByUrl('/watch/movie/'+id);
  }
  navigate_tv(id:string){
    return this.router.navigateByUrl('/watch/tv/'+id)
  }

  ngOnInit(): void {


  }

}
