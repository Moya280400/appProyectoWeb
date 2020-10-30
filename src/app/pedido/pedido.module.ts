import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidoRoutingModule } from './pedido-routing.module';
import { PedidoListComponent } from './pedido-list/pedido-list.component';
import { PedidoShowComponent } from './pedido-show/pedido-show.component';


@NgModule({
  declarations: [PedidoListComponent, PedidoShowComponent],
  imports: [
    CommonModule,
    PedidoRoutingModule
  ]
})
export class PedidoModule { }
