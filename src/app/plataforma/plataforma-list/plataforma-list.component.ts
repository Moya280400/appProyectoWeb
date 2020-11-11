import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-plataforma-list',
  templateUrl: './plataforma-list.component.html',
  styleUrls: ['./plataforma-list.component.css']
})
export class PlataformaListComponent implements OnInit {
  datos; any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute,
    private notification:NotificacionService,
    ) {
      this.listaPlataformas();
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
        this.notification.mensaje('Plataforma', 'Plataforma agregada con exito', 'success');
      }
    }

  listaPlataformas(){
    this.gService.list('plataforma/').pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
      for (const item of data) {
       let estadoVar= item.estado? 'Activo':'Inactivo';
       item.estado=estadoVar;
      }
      console.log(data);
      this.datos=data;
    });
  }

  crearPlataforma() {
    this.router.navigate(['/plataforma/create'], {
      relativeTo: this.route,
    });
  }
}
