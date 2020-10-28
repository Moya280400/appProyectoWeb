import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepartidorRoutingModule } from './repartidor-routing.module';
import { RepartidorListComponent } from './repartidor-list/repartidor-list.component';


@NgModule({
  declarations: [RepartidorListComponent],
  imports: [
    CommonModule,
    RepartidorRoutingModule
  ]
})
export class RepartidorModule { }
