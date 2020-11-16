import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-marca-list',
  templateUrl: './marca-list.component.html',
  styleUrls: ['./marca-list.component.css']
})
export class MarcaListComponent implements OnInit {
    datos; any;
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
      private gService: GenericService,
      private router: Router,
      private route: ActivatedRoute,
      private notification:NotificacionService,
      ) {
        this.listaMarcas();
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
          this.notification.mensaje('Marca', 'Marca agregada con exito', 'success');
        }
      }

    listaMarcas(){
      this.gService.list('marca_vehiculo/').pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
        console.log(data);
        this.datos=data;
      });
    }

    crearMarca() {
      this.router.navigate(['/marca_vehiculo/create'], {
        relativeTo: this.route,
      });
    }
  }
