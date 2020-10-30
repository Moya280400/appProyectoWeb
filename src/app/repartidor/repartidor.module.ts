import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepartidorRoutingModule } from './repartidor-routing.module';
import { RepartidorListComponent } from './repartidor-list/repartidor-list.component';
import {RepartidorShowComponent} from './repartidor-show/repartidor-show.component';

@NgModule({
  declarations: [RepartidorListComponent, RepartidorShowComponent],
  imports: [
    CommonModule,
    RepartidorRoutingModule
  ]
})
export class RepartidorModule { }
