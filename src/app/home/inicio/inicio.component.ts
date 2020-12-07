import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService } from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css', './ribbonInicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private authService: AuthenticationService,
    private notificacion: NotificacionService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.mensajes();
  }

  mensajes() {
    let login = false;
    let crear = false;
    let authError=false;
    //Obtener parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      login = params.login || false;
      crear = params.crear || false;
      authError=params.authError||false;
    });

    if (crear) {
      this.notificacion.mensaje(
        '',
        'Agregado con exito',
        'success'
      );

    }
    if (login) {
      this.notificacion.mensaje(
        'Usuario',
        'Iniciado con exito',
        'success'
      );
    }

    if (authError) {
      this.notificacion.mensaje(
        'Usuario',
        'Usuario no autorizado para ingresar al recurso',
        'warning'
      );

    }
  }
}
