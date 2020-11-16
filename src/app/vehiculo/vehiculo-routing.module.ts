import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehiculoCreateComponent } from './vehiculo-create/vehiculo-create.component';
import { VehiculoListComponent } from './vehiculo-list/vehiculo-list.component';


const routes: Routes = [  //Rutas a utilizar
  { path: 'vehiculo/create', component: VehiculoCreateComponent },
  { path: 'vehiculo', component: VehiculoListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculoRoutingModule { }
