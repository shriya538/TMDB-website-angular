import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { watchFile } from 'node:fs';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})

export class WatchlistComponent implements OnInit {

  constructor(private router:Router) {

  }
  currently_watching: any[]= [];
  no_items_found: boolean = true;
  display_watchlist:boolean = false;


  /*array_of_items_in_local:any[] = [];*/

  ngOnInit(): void {
    /*localStorage.getItem()*/
    /*console.log('hey');
    var archive = [],
        keys = Object.keys(localStorage),
        i = 0, key;

    for (; key = keys[i]; i++) {
        archive.push( key + '=' + localStorage.getItem(key));
    }

    console.log(archive);*/

    /*var local=localStorage;
    for(var key in local){
         console.log(key);
         console.log(local[key]);

       }*/
/*console.log(typeof(this.items));*/
  document.getElementById('home_button').style.opacity = '0.7';
  document.getElementById('my_list_button').style.opacity = '1';

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
    this.currently_watching= cw_array;


    if(cw_array.length!= 0){
      this.no_items_found = false;
      this.display_watchlist= true;

      if(document.getElementById('wacthListAvailabeDiv')!==null){
        document.getElementById('wacthListAvailabeDiv').remove();
      }

      let myWatchListcontainer = document.getElementById("my-watch-list-container");

      let wacthListAvailabeDiv = document.createElement("div");
      wacthListAvailabeDiv.id = "wacthListAvailabeDiv";
      myWatchListcontainer.appendChild(wacthListAvailabeDiv);

      let watchlistTitle = document.createElement("p");
      watchlistTitle.innerHTML = "My Watchlist";
      watchlistTitle.classList.add("my-watchlist-title");
      watchlistTitle.style.fontSize = "30px";
      watchlistTitle.style.color = "white";
      watchlistTitle.style.fontWeight = "600";
      watchlistTitle.style.padding = "20px";
      wacthListAvailabeDiv.appendChild(watchlistTitle);

      let parentDiv = document.createElement('div');
      parentDiv.id = "watchlist-container";
      wacthListAvailabeDiv.appendChild(parentDiv);

      cw_array.map((o, k) => {
        let parentDiv = document.getElementById("watchlist-container");
        // parentDiv.style.textAlign = 'center';
        // parentDiv.style.justifyContent = 'center';
        let curr = document.createElement('div');
        curr.classList.add('watchlist-item-container');
        curr.id = 'currently-watching-' + o.key;
        if (o.is_movie){
          curr.onclick = () => {
            this.navigate_movie(o.key);
          }
        }
        else {
          curr.onclick = () => {
            this.navigate_tv(o.key);
          }
        }

        curr.style.display = 'inline-block';
        curr.style.margin = 'auto';
        curr.style.width = "fit-content";
        curr.style.height = "fit-content";

        let watchlist_item_img = document.createElement('img');
        watchlist_item_img.src = o.poster_path;
        watchlist_item_img.classList.add('img_currently_watching');
        watchlist_item_img.style.width = '100%';
        watchlist_item_img.style.maxWidth = '200px';
        watchlist_item_img.style.padding = '20px';
        watchlist_item_img.style.objectFit = 'contain';

        curr.appendChild(watchlist_item_img);

        let watchlist_item_title_container = document.createElement('div');
        watchlist_item_title_container.id = 'currently-watching-item-' + o.key;
        // watchlist_item_title_container.classList.add('carousel-caption');

        watchlist_item_title_container.style.display = 'none';
        watchlist_item_title_container.style.bottom = '0';
        watchlist_item_title_container.style.width='100%';
        watchlist_item_title_container.style.padding='0';
        watchlist_item_title_container.style.margin='0';
        watchlist_item_title_container.style.height='100%';
        watchlist_item_title_container.style.bottom = '0';
        watchlist_item_title_container.style.left='0';
        watchlist_item_title_container.style.backgroundImage= "linear-gradient(to bottom,rgba(0, 0, 0, 0),rgba(0, 0, 0, 1))";


        let watchlist_item_title = document.createElement('div');
        watchlist_item_title.classList.add('carousel-image-caption-text')
        watchlist_item_title.innerHTML = o.title;

        watchlist_item_title_container.appendChild(watchlist_item_title);
        curr.appendChild(watchlist_item_title_container);

        curr.onmouseover = () => {
          watchlist_item_img.style.transform='scale(1.2)';
          watchlist_item_title_container.style.display='block';
        }

        curr.onmouseover = () => {
          watchlist_item_img.style.transform='scale(1)';
          watchlist_item_title_container.style.display='None';
        }
        parentDiv.appendChild(curr);
      })
    }



     /*this.my_hash.push(obj);*/
      /*console.log(typeof(this.items));
      this.items.set(key,localStorage.getItem(key));*/
      /*this.myhash.push({k:localStorage.getItem(k)});*/


}


  navigate_movie(id){

    this.router.navigateByUrl('/watch/movie/'+id);

  }
  navigate_tv(id){

    this.router.navigateByUrl('/watch/tv/'+id);

  }






  }


