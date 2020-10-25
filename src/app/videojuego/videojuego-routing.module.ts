import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideojuegoIndexComponent } from './videojuego-index/videojuego-index.component';

const routes: Routes = [
  { path: 'videojuego/index', component: VideojuegoIndexComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideojuegoRoutingModule { }
