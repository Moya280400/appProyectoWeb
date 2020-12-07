import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneroCreateComponent } from './genero-create/genero-create.component';
import { GeneroListComponent } from './genero-list/genero-list.component';

const routes: Routes = [
  //{ path: 'genero/create', component: GeneroCreateComponent},
  //{ path: 'genero', component: GeneroListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneroRoutingModule { }
