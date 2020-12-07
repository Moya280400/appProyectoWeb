import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-repartidor-list',
  templateUrl: './repartidor-list.component.html',
  styleUrls: ['./repartidor-list.component.css']
})
export class RepartidorListComponent implements OnInit {

  datos; any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotificacionService,
  ) {
    this.listaRepartidores();
  }

  ngOnInit(): void {
    this.mensajes();
  }
  mensajes() {
    let crear = true;
    let actualizar = true;
    //Obtener parametros de la URL
    this.route.queryParams.subscribe((params => {
      //Le indico que si no lo encuentra coloquelo como falso
      console.log(params.crear);
      crear = params.crear || false;
      actualizar = params.actualizar || false;
    }))

    if (crear) {
      this.notification.mensaje('Repartidor', 'Repartidor agregado con exito', 'success');
    }
    if (actualizar) {
      this.notification.mensaje('Repartidor', 'Repartidor actualizado con exito', 'success');
    }
  }
  listaRepartidores() {
    this.gService.list('repartidor/').pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.datos = data;
      for (const item of data) {
        let estadoVar = item.estado ? 'Activo' : 'Inactivo';
        item.estado = estadoVar;
      }
    });
  }
  actualizarRepartidor(id: number) {
    this.router.navigate(['/repartidor/update', id], {
      relativeTo: this.route,
    });
  }
  crearRepartidor() {
    this.router.navigate(['/repartidor/create'], {
      relativeTo: this.route,
    });
  }
}
