import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepartidorListComponent } from './repartidor-list/repartidor-list.component';
import { RepartidorShowComponent } from './repartidor-show/repartidor-show.component';

const routes: Routes = [
  { path: 'repartidor', component: RepartidorListComponent },
  {  path: 'repartidor/:id', component: RepartidorShowComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RepartidorRoutingModule { }
