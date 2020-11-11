import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlataformaCreateComponent } from './plataforma-create/plataforma-create.component';
import { PlataformaListComponent } from './plataforma-list/plataforma-list.component';

const routes: Routes = [
  { path: 'plataforma', component: PlataformaListComponent},
  { path: 'plataforma/create', component: PlataformaCreateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlataformaRoutingModule { }
