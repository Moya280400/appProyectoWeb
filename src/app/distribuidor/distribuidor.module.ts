import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistribuidorRoutingModule } from './distribuidor-routing.module';
import { DistribuidorListComponent } from './distribuidor-list/distribuidor-list.component';
import { DistribuidorCreateComponent } from './distribuidor-create/distribuidor-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DistribuidorListComponent, DistribuidorCreateComponent],
  imports: [
    CommonModule,
    DistribuidorRoutingModule, FormsModule, ReactiveFormsModule
  ]
})
export class DistribuidorModule { }
