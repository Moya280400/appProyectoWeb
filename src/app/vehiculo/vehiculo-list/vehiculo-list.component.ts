import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-vehiculo-list',
  templateUrl: './vehiculo-list.component.html',
  styleUrls: ['./vehiculo-list.component.css']
})
export class VehiculoListComponent implements OnInit {

  datos; any;
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
      private gService: GenericService,
      private router: Router,
      private route: ActivatedRoute,
      private notification:NotificacionService,
      ) {
        this.listaVehiculos();
      }

      ngOnInit(): void {
        this.mensajes();
      }
      mensajes() {
        let crear = true;
        //Obtener parametros de la URL
        this.route.queryParams.subscribe((params => {
          //Le indico que si no lo encuentra coloquelo como falso
          console.log(params.crear);
          crear = params.crear || false;
        }))

        if (crear) {
          this.notification.mensaje('Vehiculo', 'Vehiculo agregado con exito', 'success');
        }
      }

    listaVehiculos(){
      this.gService.list('vehiculo/').pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
        console.log(data);
        this.datos=data;
      });
    }

    crearVehiculo() {
      this.router.navigate(['/vehiculo/create'], {
        relativeTo: this.route,
      });
    }
  }
