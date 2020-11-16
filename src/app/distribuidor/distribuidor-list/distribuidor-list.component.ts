import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-distribuidor-list',
  templateUrl: './distribuidor-list.component.html',
  styleUrls: ['./distribuidor-list.component.css']
})
export class DistribuidorListComponent implements OnInit {

 datos; any;
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
      private gService: GenericService,
      private router: Router,
      private route: ActivatedRoute,
      private notification:NotificacionService,
      ) {
        this.listaDistribuidors();
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
          this.notification.mensaje('Distribuidor', 'Distribuidor agregada con exito', 'success');
        }
      }

    listaDistribuidors(){
      this.gService.list('distribuidor/').pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
        console.log(data);
        this.datos=data;
      });
    }

    crearDistribuidor() {
      this.router.navigate(['/distribuidor/create'], {
        relativeTo: this.route,
      });
    }
}
