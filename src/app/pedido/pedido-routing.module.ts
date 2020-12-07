import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../share/auth-guard.service';
import { RolGuardService } from '../share/rol-guard.service';
import { PedidoIndexComponent } from './pedido-index/pedido-index.component';
import { PedidoListComponent } from './pedido-list/pedido-list.component';
import { PedidoShowComponent } from './pedido-show/pedido-show.component';
import { PedidoUpdateComponent } from './pedido-update/pedido-update.component';

const routes: Routes = [
  { path: 'pedido', component: PedidoListComponent,canActivate:[RolGuardService],data:{roles:[1,3]}},
  { path: 'pedido/index', component: PedidoIndexComponent,canActivate:[AuthGuardService,RolGuardService],data:{roles:[2]}},
  { path: 'pedido/:id', component: PedidoShowComponent,canActivate:[RolGuardService],data:{roles:[1,3]}},
  { path: 'pedido/update/:id', component: PedidoUpdateComponent,canActivate:[AuthGuardService,RolGuardService],data:{roles:[1,3]}},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
