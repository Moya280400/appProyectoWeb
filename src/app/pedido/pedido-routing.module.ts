import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidoListComponent } from './pedido-list/pedido-list.component';
import { PedidoShowComponent } from './pedido-show/pedido-show.component';

const routes: Routes = [
  { path: 'pedido', component: PedidoListComponent },
  { path: 'pedido/:id', component: PedidoShowComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
