import { Component, OnInit } from '@angular/core';
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
    private notification:NotificacionService,
    ) {
      this.listaVideojuegos();
    }

  ngOnInit(): void {
  }

  listaVideojuegos(){
    this.gService.list('videojuego/').pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
      for (const item of data) {
       let estadoVar= item.estado? 'Activo':'Inactivo';
       item.estado=estadoVar;
      }
      console.log(data);
      this.datos=data;
    });
  }
}
