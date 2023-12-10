import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './character/character-list/character-list.component';

const routes: Routes = [
  {
    path:"",
    component: CharacterListComponent
  },
  {
    path:"inicio",
    component: CharacterListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
