import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarcaCreateComponent } from './marca-create/marca-create.component';
import { MarcaListComponent } from './marca-list/marca-list.component';

const routes: Routes = [
  //{ path: 'marca_vehiculo/create', component: MarcaCreateComponent },
  //{ path: 'marca', component: MarcaListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarcaRoutingModule { }
