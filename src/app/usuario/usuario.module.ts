import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { UsuarioIndexComponent } from './usuario-index/usuario-index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UsuarioCreateComponent, UsuarioLoginComponent, UsuarioIndexComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,FormsModule,ReactiveFormsModule
  ]
})
export class UsuarioModule { }
