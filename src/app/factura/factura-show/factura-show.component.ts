import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-factura-show',
  templateUrl: './factura-show.component.html',
  styleUrls: ['./factura-show.component.css']
})
export class FacturaShowComponent implements OnInit {

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
    this.obtenerFactura(id);

  }

  obtenerFactura(id: any) {
    this.gService.get('factura', id)
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
