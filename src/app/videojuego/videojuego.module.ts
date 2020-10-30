import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideojuegoRoutingModule } from './videojuego-routing.module';
import { VideojuegoIndexComponent } from './videojuego-index/videojuego-index.component';
import { VideojuegoListComponent } from './videojuego-list/videojuego-list.component';
import { VideojuegoShowComponent } from './videojuego-show/videojuego-show.component';



@NgModule({
  declarations: [VideojuegoIndexComponent, VideojuegoListComponent, VideojuegoShowComponent],
  imports: [
    CommonModule,
    VideojuegoRoutingModule
  ]
})
export class VideojuegoModule { }
