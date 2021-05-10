import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { MovieModalComponent } from './components/movie-modal/movie-modal.component';
import { TVModalComponent } from './components/tvmodal/tvmodal.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { CarouselComponent } from './components/carousel/carousel.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';






@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    MovieModalComponent,
    TVModalComponent,
    CarouselComponent,
    SlideshowComponent,
    WatchlistComponent,
    FooterComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    RouterModule,
    YouTubePlayerModule,
    PerfectScrollbarModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent] /*Calling app component.ts file*/
})/*Configuration for class AppModule*/
export class AppModule{
}


