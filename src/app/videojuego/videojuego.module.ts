import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideojuegoRoutingModule } from './videojuego-routing.module';
import { VideojuegoIndexComponent } from './videojuego-index/videojuego-index.component';
import { VideojuegoListComponent } from './videojuego-list/videojuego-list.component';
import { VideojuegoShowComponent } from './videojuego-show/videojuego-show.component';
import { VideojuegoCreateComponent } from './videojuego-create/videojuego-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [VideojuegoIndexComponent, VideojuegoListComponent, VideojuegoShowComponent, VideojuegoCreateComponent,],
  imports: [
    CommonModule,
    VideojuegoRoutingModule,FormsModule,ReactiveFormsModule
  ]
})
export class VideojuegoModule { }
