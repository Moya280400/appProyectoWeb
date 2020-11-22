import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidoRoutingModule } from './pedido-routing.module';
import { PedidoListComponent } from './pedido-list/pedido-list.component';
import { PedidoShowComponent } from './pedido-show/pedido-show.component';
import { PedidoIndexComponent } from './pedido-index/pedido-index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PedidoListComponent, PedidoShowComponent, PedidoIndexComponent],
  imports: [
    CommonModule,
    PedidoRoutingModule,
    ReactiveFormsModule,FormsModule
  ]
})
export class PedidoModule { }
