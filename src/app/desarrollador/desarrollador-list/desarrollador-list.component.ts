import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-desarrollador-list',
  templateUrl: './desarrollador-list.component.html',
  styleUrls: ['./desarrollador-list.component.css']
})
export class DesarrolladorListComponent implements OnInit {
  datos; any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute,
    private notification:NotificacionService,
    ) {
      this.listaDesarrolladores();
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
        this.notification.mensaje('Desarrollador', 'Desarrollador agregado con exito', 'success');
      }
    }

  listaDesarrolladores(){
    this.gService.list('desarrollador/').pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
      console.log(data);
      this.datos=data;
    });
  }

  crearDesarrollador() {
    this.router.navigate(['/desarrollador/create'], {
      relativeTo: this.route,
    });
  }
}
