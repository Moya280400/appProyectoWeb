import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarcaRoutingModule } from './marca-routing.module';
import { MarcaCreateComponent } from './marca-create/marca-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MarcaCreateComponent],
  imports: [
    CommonModule,
    MarcaRoutingModule, FormsModule, ReactiveFormsModule
  ]
})
export class MarcaModule { }
