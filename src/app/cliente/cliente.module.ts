import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteCreateComponent } from './cliente-create/cliente-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClienteCreateComponent],
  imports: [
    CommonModule,
    ClienteRoutingModule,FormsModule,ReactiveFormsModule
  ]
})
export class ClienteModule { }
