import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarcaCreateComponent } from './marca-create/marca-create.component';

const routes: Routes = [
  { path: 'marca/create', component: MarcaCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarcaRoutingModule { }
