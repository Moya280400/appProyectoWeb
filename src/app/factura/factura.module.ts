import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturaRoutingModule } from './factura-routing.module';
import { FacturaListComponent } from './factura-list/factura-list.component';
import { FacturaShowComponent } from './factura-show/factura-show.component';


@NgModule({
  declarations: [FacturaListComponent, FacturaShowComponent],
  imports: [
    CommonModule,
    FacturaRoutingModule
  ]
})
export class FacturaModule { }
