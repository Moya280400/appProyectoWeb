import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideojuegoCreateComponent } from './videojuego-create/videojuego-create.component';
import { VideojuegoIndexComponent } from './videojuego-index/videojuego-index.component';
import { VideojuegoListComponent } from './videojuego-list/videojuego-list.component';
import { VideojuegoShowComponent } from './videojuego-show/videojuego-show.component';
import { VideojuegoUpdateComponent } from './videojuego-update/videojuego-update.component';

const routes: Routes = [
  { path: 'videojuego/index', component: VideojuegoIndexComponent },
  { path: 'videojuego/list', component: VideojuegoListComponent },
  { path: 'videojuego/create', component: VideojuegoCreateComponent },
  { path: 'videojuego/:id', component: VideojuegoShowComponent },
  { path: 'videojuego/update/:id', component: VideojuegoUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideojuegoRoutingModule { }
