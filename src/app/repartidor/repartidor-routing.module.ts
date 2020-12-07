import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepartidorListComponent } from './repartidor-list/repartidor-list.component';
import { RepartidorCreateComponent } from './repartidor-create/repartidor-create.component';
import { RolGuardService } from '../share/rol-guard.service';
import { RepartidorShowComponent } from './repartidor-show/repartidor-show.component';
import { RepartidorUpdateComponent } from './repartidor-update/repartidor-update.component';
import { AuthGuardService } from '../share/auth-guard.service';

const routes: Routes = [
  { path: 'repartidor', component: RepartidorListComponent,canActivate:[AuthGuardService,RolGuardService],data:{roles:[1]}},
  { path: 'repartidor/create', component: RepartidorCreateComponent,canActivate:[AuthGuardService,RolGuardService],data:{roles:[1]}},
  { path: 'repartidor/update/:id', component: RepartidorUpdateComponent,canActivate:[AuthGuardService,RolGuardService],data:{roles:[1]}},
  { path: 'repartidor/:id', component: RepartidorShowComponent,canActivate:[AuthGuardService,RolGuardService],data:{roles:[1]}},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RepartidorRoutingModule { }
