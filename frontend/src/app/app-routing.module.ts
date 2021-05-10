import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MovieModalComponent} from './components/movie-modal/movie-modal.component';
import {TVModalComponent} from './components/tvmodal/tvmodal.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import {WatchlistComponent} from './components/watchlist/watchlist.component';


const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path:'watch/movie/:id', component: MovieModalComponent},
  {path:'watch/tv/:id', component: TVModalComponent},
  {path:'mylist', component: WatchlistComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
