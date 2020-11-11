import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlataformaRoutingModule } from './plataforma-routing.module';
import { PlataformaListComponent } from './plataforma-list/plataforma-list.component';
import { PlataformaCreateComponent } from './plataforma-create/plataforma-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PlataformaListComponent, PlataformaCreateComponent],
  imports: [
    CommonModule,
    PlataformaRoutingModule,FormsModule,ReactiveFormsModule
  ]
})
export class PlataformaModule { }
