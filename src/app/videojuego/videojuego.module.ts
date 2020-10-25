import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideojuegoRoutingModule } from './videojuego-routing.module';
import { VideojuegoIndexComponent } from './videojuego-index/videojuego-index.component';


@NgModule({
  declarations: [VideojuegoIndexComponent],
  imports: [
    CommonModule,
    VideojuegoRoutingModule
  ]
})
export class VideojuegoModule { }
