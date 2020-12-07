import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacturaListComponent } from './factura-list/factura-list.component';
import { FacturaShowComponent } from './factura-show/factura-show.component';
import { RolGuardService } from '../share/rol-guard.service';

const routes: Routes = [
  { path: 'factura', component: FacturaListComponent,canActivate:[RolGuardService],data:{roles:[1]}},
  { path: 'factura/:id', component: FacturaShowComponent,canActivate:[RolGuardService],data:{roles:[1]} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }
