import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {GetDataService} from '../../services/get-data.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tvmodal',
  templateUrl: './tvmodal.component.html',
  styleUrls: ['./tvmodal.component.css']
})
export class TVModalComponent implements OnInit {

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private service: GetDataService, private modalService: NgbModal, private router: Router) {
  }

  /*tv_details: {} = {};
  tv_reviews: [] = [];
  tv_cast: any[] = [];
  tv_video: {} = {};
  similar_tv: any[] = [];
  recommended_tv: any[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      var id = +params.get('id');
      console.log(id);
      var tvpage = '/tv_page/' + id;
      console.log(tvpage);
      const resp = this.httpClient.get(tvpage).subscribe((data: any) => {
        console.log(data);
        this.tv_details=data[0];
        this.tv_reviews=data[1];

        var tc=data[2];
        var j=-1;


        for(let i=0;i<tc.length;i++){
          if(i%6==0){
            j++;
            this.tv_cast[j]=[];
            this.tv_cast[j].push(tc[i]);
          }
          else{
            this.tv_cast[j].push(tc[i]);
          }
        }
        console.log(this.tv_cast);

        this.tv_video=data[3][0];

        var st=data[4];
        var j=-1;

        for(let i=0;i<st.length;i++){
          if(i%6==0){
            j++;
            this.similar_tv[j]=[];
            this.similar_tv[j].push(st[i]);
          }
          else{
            this.similar_tv[j].push(st[i]);
          }
        }
        console.log(this.similar_tv);

        var rt=data[5];
        var j=-1;

        for(let i=0;i<rt.length;i++){
          if(i%6==0){
            j++;
            this.recommended_tv[j]=[];
            this.recommended_tv[j].push(rt[i]);
          }
          else{
            this.recommended_tv[j].push(rt[i]);
          }
        }
        console.log(this.recommended_tv);






      });

    });
  }


}

*/
  tv_details: {} = {};
  tv_reviews: {} = {};
  tv_reviews_length: number=0;
  tv_cast: any[] = [];
  tv_video: {} = {};
  similar_tv: any[] = [];
  recommended_tv: any[] = [];
  local_items: {}={};

   alert_add:boolean=false;
  alert_remove: boolean=false;
  button_text:string='';

  display_similar_tv: boolean = false;
  display_recommended_tv: boolean = false;


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
  tv_id:number=0;
  genre_string:string='';
  sl_string:string='';
  show_runtime:boolean=false;


  ngOnInit(): void {
    document.getElementById('home_button').style.opacity = '0.7';
    document.getElementById('my_list_button').style.opacity = '0.7';
    if(document.getElementById('add_alert_popup')!==null){
      document.getElementById('add_alert_popup').style.display="none";
    }
    if(document.getElementById('remove_alert_popup')!==null){
      document.getElementById('remove_alert_popup').style.display="none";
    }

    this.route.paramMap.subscribe(params => {

      var id = +params.get('id');//converts string to number

      this.tv_id = id;
      var moviepage = '/tv_page/' + id;
      if(localStorage.getItem(String(id))!=null){
        this.button_text='Remove from Watchlist';

      }
      else{
        this.button_text='Add to watchlist';

      }
      const resp = this.httpClient.get(moviepage).subscribe((data: any) => {

        this.tv_details = data[0];

        this.genre_string=this.tv_details['genres'][0]['name'];
        for(let i=1;i<this.tv_details['genres'].length;i++){
          this.genre_string+=','+this.tv_details['genres'][i]['name'];
        }

        this.sl_string=this.tv_details['spoken_languages'][0]['name'];
        for(let i=1;i<this.tv_details['spoken_languages'].length;i++){
          this.sl_string+=','+this.tv_details['spoken_languages'][i]['name'];
        }


        if(this.tv_details['episode_run_time']){
          this.show_runtime=true;
        }

        this.tv_reviews_length= data[1].length;
        this.tv_reviews = data[1];

        this.tv_cast = data[2];
        console.log(this.tv_cast);
        var j = -1;




        /*var curr_obj=Array();

        for(let i =0;i<18;i++){
          if(i%6===0 && i!==0){
            console.log(curr_obj);
            this.tv_cast.push(curr_obj);
          }
          else {
            curr_obj.push(mc[i]);
          }
        }
        console.log(this.tv_cast);*/


        /*var mc=data[2];
        console.log(mc);
        var j=-1;

        for(let i=0;i<mc.length;i++){
          if (i%6===0){
            j++;
            this.tv_cast[j]=[];
            this.tv_cast[j].push(mc[i]);
          }
          else{
            this.tv_cast[j].push(mc[i]);
          }

        }
        console.log(this.tv_cast);*/
        /*var mc=data[2];

        var j=-1;

        for(let i=0;i<mc.length;i++){
          if(i%6==0){
            j++;
            this.tv_cast[j]=[];
            this.tv_cast[j].push(mc[i]);
          }
          else{
            this.tv_cast[j].push(mc[i]);
          }
        }*/

        this.tv_video = data[3][0];


        var sm = data[4];
        var j = -1;
        if (sm != null) {
          this.display_similar_tv = true;
        }

        for (let i = 0; i < sm.length; i++) {
          if (i % 6 == 0) {
            j++;
            this.similar_tv[j] = [];
            this.similar_tv[j].push(sm[i]);
          } else {
            this.similar_tv[j].push(sm[i]);
          }
        }



        var rm = data[5];
        var j = -1;
        if (rm != null) {
          this.display_recommended_tv = true;
        }

        for (let i = 0; i < rm.length; i++) {
          if (i % 6 == 0) {
            j++;
            this.recommended_tv[j] = [];
            this.recommended_tv[j].push(rm[i]);
          } else {
            this.recommended_tv[j].push(rm[i]);
          }
        }


        /*this.similar_tv=data[4];*/
        /*this.recommended_tv=data[5];*/


      });


    });

    var id = this.tv_id;//converts string to number
    var key_id= String(id);
    var ls_unparsed = localStorage.getItem('ls');
    var ls = JSON.parse(ls_unparsed);



    if(ls[key_id]){
      this.button_text='Remove from watchlist'
    }
    else{
      this.button_text= 'Add to Watchlist';
    }

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
        this.cast_gender = 'Male';
      } else {
        this.cast_gender = 'Female';
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

  navigate_tv(id) {
    console.log(id);
    if(document.getElementById('add_alert_popup')!==null){
      document.getElementById('add_alert_popup').style.display="none";
    }
    if(document.getElementById('remove_alert_popup')!==null){
      document.getElementById('remove_alert_popup').style.display="none";
    }
    this.router.navigateByUrl('/watch/tv/' + id);


  }


  local_storage(){
    /* this.route.paramMap.subscribe(params => {
       console.log(params);*/
      var id = this.tv_id;//converts string to number


   /*   if(localStorage.clickcount%2==0){
        localStorage.removeItem(String(id));
        console.log('remove item');
      }
      else{
        localStorage.setItem(String(id),this.tv_details['poster_path']);
        console.log('add item');
      }*/
       console.log('start');

       /*for(var key in local){
         console.log(key);
         console.log(local[key]);

       }*/
       var key_id=String(id);
       /*localStorage.setItem('ls_items',{});*/

       /*if(this.local_items[key_id]){
         /!*localStorage.removeItem(key_id);*!/
         /!*var local_items_with_extra=localStorage.removeItem('local_storage_items');
         local_items_with_extra.*!/
         /!*var ls= localStorage.getItem('ls_items');
         localStorage.removeItem('ls_items');
         ls.delete(key_id);
         localStorage.setItem('ls_items',ls);
         console.log('remove_item');*!/
         console.log('remove item');
         localStorage.removeItem('ls');
         delete this.local_items[key_id];
       }
       else{
        /!* localStorage.setItem(key_id, this.tv_details['poster_path']);*!/
         /!*console.log('set item');
         var ls=localStorage.getItem('ls_items');
         localStorage.removeItem('ls_items');
         ls.key_id= [this.tv_details['poster_path'],this.tv_details['title']];
         localStorage.setItem('ls_items',ls);*!/

         console.log('set item');
         this.local_items[key_id]=[this.tv_details['poster_path'],this.tv_details['name'],'tv'];
         localStorage.setItem('ls',JSON.stringify(this.local_items));

       }*/

      var ls_unparsed = localStorage.getItem('ls');
       localStorage.removeItem('ls');
       var ls = JSON.parse(ls_unparsed);

       if(ls[key_id]){

          delete ls[key_id];
          localStorage.setItem('ls',JSON.stringify(ls));
          this.button_text='Add to watchlist';
          this.alert_remove=true;
          this.alert_add=false;
       }
       else{

         ls[key_id]=[this.tv_details['poster_path'],this.tv_details['title'],'tv'];
         localStorage.setItem('ls',JSON.stringify(ls));
         this.button_text='Remove from watchlist';
         this.alert_add=true;
         this.alert_remove=false;


       }




    /* });*/

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





