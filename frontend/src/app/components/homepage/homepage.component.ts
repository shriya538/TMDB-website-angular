import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import {GetDataService} from '../../services/get-data.service';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private service:GetDataService,private route:ActivatedRoute,private httpClient:HttpClient,private router:Router) { }
  popular_movies:any[]=[];
  top_rated_movies: any[]=[];
  trending_movies:any[]=[];
  popular_tv_shows:any[]=[];
  top_rated_tv_shows:any[]=[];
  trending_tv_shows:any[]=[];
  currently_playing_movies:any[]=[];
  my_list:any[]=[];
  display_my_list:boolean=false;

  ngOnInit(): void {
  /*localStorage.setItem('ls',JSON.stringify({}));*/

  document.getElementById('home_button').style.opacity = '1';
  document.getElementById('my_list_button').style.opacity = '0.7';


  this.service.getHomePage()
      .subscribe((data: any) => {

        var tm=data[0];
        var j=-1;

        for(let i=0;i<tm.length;i++){
          if(i%6==0){
            j++;
            this.trending_movies[j]=[];
            this.trending_movies[j].push(tm[i]);
          }
          else{
            this.trending_movies[j].push(tm[i]);
          }
        }


        var trm=data[1];
        var j=-1;

        for(let i=0;i<trm.length;i++){
          if(i%6==0){
            j++;
            this.top_rated_movies[j]=[];
            this.top_rated_movies[j].push(trm[i]);
          }
          else{
            this.top_rated_movies[j].push(trm[i]);
          }
        }


        var pm=data[2];
        var j=-1;

        for(let i=0;i<pm.length;i++){
          if(i%6==0){
            j++;
            this.popular_movies[j]=[];
            this.popular_movies[j].push(pm[i]);
          }
          else{
            this.popular_movies[j].push(pm[i]);
          }
        }


        var tts=data[3];
        var j=-1;

        for(let i=0;i<tts.length;i++){
          if(i%6==0){
            j++;
            this.trending_tv_shows[j]=[];
            this.trending_tv_shows[j].push(tts[i]);
          }
          else{
            this.trending_tv_shows[j].push(tts[i]);
          }
        }


        var trts=data[4];
        var j=-1;

        for(let i=0;i<trts.length;i++){
          if(i%6==0){
            j++;
            this.top_rated_tv_shows[j]=[];
            this.top_rated_tv_shows[j].push(trts[i]);
          }
          else{
            this.top_rated_tv_shows[j].push(trts[i]);
          }
        }


        var pts=data[5];
        var j=-1;

        for(let i=0;i<pts.length;i++){
          if(i%6==0){
            j++;
            this.popular_tv_shows[j]=[];
            this.popular_tv_shows[j].push(pts[i]);
          }
          else{
            this.popular_tv_shows[j].push(pts[i]);
          }
        }

        this.currently_playing_movies=data[6];





        /*this.trending_movies=data[0];
        this.top_rated_movies=data[1];
        this.popular_movies=data[2];
        this.trending_tv_shows=data[3];
        this.top_rated_tv_shows=data[4];
        this.popular_tv_shows=data[5];
        this.currently_playing_movies=data[6];*/



      }
      );

    var cw=localStorage.getItem('ls');
    var currently_watching_parsed=JSON.parse(cw);

    var cw_array=[];

    Object.keys(currently_watching_parsed).forEach(function(key) {
      var obj={};
      obj['key'] = key;
      obj['poster_path'] = currently_watching_parsed[key][0];
      obj['title']=currently_watching_parsed[key][1];
      if(currently_watching_parsed[key][2]=='movie'){
        obj['is_movie']=true;
      }
      else{
        obj['is_movie']=false;
      }
      if(currently_watching_parsed[key][2]=='tv'){
        obj['is_tv']=true;
      }
      else{
        obj['is_tv']=false;
      }

      cw_array.push(obj);
});


    var cw_array_of_6=[];
    var j=-1;
    for(var i=0;i<cw_array.length; i++){
      if( i%6==0){
        j++;
        cw_array_of_6[j]=[];
        cw_array_of_6[j].push(cw_array[i]);
      }
      else{
       cw_array_of_6[j].push(cw_array[i]);
      }
    }



    this.my_list = cw_array_of_6;

    if(this.my_list.length>0){
      this.display_my_list=true;
    }
  }

  find_items_in_localstorage(){
    var cw=localStorage.getItem('ls');
    var currently_watching_parsed=JSON.parse(cw);

    var cw_array=[];

    Object.keys(currently_watching_parsed).forEach(function(key) {
      var obj={};
      obj['key'] = key;
      obj['poster_path'] = currently_watching_parsed[key][0];
      obj['title']=currently_watching_parsed[key][1];
      if(currently_watching_parsed[key][2]=='movie'){
        obj['is_movie']=true;
      }
      else{
        obj['is_movie']=false;
      }
      if(currently_watching_parsed[key][2]=='tv'){
        obj['is_tv']=true;
      }
      else{
        obj['is_tv']=false;
      }

      cw_array.push(obj);
});

    this.my_list = cw_array;

  }

  navigate_tv_movie(is_movie, elementID){
    if(is_movie){
      this.navigate_movie(elementID);
    }
    else{
      this.navigate_tv(elementID);
    }
  }



  navigate_movie(id){
    this.router.navigateByUrl('/watch/movie/'+id);

  }
  navigate_tv(id){

    this.router.navigateByUrl('/watch/tv/'+id);

  }

  mouseOverBanner(eventObj, elementID) {
    document.getElementById('banner-title-' + elementID).style.display='block';
    document.getElementById('banner-image-' + elementID).style.transform='scale(1.3)';
  }

  mouseNotOverBanner(eventObj, elementID) {
    document.getElementById('banner-title-' + elementID).style.display='none';
    document.getElementById('banner-image-' + elementID).style.transform='scale(1)';
  }

  mouseOverCarouselItem(eventObj, elementID, carouselId){
    document.getElementById(carouselId + '-carousel-image-' + elementID).style.transform='scale(1.2)';
    document.getElementById(carouselId + '-carousel-image-caption-' + elementID).style.display='block';

  }

  mouseNotOverCarouselItem(eventObj, elementID, carouselId){
    document.getElementById(carouselId + '-carousel-image-' + elementID).style.transform='scale(1)';
    document.getElementById(carouselId + '-carousel-image-caption-' + elementID).style.display='none';
  }
}
