import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepartidorListComponent } from './repartidor-list/repartidor-list.component';
import { RepartidorCreateComponent } from './repartidor-create/repartidor-create.component';
import { RepartidorShowComponent } from './repartidor-show/repartidor-show.component';
import { RepartidorUpdateComponent } from './repartidor-update/repartidor-update.component';

const routes: Routes = [
  { path: 'repartidor', component: RepartidorListComponent },
  { path: 'repartidor/create', component: RepartidorCreateComponent },
  { path: 'repartidor/update/:id', component: RepartidorUpdateComponent },
  { path: 'repartidor/:id', component: RepartidorShowComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RepartidorRoutingModule { }
