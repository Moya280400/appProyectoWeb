import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-genero-list',
  templateUrl: './genero-list.component.html',
  styleUrls: ['./genero-list.component.css']
})
export class GeneroListComponent implements OnInit {

  datos; any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private notification:NotificacionService,

    ) {
      this.listaRepartidores();
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
      this.notification.mensaje('Genero', 'Genero agregado con exito', 'success');
    }
  }

  listaRepartidores(){
    this.gService.list('genero/').pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{

      this.datos=data;
    });
  }
  crearGenero() {
    this.router.navigate(['/genero/create'], {
      relativeTo: this.route,
    });
  }

}
