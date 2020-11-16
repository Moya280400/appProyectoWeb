import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesarrolladorRoutingModule } from './desarrollador-routing.module';
import { DesarrolladorCreateComponent } from './desarrollador-create/desarrollador-create.component';
import { DesarrolladorListComponent } from './desarrollador-list/desarrollador-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DesarrolladorCreateComponent, DesarrolladorListComponent],
  imports: [
    CommonModule,
    DesarrolladorRoutingModule,FormsModule, ReactiveFormsModule
  ]
})
export class DesarrolladorModule { }
