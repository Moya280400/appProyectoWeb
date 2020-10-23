import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteCreateComponent } from './cliente-create/cliente-create.component';

const routes: Routes = [
  { path: 'cliente/register', component: ClienteCreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
