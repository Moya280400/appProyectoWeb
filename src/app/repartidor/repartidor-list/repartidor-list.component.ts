import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-repartidor-list',
  templateUrl: './repartidor-list.component.html',
  styleUrls: ['./repartidor-list.component.css']
})
export class RepartidorListComponent implements OnInit {

  datos; any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private gService: GenericService,
    private notification:NotificacionService,
    ) {
      this.listaRepartidores();
    }

  ngOnInit(): void {
  }

  listaRepartidores(){
    this.gService.list('repartidor/').pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
      console.log(data);
      this.datos=data;
    });
  }

}
