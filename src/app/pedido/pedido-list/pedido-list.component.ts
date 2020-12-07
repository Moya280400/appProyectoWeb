import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute, } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.css']
})
export class PedidoListComponent implements OnInit {

  esBodeguero:boolean;
  datos; any;
  currentUser: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private gService: GenericService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private notification:NotificacionService,
    ) {
      this.listaPedidos();
    }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));


    this.authService.esBodeguero.subscribe(
      (valor) => (this.esBodeguero = valor)
    );
    this.mensajes();

  }

  listaPedidos(){
    this.gService.list('pedido/').pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
      console.log(data);
      this.datos=data;
    });
  }
    mensajes() {
    let actualizar = true;
    //Obtener parametros de la URL
    this.route.queryParams.subscribe((params => {
      //Le indico que si no lo encuentra coloquelo como falso
      actualizar = params.actualizar || false;
    }))

    if (actualizar) {
      this.notification.mensaje('Pedido', 'Pedido actualizado con exito', 'success');
    }
  }
  cambiarEstado(id: number) {
    this.router.navigate(['/pedido/update', id], {
      relativeTo: this.route,
    });
  }

}
