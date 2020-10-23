import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { UsuarioIndexComponent } from './usuario-index/usuario-index.component';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
const routes: Routes = [
  //Rutas a utilizar
  { path: 'usuario/login', component: UsuarioLoginComponent },
  { path: 'usuario/register', component: UsuarioCreateComponent},
];
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule],
})
export class UsuarioRoutingModule {}
