import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './character/character-list/character-list.component';
import { EpisodeListComponent } from './episode/episode-list/episode-list.component';
import { EpisodeDetailComponent } from './episode/episode-detail/episode-detail.component';
import { CharacterDetailComponent } from './character/character-detail/character-detail.component';

const routes: Routes = [
  {
    path:"",
    component: CharacterListComponent
  },
  {
    path:"inicio",
    component: CharacterListComponent
  },
  {
    path:"episodes",
    component: EpisodeListComponent
  },
  {
    path:"episode",
    children:[
      {
        path:":id",
        component: EpisodeDetailComponent
      }
    ]
  },
  {
    path:"character",
    children:[
      {
        path:":id",
        component: CharacterDetailComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
