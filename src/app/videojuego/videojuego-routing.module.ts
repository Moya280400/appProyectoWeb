import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../share/auth-guard.service';
import { RolGuardService } from '../share/rol-guard.service';
import { VideojuegoCreateComponent } from './videojuego-create/videojuego-create.component';
import { VideojuegoIndexComponent } from './videojuego-index/videojuego-index.component';
import { VideojuegoListComponent } from './videojuego-list/videojuego-list.component';
import { VideojuegoShowComponent } from './videojuego-show/videojuego-show.component';
import { VideojuegoUpdateComponent } from './videojuego-update/videojuego-update.component';

const routes: Routes = [
  { path: 'videojuego/index', component: VideojuegoIndexComponent },
  { path: 'videojuego/list', component: VideojuegoListComponent,canActivate:[AuthGuardService,RolGuardService],data:{roles:[1]}},
  { path: 'videojuego/create', component: VideojuegoCreateComponent,canActivate:[AuthGuardService,RolGuardService],data:{roles:[1]}},
  { path: 'videojuego/:id', component: VideojuegoShowComponent},
  { path: 'videojuego/update/:id', component: VideojuegoUpdateComponent,canActivate:[AuthGuardService,RolGuardService],data:{roles:[1]}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideojuegoRoutingModule { }
