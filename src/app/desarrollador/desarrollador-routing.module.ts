import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesarrolladorCreateComponent } from './desarrollador-create/desarrollador-create.component';
import { DesarrolladorListComponent } from './desarrollador-list/desarrollador-list.component';

const routes: Routes = [
  { path: 'desarrollador/create', component: DesarrolladorCreateComponent},
  { path: 'desarrollador', component: DesarrolladorListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesarrolladorRoutingModule { }
