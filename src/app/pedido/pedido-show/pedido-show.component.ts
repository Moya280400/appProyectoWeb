import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedido-show',
  templateUrl: './pedido-show.component.html',
  styleUrls: ['./pedido-show.component.css']
})
export class PedidoShowComponent implements OnInit {

  datos; any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private gService: GenericService,
    private notification: NotificacionService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    //Obtener el id del repartidor
    let id = +this.route.snapshot.paramMap.get('id');
    //Obtener el pedido
    this.obtenerPedido(id);
    console.log(this.datos)
  }

  obtenerPedido(id: any) {
    this.gService.get('pedido', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
      })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }


}
