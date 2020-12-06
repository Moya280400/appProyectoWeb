import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacturaListComponent } from './factura-list/factura-list.component';
import { FacturaShowComponent } from './factura-show/factura-show.component';

const routes: Routes = [
  { path: 'factura', component: FacturaListComponent },
  { path: 'factura/:id', component: FacturaShowComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }
