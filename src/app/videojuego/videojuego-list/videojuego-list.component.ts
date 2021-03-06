import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-videojuego-list',
  templateUrl: './videojuego-list.component.html',
  styleUrls: ['./videojuego-list.component.css']
})
export class VideojuegoListComponent implements OnInit {
  datos; any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotificacionService,
  ) {
    this.listaVideojuegos();
  }

  ngOnInit(): void {
    this.mensajes();
  }

  listaVideojuegos() {
    this.gService.list('videojuego/').pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      for (const item of data) {
        let estadoVar = item.estado ? 'Activo' : 'Inactivo';
        item.estado = estadoVar;
      }
      console.log(data);
      this.datos = data;
    });
  }
  mensajes() {
    let crear = true;
    let actualizar=true;
    //Obtener parametros de la URL
    this.route.queryParams.subscribe((params => {
      //Le indico que si no lo encuentra coloquelo como falso
      console.log(params.crear);
      crear = params.crear || false;
      actualizar = params.actualizar || false;
    }))

    if (crear) {
      this.notification.mensaje('Videojuego', 'Videojuego agregado con exito', 'success');
    }
    if (actualizar) {
      this.notification.mensaje('Videojuego', 'Videojuego actualizado con exito', 'success');
    }
  }
  actualizarVideojuego(id: number) {
    this.router.navigate(['/videojuego/update', id], {
      relativeTo: this.route,
    });
  }
  crearVideojuego() {
    this.router.navigate(['/videojuego/create'], {
      relativeTo: this.route,
    });
  }
}
