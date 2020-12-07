import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate,Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RolGuardService implements CanActivate {

  constructor(private auth:AuthenticationService,private router:Router) { }

  canActivate(route:ActivatedRouteSnapshot):boolean{
    //Info actual usuario
    var end = true;
    var cont = 0;
    let currentUser:any;
    this.auth.currentUser.subscribe((x)=>(currentUser=x));
    //Recibir la config. de ruta, propiedad de datos
    const roles = route.data['roles'] as Array<any>;

    //roles.forEach(element => {
      //if(end){
        if (!currentUser || currentUser.usuario.rol_id!=roles[0]) {
          if (!currentUser || currentUser.usuario.rol_id!=roles[1]) {
            this.router.navigate(['/'],{queryParams:{authError:'true'}});
            return false;
          }
        }
    return true;
  }
}
