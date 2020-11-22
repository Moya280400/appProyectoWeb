import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepartidorRoutingModule } from './repartidor-routing.module';
import { RepartidorListComponent } from './repartidor-list/repartidor-list.component';
import { RepartidorCreateComponent } from './repartidor-create/repartidor-create.component';
import { RepartidorShowComponent } from './repartidor-show/repartidor-show.component';
import { RepartidorUpdateComponent } from './repartidor-update/repartidor-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RepartidorListComponent, RepartidorShowComponent, RepartidorCreateComponent, RepartidorUpdateComponent],
  imports: [
    CommonModule,
    RepartidorRoutingModule, FormsModule, ReactiveFormsModule
  ]
})
export class RepartidorModule { }
