import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideojuegoIndexComponent } from './videojuego-index/videojuego-index.component';
import { VideojuegoListComponent } from './videojuego-list/videojuego-list.component';
import { VideojuegoShowComponent } from './videojuego-show/videojuego-show.component';

const routes: Routes = [
  { path: 'videojuego/index', component: VideojuegoIndexComponent },
  { path: 'videojuego/list', component: VideojuegoListComponent },
  { path: 'videojuego/:id', component: VideojuegoShowComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideojuegoRoutingModule { }
