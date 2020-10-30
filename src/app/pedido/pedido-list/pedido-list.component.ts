import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.css']
})
export class PedidoListComponent implements OnInit {

  datos; any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private gService: GenericService,
    private notification:NotificacionService,
    ) {
      this.listaPedidos();
    }

  ngOnInit(): void {
  }

  listaPedidos(){
    this.gService.list('pedido/').pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
      console.log(data);
      this.datos=data;
    });
  }

}
