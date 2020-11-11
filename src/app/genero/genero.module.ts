import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneroRoutingModule } from './genero-routing.module';
import { GeneroCreateComponent } from './genero-create/genero-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneroListComponent } from './genero-list/genero-list.component';


@NgModule({
  declarations: [GeneroCreateComponent, GeneroListComponent],
  imports: [
    CommonModule,
    GeneroRoutingModule,FormsModule,ReactiveFormsModule
  ]
})
export class GeneroModule { }
