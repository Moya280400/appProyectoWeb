import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DistribuidorCreateComponent } from './distribuidor-create/distribuidor-create.component';
import { DistribuidorListComponent } from './distribuidor-list/distribuidor-list.component';
const routes: Routes = [
    //{ path: 'distribuidor/create', component: DistribuidorCreateComponent },
    //{ path: 'distribuidor', component: DistribuidorListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistribuidorRoutingModule { }
