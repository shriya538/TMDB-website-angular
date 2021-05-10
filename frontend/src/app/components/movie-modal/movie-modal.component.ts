import { Component, OnInit,ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {GetDataService} from '../../services/get-data.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime} from 'rxjs/operators';
/*import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';*/

/*import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';*/

@Component({
  selector: 'app-movie-modal',
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.css']
})
export class MovieModalComponent implements OnInit {
/*
@ViewChild('#selfClosingAlertadd', {static: false}) selfClosingAlertadd: NgbAlert;
@ViewChild('#selfClosingAlertremove', {static: false}) selfClosingAlertremove: NgbAlert;
*/


  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private service: GetDataService, private modalService: NgbModal, private router: Router) {
  }


  movie_details: {} = {};
  movie_reviews: {} = {};
  movie_reviews_length: number=0;
  movie_cast: any[] = [];
  movie_video: {} = {};
  similar_movies: any[] = [];
  recommended_movies: any[] = [];
  local_items: {}={};

  display_similar_movies: boolean = false;
  display_recommended_movies: boolean = false;
  alert_add:boolean=false;
  alert_remove: boolean=false;
  /*display_watchlist_button:boolean=false;*/
  button_text:string='';


  cast_adult: boolean = false;
  cast_also_known_as: any[] = [];
  cast_biography: string = '';
  cast_birthday: string = '';
  cast_deathday: string = '';
  cast_gender: string = '';
  cast_homepage: string = '';
  cast_id: number = 0;
  cast_imdb_id: string = '';
  cast_known_for_department: string = '';
  cast_name: string = '';
  cast_place_of_birth: string = '';
  cast_popularity: number = 0;
  cast_profile_path: string = '';
  movie_id:number=0;
  sl_string:string='';


  cast_facebook_id: string = '';
  cast_instagram_id: string = '';
  cast_twitter_id: string = '';

  display_cast_facebook_id: boolean = false;
  display_cast_instagram_id: boolean = false;
  display_cast_twitter_id: boolean = false;


  display_cast_also_known_as: boolean = false;
  display_cast_biography: boolean = false;
  display_cast_birthday: boolean = false;
  display_cast_deathday: boolean = false;
  display_cast_gender: boolean = false;
  display_cast_homepage: boolean = false;
  display_cast_imdb_id: boolean = false;
  display_cast_known_for_department: boolean = false;
  display_cast_name: boolean = false;
  display_cast_place_of_birth: boolean = false;
  display_profile_path: boolean = false;

 /* private _success = new Subject<string>();

  successMessage = '';*/

 /* @ViewChild('addAlert', {static: false}) addAlert: any;*/

  ngOnInit(): void {
    /*this.selfClosingAlertadd.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
    this.selfClosingAlertremove.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });*/

    document.getElementById('home_button').style.opacity = '0.7';
    document.getElementById('my_list_button').style.opacity = '0.7';
    if(document.getElementById('add_alert_popup')!==null){
      document.getElementById('add_alert_popup').style.display="none";
    }
    if(document.getElementById('remove_alert_popup')!==null){
      document.getElementById('remove_alert_popup').style.display="none";
    }

    // vardocument.getElementById('cast_scroll');



    this.route.paramMap.subscribe(params => {

      var id = +params.get('id');//converts string to number
      this.movie_id= id;
      var moviepage = '/movie_page/' + id;
      if(localStorage.getItem(String(id))!=null){
        this.button_text = 'Remove from watchlist';

      }
      else{
        this.button_text= 'Add to watchlist';

      }
      const resp = this.httpClient.get(moviepage).subscribe((data: any) => {

        this.movie_details = data[0];
        var genre_string= this.movie_details['genres'][0];

        for(let i=1;i<this.movie_details['genres'].length;i++){
          genre_string+=','+this.movie_details['genres'][i];
        }
        this.movie_details['genres']=genre_string;




        this.sl_string=this.movie_details['spoken_languages'][0]['name'];
        for(let i=1;i<this.movie_details['spoken_languages'].length;i++){
          this.sl_string+=','+this.movie_details['spoken_languages'][i]['name'];
        }


       /* var spoken_languages_string = this.movie_details['spoken_langauges'][0];
        console.log(spoken_languages_string);
        /!*for(let i=1;i<this.movie_details['spoken_languages'].length;i++){
          spoken_languages_string += ','+this.movie_details['spoken_languages'][i]['name'];
        }
*!/
        console.log(spoken_languages_string);
        this.movie_details['spoken_languages']=spoken_languages_string;*/

        this.movie_reviews_length=data[1].length;
        this.movie_reviews = data[1];

        this.movie_cast = data[2];
       /* var j = -1;

        for (let i = 0; i < mc.length; i++) {
          if (mc[i]['profile_path'] != null) {
            if (i % 6 == 0) {
              j++;
              this.movie_cast[j] = [];
              this.movie_cast[j].push(mc[i]);
            } else {
              this.movie_cast[j].push(mc[i]);
            }
          }
        }

        /*var curr_obj=Array();

        for(let i =0;i<18;i++){
          if(i%6===0 && i!==0){
            console.log(curr_obj);
            this.movie_cast.push(curr_obj);
          }
          else {
            curr_obj.push(mc[i]);
          }
        }
        console.log(this.movie_cast);*/


        /*var mc=data[2];
        console.log(mc);
        var j=-1;

        for(let i=0;i<mc.length;i++){
          if (i%6===0){
            j++;
            this.movie_cast[j]=[];
            this.movie_cast[j].push(mc[i]);
          }
          else{
            this.movie_cast[j].push(mc[i]);
          }

        }
        console.log(this.movie_cast);*/
        /*var mc=data[2];

        var j=-1;

        for(let i=0;i<mc.length;i++){
          if(i%6==0){
            j++;
            this.movie_cast[j]=[];
            this.movie_cast[j].push(mc[i]);
          }
          else{
            this.movie_cast[j].push(mc[i]);
          }
        }*/

        this.movie_video = data[3][0];


        var sm = data[4];
        var j = -1;
        if (sm != null) {
          this.display_similar_movies = true;
        }

        for (let i = 0; i < sm.length; i++) {
          if (i % 6 == 0) {
            j++;
            this.similar_movies[j] = [];
            this.similar_movies[j].push(sm[i]);
          } else {
            this.similar_movies[j].push(sm[i]);
          }
        }



        var rm = data[5];
        var j = -1;
        if (rm != null) {
          this.display_recommended_movies = true;
        }

        for (let i = 0; i < rm.length; i++) {
          if (i % 6 == 0) {
            j++;
            this.recommended_movies[j] = [];
            this.recommended_movies[j].push(rm[i]);
          } else {
            this.recommended_movies[j].push(rm[i]);
          }
        }



        /*this.similar_movies=data[4];*/
        /*this.recommended_movies=data[5];*/


      });


    });

    var id = this.movie_id;//converts string to number
    var key_id= String(id);
    var ls_unparsed = localStorage.getItem('ls');
    var ls = JSON.parse(ls_unparsed);



    if(ls[key_id]){
      this.button_text='Remove from watchlist'
    }
    else{
      this.button_text= 'Add to Watchlist';
    }


    /*setTimeout(() => this.selfClosingAlert.close(), 20000);
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(50)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });*/

  }


  openVerticallyCentered(content, id) {
    /* var url='http://localhost:8080/cast/:'+ id;*/
    /*const resp= this.httpClient.get(url).subscribe((data: any)=>{
      console.log(data);

    });
*/
    /*this.route.paramMap.subscribe(params => {*/
    /*console.log(params);
    var id = +params.get('id');//converts string to number*/
    var castpage = '/cast/' + id;
    const resp = this.httpClient.get(castpage).subscribe((data: any) => {
      this.cast_adult = data['adult'];
      if (data['also_known_as'] != null) {
        this.display_cast_also_known_as = true;
      }
      this.cast_also_known_as = data['also_known_as'];

      if (data['biography'] != '') {
        this.display_cast_biography = true;
      }

      this.cast_biography = data['biography'];

      if (data['cast_birthday'] != null) {
        this.display_cast_birthday = true;
      }
      this.cast_birthday = data['birthday'];

      if (data['cast_deathday'] != null) {
        this.display_cast_deathday = true
      }
      this.cast_deathday = data['deathday'];

      if (data['gender'] == 2) {
        this.cast_gender = 'Male'
      } else {
        this.cast_gender = 'Female'
      }
      if (data['gender'] != null) {
        this.display_cast_gender = true;
      }
      if (data['cast_homepage'] != null) {
        this.display_cast_homepage = true;
      }

      this.cast_homepage = data['homepage'];

      this.cast_id = data['id'];
      if (data['imdb_id'] != null) {
        this.display_cast_imdb_id = true;
      }
      this.cast_imdb_id = 'http://imdb.com/name/' + data['imdb_id'];
      /*cast external ids endpoint to be made*/
      if (data['known_for_department']) {
        this.display_cast_known_for_department = true;
      }
      this.cast_known_for_department = data['known_for_department'];
      if (data['name']) {
        this.display_cast_name = true;
      }
      this.cast_name = data['name'];
      if (data['place_of_birth']) {
        this.display_cast_place_of_birth = true;
      }
      this.cast_place_of_birth = data['place_of_birth'];
      /*popularity not shown in html*/
      this.cast_popularity = data['popularity'];
      if (data['profile_path'] != null) {
        this.display_profile_path = true;
      }
      this.cast_profile_path = data['profile_path'];


    });

    var cast_external = '/cast_external/' + id;

    const resp2 = this.httpClient.get(cast_external).subscribe((data: any) => {

      if (data['facebook_id'] != null) {
        this.display_cast_facebook_id = true;
      }
      this.cast_facebook_id = 'http://facebook.com/' + data['facebook_id'];


      if (data['instagram_id'] != null) {
        this.display_cast_instagram_id = true;
      }
      this.cast_instagram_id = 'http://instagram.com/' + data['instagram_id'];

      if (data['twitter_id'] != null) {
        this.display_cast_twitter_id = true;
      }
      this.cast_twitter_id = 'http://twitter.com/' + data['twitter_id'];

    });
    this.modalService.open(content, {centered: true});


    /* });*/

  }

  navigate_movie(id) {
    console.log(id);
    if(document.getElementById('add_alert_popup')!==null){
      document.getElementById('add_alert_popup').style.display="none";
    }
    if(document.getElementById('remove_alert_popup')!==null){
      document.getElementById('remove_alert_popup').style.display="none";
    }
    this.router.navigateByUrl('/watch/movie/' + id);

  }


  local_storage(){
     /*this.route.paramMap.subscribe(params => {
       console.log(params);*/
      var id = this.movie_id;


      var key_id = String(id);

     /*  /!*localStorage.setItem('ls_items',{});*!/
       var arr:any[]=[];
       localStorage.setItem('ls',JSON.stringify(arr));

       if(local_items[key_id]){

         console.log('remove item');
         var local_items=localStorage.getItem('ls');
         var local_items_parsed=JSON.parse(local_items);
         delete local_items_parsed[key_id];
         localStorage.setItem('ls',JSON.stringify(local_items_parsed));
       }
       else{


         console.log('set item');
         var local_items=localStorage.getItem('ls');
         localStorage.removeItem('ls');
         var local_items_parsed=JSON.parse(local_items);
         var obj={key_id:[this.movie_details['poster_path'],this.movie_details['title'],'movie']};

         local_items_parsed.push(obj);
         localStorage.setItem('ls',JSON.stringify(local_items_parsed));

       }*/

       var ls_unparsed = localStorage.getItem('ls');
       var ls = JSON.parse(ls_unparsed);


       if (ls === null){
        ls = {};
       }

       if(key_id in ls){
          delete ls[key_id];
          localStorage.setItem('ls',JSON.stringify(ls));
          this.button_text='Add to watchlist';
          this.alert_remove=true;
          this.alert_add=false;
       }
       else{

         ls[key_id]=[this.movie_details['poster_path'],this.movie_details['title'],'movie'];
         localStorage.setItem('ls',JSON.stringify(ls));
         this.button_text = 'Remove from watchlist';
         this.alert_add=true;
         this.alert_remove=false;
       }






   /*  });*/

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

