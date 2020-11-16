import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarcaRoutingModule } from './marca-routing.module';
import { MarcaCreateComponent } from './marca-create/marca-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarcaListComponent } from './marca-list/marca-list.component';

@NgModule({
  declarations: [MarcaCreateComponent, MarcaListComponent],
  imports: [
    CommonModule,
    MarcaRoutingModule, FormsModule, ReactiveFormsModule
  ]
})
export class MarcaModule { }
