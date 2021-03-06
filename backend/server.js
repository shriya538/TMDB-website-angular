/* jshint node: true */
/*jshint esversion: 6 */
"use strict";

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const path = require("path");
const cors = require("cors");

app.use(cors());

const constants = require("./constants");
const axios = require("axios");

app.use(express.static(path.join(__dirname, "FrontendBuild")));

/*
app.get('/',(req,res)=>{
  res.send('Imma serverrr');
});*/

app.get("/home_page", async (req, res) => {
  let one = constants.TRENDING_MOVIES;
  let two = constants.TOP_RATED_MOVIES;
  let three = constants.POPULAR_MOVIES;
  let four = constants.TRENDING_TV;
  let five = constants.TOP_RATED_TV;
  let six = constants.POPULAR_TV;
  let seven = constants.CURRENTLY_PLAYING_MOVIES;

  const requestOne = axios.get(one);
  const requestTwo = axios.get(two);
  const requestThree = axios.get(three);
  const requestFour = axios.get(four);
  const requestFive = axios.get(five);
  const requestSix = axios.get(six);
  const requestSeven = axios.get(seven);

  await axios
    .all([
      requestOne,
      requestTwo,
      requestThree,
      requestFour,
      requestFive,
      requestSix,
      requestSeven,
    ])
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[0].data.results;
        const responseTwo = responses[1].data.results;
        const responseThree = responses[2].data.results;
        const responseFour = responses[3].data.results;
        const responseFive = responses[4].data.results;
        const responseSix = responses[5].data.results;
        const responseSeven = responses[6].data.results;

        let final_resultOne = [];
        let final_resultTwo = [];
        let final_resultThree = [];
        let final_resultFour = [];
        let final_resultFive = [];
        let final_resultSix = [];
        let final_resultSeven = [];
        let main_result = [];

        for (let i = 0; i < responseOne.length; i++) {
          let curr_obj = {};
          curr_obj["id"] = responseOne[i].id;
          curr_obj["title"] = responseOne[i].title;
          if(responseOne[i].poster_path==null){
            curr_obj['poster_path']=constants.default_poster;
          }
          else{
            curr_obj["poster_path"] =
            constants.image_pre + responseOne[i].poster_path;
          }
          final_resultOne.push(curr_obj);
        }


        for (let i = 0; i < responseTwo.length; i++) {
          let curr_obj = {};
          curr_obj["id"] = responseTwo[i].id;
          curr_obj["title"] = responseTwo[i].title;
           if(responseTwo[i].poster_path==null){
            curr_obj['poster_path']=constants.default_poster;
          }
          else{
            curr_obj["poster_path"] =
            constants.image_pre + responseTwo[i].poster_path;
          }

          final_resultTwo.push(curr_obj);
        }
     
        for (let i = 0; i < responseThree.length; i++) {
          let curr_obj = {};
          curr_obj["id"] = responseThree[i].id;
          curr_obj["title"] = responseThree[i].title;
           if(responseThree[i].poster_path==null){
            curr_obj['poster_path']=constants.default_poster;
          }
          else{
            curr_obj["poster_path"] =
            constants.image_pre + responseThree[i].poster_path;
          }
          final_resultThree.push(curr_obj);
        }
    
        for (let i = 0; i < responseFour.length; i++) {
          let curr_obj = {};
          curr_obj["id"] = responseFour[i].id;
          curr_obj["name"] = responseFour[i].name;
           if(responseFour[i].poster_path==null){
            curr_obj['poster_path']=constants.default_poster;
          }
          else{
            curr_obj["poster_path"] =
            constants.image_pre + responseFour[i].poster_path;
          }
          final_resultFour.push(curr_obj);
        }
      
        for (let i = 0; i < responseFive.length; i++) {
          let curr_obj = {};
          curr_obj["id"] = responseFive[i].id;
          curr_obj["name"] = responseFive[i].name;
           if(responseFive[i].poster_path==null){
            curr_obj['poster_path']=constants.default_poster;
          }
          else{
            curr_obj["poster_path"] =
            constants.image_pre + responseFive[i].poster_path;
          }
          final_resultFive.push(curr_obj);
        }
     
        for (let i = 0; i < responseSix.length; i++) {
          let curr_obj = {};
          curr_obj["id"] = responseSix[i].id;
          curr_obj["name"] = responseSix[i].name;
           if(responseSix[i].poster_path==null){
            curr_obj['poster_path']=constants.default_poster;
          }
          else{
            curr_obj["poster_path"] =
            constants.image_pre + responseSix[i].poster_path;
          }
          final_resultSix.push(curr_obj);
        }
        

        for (let i = 0; i < 5; i++) {
          let curr_obj = {};
          curr_obj["id"] = responseSeven[i].id;
          curr_obj["title"] = responseSeven[i].title;
          curr_obj["poster_path"] =
            'https://image.tmdb.org/t/p/original'+ responseSeven[i].poster_path;
            
          curr_obj["backdrop_path"] =
            'https://image.tmdb.org/t/p/original' + responseSeven[i].backdrop_path;
          
          final_resultSeven.push(curr_obj);
        }
        

        main_result.push(final_resultOne);
        main_result.push(final_resultTwo);
        main_result.push(final_resultThree);
        main_result.push(final_resultFour);
        main_result.push(final_resultFive);
        main_result.push(final_resultSix);
        main_result.push(final_resultSeven);

       
        res.send(main_result);
      })
    )
    .catch((errors) => {
      console.error(errors);
    });
});

///MOVIE PAGE ID GIVEN

app.get("/movie_page/:id", async (req, res) => {
  var id = req.params.id;
  //making urls to api calls

  const MOVIE_DETAILS =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "?api_key=" +
    constants.Unique_API_KEY +
    "&language=en-US&page=1";
  const MOVIE_REVIEWS =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "/reviews?api_key=" +
    constants.Unique_API_KEY +
    "&language=en-US&page=1";
  const MOVIE_CAST =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "/credits?api_key=" +
    constants.Unique_API_KEY +
    "&language=en-US&page=1";
  const MOVIE_VIDEO =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "/videos?api_key=" +
    constants.Unique_API_KEY +
    "&language=en-US&page=1";
  const SIMILAR_MOVIES =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "/similar?api_key=" +
    constants.Unique_API_KEY +
    "&language=en-US&page=1";
  const RECOMMENDED_MOVIES =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "/recommendations?api_key=" +
    constants.Unique_API_KEY +
    "&language=en-US&page=1";

  let one = MOVIE_DETAILS;
  let two = MOVIE_REVIEWS;
  let three = MOVIE_CAST;
  let four = MOVIE_VIDEO;
  let five = SIMILAR_MOVIES;
  let six = RECOMMENDED_MOVIES;

  const requestOne = axios.get(one);
  const requestTwo = axios.get(two);
  const requestThree = axios.get(three);
  const requestFour = axios.get(four);
  const requestFive = axios.get(five);
  const requestSix = axios.get(six);

  await axios
    .all([
      requestOne,
      requestTwo,
      requestThree,
      requestFour,
      requestFive,
      requestSix,
    ])
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[0].data;
        const responseTwo = responses[1].data.results;
        const responseThree = responses[2].data.cast;
        const responseFour = responses[3].data.results;
        const responseFive = responses[4].data.results;
        const responseSix = responses[5].data.results;

        let final_resultTwo = [];
        let final_resultThree = [];
        let final_resultFour = [];
        let final_resultFive = [];
        let final_resultSix = [];
        let main_result = [];

        //starting with request one
        let curr_obj = {};
        curr_obj["title"] = responseOne.title;
        let genres = [];
        for (let i = 0; i < responseOne["genres"].length; i++) {
          genres.push(responseOne["genres"][i]["name"]);
        }

        curr_obj["genres"] = genres;
        curr_obj["spoken_languages"] = responseOne.spoken_languages;
        curr_obj["release_date"] =
          responseOne.release_date.split("-")[0] + " | ";
        curr_obj["runtime"] =
          ((responseOne.runtime / 60) | 0) +
          "hrs " +
          (responseOne.runtime % 60) +
          "mins";
        curr_obj["overview"] = responseOne.overview;
        curr_obj["vote_average"] = responseOne.vote_average + " | ";
        curr_obj["tagline"] = responseOne.tagline;
        curr_obj["poster_path"] = constants.image_pre + responseOne.poster_path;
        curr_obj["backdrop_path"] =
          constants.image_pre + responseOne.poster_path;
        //done with request one

        //start with request two
        for (let i = 0; i < responseTwo.length; i++) {
          let obj = {};
          obj["author"] = responseTwo[i].author;
          obj["content"] = responseTwo[i].content;
          obj["created_at"] = responseTwo[i].created_at;
          obj["rating"] = responseTwo[i].author_details.rating;
          obj["id"] = responseTwo[i].id;
          var avatar = responseTwo[i].author_details.avatar_path;

          if (avatar == null) {
            obj["avatar_path"] =
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU";
          } else if (avatar.includes("https://")) {
            obj["avatar_path"] = avatar.substring(1);
          } else {
            obj["avatar_path"] = constants.avatar_pre + avatar.substring(1);
          }

          /*Need to add reviews*/

          /*   var url_without_dash =responseTwo[i].author_details.avatar_path.substring(1);
          console.log(url_without_dash);
          /!*var is_valid_url=isValidURL(url_without_dash);*!/
  }
          console.log(isUrl);
*/
          /*const url= new URL(url_without_dash);*/

          /*if(url.host){
            console.log(url);
          }*/

          /*            console.log(responseTwo[i].author_details);*/
          /*console.log(responseTwo[i].author_details.avatar_path);*/

          /*var url_without_dash=responseTwo[i].author_details.avatar_path.substring(1);
            var url=new URL(responseTwo[i].author_details.avatar_path);
            if(URL(url_without_dash).hostname){
              obj['avatar_path']=url_without_dash;
            }
            else if(url_without_dash!=null) {
              obj['avatar_path'] =constants.avatar_pre+responseTwo[i].author_details.avatar_path;
            }
            else{
                obj['avatar_path']='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU' ;
            }
*/
          final_resultTwo.push(obj);
        }

        //start with request three

        for (let i = 0; i < responseThree.length; i++) {
          let obj = {};
          obj["id"] = responseThree[i].id;
          obj["name"] = responseThree[i].name;
          obj["character"] = responseThree[i].character;
          if(responseThree[i].profile_path==null){
            obj['profile_path']=constants.cast_default_path;
          }
          else{
            obj["profile_path"] =
            constants.image_pre + responseThree[i].profile_path;
          }
          final_resultThree.push(obj);
        }

        //start with request Four
        var obj = {};
        obj["key"] = "tzkWB85ULJY";
        obj["type"] = "default";

        for (let i = 0; i < responseFour.length; i++) {
          if (
            responseFour[i].type == "Trailer" &&
            (obj["type"] == "default" || obj["type"] == "Teaser")
          ) {
            obj["key"] = responseFour[i].key;
            obj["type"] = responseFour[i].type;
          } else if (
            responseFour[i].type == "Teaser" &&
            obj["type"] == "default"
          ) {
            obj["key"] = responseFour[i].key;
            obj["type"] = responseFour[i].type;
          }

          /*let obj = {};
          obj["site"] = responseFour[i].site;
          obj["type"] = responseFour[i].type;
          obj["name"] = responseFour[i].name;
          /!*if(obj['key']){
               obj['key']=responseFour[i].key;
            }
            else{
              obj['key']='tzkWB85ULJY';
            }*!/
          obj["key"] = responseFour[i].key;

          final_resultFour.push(obj);*/
        }

        final_resultFour.push(obj);

        //start with requestFive
        for (let i = 0; i < responseFive.length; i++) {
          let obj = {};
          obj["id"] = responseFive[i].id;
          obj["title"] = responseFive[i].title;
           if(responseFive[i].poster_path==null || responseFive[i].poster_path==undefined){
            obj['poster_path']=constants.default_poster;
          }
          else{
            obj["poster_path"] =
            constants.image_pre + responseFive[i].poster_path;
          }
          /*curr_obj['poster_path']=constants.image_pre + responseFive[i].poster_path;*/
          final_resultFive.push(obj);
        }

        //start with requestSix
        for (let i = 0; i < responseSix.length; i++) {
          let obj = {};
          obj["id"] = responseSix[i].id;
          obj["title"] = responseSix[i].title;
           if(responseSix[i].poster_path==null || responseSix[i].poster_path==undefined){
            obj['poster_path']=constants.default_poster;
          }
          else{
            obj["poster_path"] =
            constants.image_pre + responseSix[i].poster_path;
          }
         /* curr_obj['poster_path']=constants.image_pre+responseSix[i].poster_path;*/
          final_resultSix.push(obj);
        }

        main_result.push(curr_obj);
        main_result.push(final_resultTwo);
        main_result.push(final_resultThree);
        main_result.push(final_resultFour);
        main_result.push(final_resultFive);
        main_result.push(final_resultSix);
        console.log("end");
        res.send(main_result);
      })
    )
    .catch((errors) => {
      console.error(errors);
    });
});

//TV_show page id given
app.get("/tv_page/:id", async (req, res) => {
  var id = req.params.id;
  //making urls to api calls

  const TV_DETAILS =
    "https://api.themoviedb.org/3/tv/" +
    id +
    "?api_key=" +
    constants.Unique_API_KEY +
    "&language=en-US&page=1";
  const TV_REVIEWS =
    "https://api.themoviedb.org/3/tv/" +
    id +
    "/reviews?api_key=" +
    constants.Unique_API_KEY +
    "&language=en-US&page=1";
  const TV_CAST =
    "https://api.themoviedb.org/3/tv/" +
    id +
    "/credits?api_key=" +
    constants.Unique_API_KEY +
    "&language=en-US&page=1";
  const TV_VIDEO =
    "https://api.themoviedb.org/3/tv/" +
    id +
    "/videos?api_key=" +
    constants.Unique_API_KEY +
    "&language=en-US&page=1";
  const SIMILAR_TV =
    "https://api.themoviedb.org/3/tv/" +
    id +
    "/similar?api_key=" +
    constants.Unique_API_KEY +
    "&language=en-US&page=1";
  const RECOMMENDED_TV =
    "https://api.themoviedb.org/3/tv/" +
    id +
    "/recommendations?api_key=" +
    constants.Unique_API_KEY +
    "&language=en-US&page=1";

  let one = TV_DETAILS;
  let two = TV_REVIEWS;
  let three = TV_CAST;
  let four = TV_VIDEO;
  let five = SIMILAR_TV;
  let six = RECOMMENDED_TV;

  const requestOne = axios.get(one);
  const requestTwo = axios.get(two);
  const requestThree = axios.get(three);
  const requestFour = axios.get(four);
  const requestFive = axios.get(five);
  const requestSix = axios.get(six);

  await axios
    .all([
      requestOne,
      requestTwo,
      requestThree,
      requestFour,
      requestFive,
      requestSix,
    ])
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[0].data;
        const responseTwo = responses[1].data.results;
        const responseThree = responses[2].data.cast;
        const responseFour = responses[3].data.results;
        const responseFive = responses[4].data.results;
        const responseSix = responses[5].data.results;

        let final_resultTwo = [];
        let final_resultThree = [];
        let final_resultFour = [];
        let final_resultFive = [];
        let final_resultSix = [];
        let main_result = [];

        //starting with request one
        let curr_obj = {};
        curr_obj["name"] = responseOne.name;
        curr_obj["genres"] = responseOne.genres;
        curr_obj["spoken_languages"] = responseOne.spoken_languages;
        curr_obj["first_air_date"] = responseOne.first_air_date;
        curr_obj["episode_run_time"] = responseOne.episode_run_time;
        curr_obj["overview"] = responseOne.overview;
        curr_obj["vote_average"] = responseOne.vote_average;
        curr_obj["tagline"] = responseOne.tagline;
        curr_obj["poster_path"] = constants.image_pre + responseOne.poster_path;
        curr_obj["backdrop_path"] =
          constants.image_pre + responseOne.backdrop_path;
        //done with request one

        //start with request two
        for (let i = 0; i < responseTwo.length; i++) {
          let obj = {};
          obj["author"] = responseTwo[i].author;
          obj["content"] = responseTwo[i].content;
          obj["created_at"] = responseTwo[i].created_at;
          obj["url"] = responseTwo[i].url;
          obj["rating"] = responseTwo[i].rating;
          var avatar = responseTwo[i].author_details.avatar_path.substring(1);

          if (avatar == null) {
            obj["avatar_path"] =
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU";
          } else if (avatar.includes("https://")) {
            obj["avatar_path"] = avatar;
          } else {
            obj["avatar_path"] = constants.avatar_pre + avatar;
          }

          /*
          if (responseTwo[i].avatar_path != null) {
            obj["avatar_path"] =
              constants.avatar_pre + responseTwo[i].avatar_path;
          } else {
            obj["avatar_path"] =
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU";
          }*/

          final_resultTwo.push(obj);
        }

        //start with request three

        for (let i = 0; i < responseThree.length; i++) {
          let obj = {};
          obj["id"] = responseThree[i].id;
          obj["name"] = responseThree[i].name;
          obj["character"] = responseThree[i].character;
          if(responseThree[i].profile_path==null){
            obj['profile_path']=constants.cast_default_path;
          }
          else{
            obj['profile_path']=constants.image_pre + responseThree[i].profile_path;
          }
          final_resultThree.push(obj);
        }

        //start with request Four
        var obj = {};
        obj["key"] = "tzkWB85ULJY";
        obj["type"] = "default";

        for (let i = 0; i < responseFour.length; i++) {
          if (
            responseFour[i].type == "Trailer" &&
            (obj["type"] == "default" || obj["type"] == "Teaser")
          ) {
            obj["key"] = responseFour[i].key;
            obj["type"] = responseFour[i].type;
          } else if (
            responseFour[i].type == "Teaser" &&
            obj["type"] == "default"
          ) {
            obj["key"] = responseFour[i].key;
            obj["type"] = responseFour[i].type;
          }

          /*let obj = {};
          obj["site"] = responseFour[i].site;
          obj["type"] = responseFour[i].type;
          obj["name"] = responseFour[i].name;
          /!*if (obj['key']!=null){
              obj['key'] = constants.VIDEO_PRE + responseFour[i].key;
            }
            else{
              obj['key']=constants.VIDEO_PRE+'tzkWB85ULJY';
            }*!/
          obj["key"] = responseFour[i].key;
          console.log(obj);
          final_resultFour.push(obj);*/
        }
        final_resultFour.push(obj);

        //start with requestFive
        for (let i = 0; i < responseFive.length; i++) {
          let obj = {};
          obj["id"] = responseFive[i].id;
          obj["name"] = responseFive[i].name;
           if(responseFive[i].poster_path==null){
            obj['poster_path']=constants.default_poster;
          }
          else{
            obj["poster_path"] =
            constants.image_pre + responseFive[i].poster_path;
          }
          final_resultFive.push(obj);
        }

        //start with requestSix
        for (let i = 0; i < responseSix.length; i++) {
          let obj = {};
          obj["id"] = responseSix[i].id;
          obj["name"] = responseSix[i].name;
          if(responseSix[i].poster_path==null || responseSix[i].poster_path==undefined){
            obj['poster_path']=constants.default_poster;
          }
          else{
            obj["poster_path"] =
            constants.image_pre + responseSix[i].poster_path;
          }
          final_resultSix.push(obj);
        }

        main_result.push(curr_obj);
        main_result.push(final_resultTwo);
        main_result.push(final_resultThree);
        main_result.push(final_resultFour);
        main_result.push(final_resultFive);
        main_result.push(final_resultSix);
        res.send(main_result);
      })
    )
    .catch((errors) => {
      console.error(errors);
    });
});

app.get("/cast/:id", async (req, res) => {
  /*To get information about the cast member*/

  var id = req.params.id;
  //making urls to api calls

  const cast_details =
    "https://api.themoviedb.org/3/person/" +
    id +
    "?api_key=" +
    constants.Unique_API_KEY +
    "&language=en-US&page=1";
 

  /*    const TV_DETAILS='https://api.themoviedb.org/3/tv/'+id+'?api_key='+constants.Unique_API_KEY+'&language=en-US&page=1';
    const TV_REVIEWS='https://api.themoviedb.org/3/tv/'+id+'/reviews?api_key='+constants.Unique_API_KEY+'&language=en-US&page=1';
    const TV_CAST='https://api.themoviedb.org/3/tv/'+id+'/credits?api_key='+constants.Unique_API_KEY+'&language=en-US&page=1';
    const TV_VIDEO='https://api.themoviedb.org/3/tv/'+id+'/videos?api_key='+constants.Unique_API_KEY+'&language=en-US&page=1';
    const SIMILAR_TV='https://api.themoviedb.org/3/tv/'+id+'/similar?api_key='+constants.Unique_API_KEY+'&language=en-US&page=1';
    const RECOMMENDED_TV='https://api.themoviedb.org/3/tv/'+id+'/recommendations?api_key='+constants.Unique_API_KEY+'&language=en-US&page=1';






    let one =TV_DETAILS;
    let two=TV_REVIEWS;
    let three=TV_CAST;
    let four=TV_VIDEO;
    let five=SIMILAR_TV;
    let six=RECOMMENDED_TV;


    const requestOne=axios.get(one);
    const requestTwo=axios.get(two);
    const requestThree=axios.get(three);
    const requestFour=axios.get(four);
    const requestFive=axios.get(five);
    const requestSix=axios.get(six);*/

  await axios
    .get(cast_details)
    .then((data) => {

      const response = data.data;

      response["profile_path"] =
        constants.image_pre + data.data["profile_path"];

     

      res.send(response);
    })
    .catch((errors) => {
      console.error(errors);
    });
});

app.get("/cast_external/:id", async (req, res) => {
  var id = req.params.id;
  const cast_ids =
    "https://api.themoviedb.org/3/person/" +
    id +
    "/external_ids?api_key=" +
    constants.Unique_API_KEY +
    "&language=en-US&page=1";
  await axios
    .get(cast_ids)
    .then((data) => {
      res.send(data.data);
    })
    .catch((errors) => {
      console.error(errors);
    });
});

app.get("/multi_search/:query", async (req, res) => {
  var query = req.params.query;
  const multi_search =
    "https://api.themoviedb.org/3/search/multi?api_key=" +
    constants.Unique_API_KEY +
    "&language=en-US&query=" +
    query;
  
  await axios
    .get(multi_search)
    .then((data) => {
      
      var search_results = data.data.results;
      var main_result = [];
      for (let i = 0; i < search_results.length; i++) {
        /*var link = constants.image_pre + search_results[i]["poster_path"];*/
        if(search_results[i]['media_type'] =='tv' || search_results[i]['media_type']=='movie'){
          
         var link='';
        if(search_results[i]['poster_path']==null || search_results[i]['poster_path']==undefined){
            link=constants.default_poster;
          }
          else{
            link = constants.image_pre + search_results[i]["poster_path"];
          }
        search_results[i]["poster_path"] = link;

        main_result.push(search_results[i]);
        }
      }
      
      var first_seven=main_result.slice(0,7);
      res.send(first_seven);
    })
    .catch((errors) => {
      console.error(errors);
    });
});

app.use("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "FrontendBuild/index.html"));
});

app.listen(PORT, (req, res) => {
  console.log("server running on port" + PORT);
});

module.exports = app;
