import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculoRoutingModule } from './vehiculo-routing.module';
import { VehiculoCreateComponent } from './vehiculo-create/vehiculo-create.component';
import { VehiculoListComponent } from './vehiculo-list/vehiculo-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [VehiculoCreateComponent, VehiculoListComponent],
  imports: [
    CommonModule,
    VehiculoRoutingModule,FormsModule, ReactiveFormsModule
  ]
})
export class VehiculoModule { }
