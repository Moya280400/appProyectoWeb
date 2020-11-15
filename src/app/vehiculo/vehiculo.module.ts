import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculoRoutingModule } from './vehiculo-routing.module';
import { VehiculoCreateComponent } from './vehiculo-create/vehiculo-create.component';


@NgModule({
  declarations: [VehiculoCreateComponent],
  imports: [
    CommonModule,
    VehiculoRoutingModule
  ]
})
export class VehiculoModule { }
