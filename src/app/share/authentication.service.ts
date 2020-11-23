import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
providedIn: 'root',
})
export class AuthenticationService {
//Header para afirmar el tipo de contenido JSON
//URL del API
ServerUrl = environment.apiURL;
//Variable observable para gestionar la información del usuario, con características especiales
private currentUserSubject: BehaviorSubject<any>;
//Variable observable para gestionar la información del usuario
public currentUser: Observable<any>;
//Booleano para estado de usuario autenticado
private authenticated = new BehaviorSubject<boolean>(false);

private admin = new BehaviorSubject<boolean>(false);

private vendedor = new BehaviorSubject<boolean>(false);
//Inyectar cliente HTTP para las solicitudes al API
constructor(private http: HttpClient) {
//Obtener los datos del usuario en localStorage, si existe
this.currentUserSubject = new BehaviorSubject<any>(
JSON.parse(localStorage.getItem('currentUser'))
);
//Establecer un observable para acceder a los datos del usuario
this.currentUser = this.currentUserSubject.asObservable();
}
//Obtener el valor del usuario actual
public get currentUserValue(): any {
return this.currentUserSubject.value;
}


//Establecer booleano verificando si esta autenticado
get isAuthenticated() {
if (this.currentUserValue != null) {
this.authenticated.next(true);
}
return this.authenticated.asObservable();
}
//Crear usuario
createUser(user: any): Observable<any> {
return this.http.post<any>(
this.ServerUrl + 'auth/register?',
user
);
}

//Establecer boolena esAdmin
get esAdmin() {
  if(this.currentUserValue !=null){
    if (this.currentUserValue.usuario['rol_id']==1) {
      this.admin.next(true);
      this.vendedor.next(false);
    }
  }
  return this.admin.asObservable();
  }

  get esVendedor() {
    if(this.currentUserValue !=null){
      if (this.currentUserValue.usuario['rol_id']==2) {
        this.vendedor.next(true);
        this.admin.next(false);
      }
    }
    return this.vendedor.asObservable();
    }

//Login
loginUser(user: any): Observable<any> {
  return this.http
  .post<any>(this.ServerUrl + 'auth/login', user)
  .pipe(
  map((user) => {
  // almacene los detalles del usuario y el token jwt
  // en el almacenamiento local para mantener al usuario conectado entre las actualizaciones de la página
  localStorage.setItem('currentUser', JSON.stringify(user));
  this.authenticated.next(true);
  this.currentUserSubject.next(user);
  if (this.currentUserValue.usuario['rol_id']==1) {
    this.admin.next(true);
    this.vendedor.next(false);
  }
  else{
    if (this.currentUserValue.usuario['rol_id']==2) {
      this.vendedor.next(true);
      this.admin.next(false);
    }
    else{
      this.admin.next(false);
      this.vendedor.next(false);
    }
  }

  return user;
  })
  );
  }
  //Logout de usuario autentificado
  logout() {
  let usuario = this.currentUserSubject.value;
  if (usuario) {
  // eliminar usuario del almacenamiento local para cerrar la sesión del usuario
  localStorage.removeItem('currentUser');
  //Eliminarlo del observable del usuario actual
  this.currentUserSubject.next(null);
  //Eliminarlo del observable del boleano si esta autenticado
  this.authenticated.next(false);
  this.admin.next(false);
  this.vendedor.next(false);
  return this.http.post<any>(this.ServerUrl + '/', {});
  }
  }
  }
