import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartService } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-videojuego-index',
  templateUrl: './videojuego-index.component.html',
  styleUrls: ['./videojuego-index.component.css']
})
export class VideojuegoIndexComponent implements OnInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  infoVideojuego: any;
  esVendedor:boolean;
  currentUser: any;
  constructor(
    private authService: AuthenticationService,
    private gService: GenericService,
    private notificacion: NotificacionService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {
    this.listaVideojuegos();
  }

  ngOnInit(): void {

    this.authService.currentUser.subscribe((x) => (this.currentUser = x));

    this.authService.esVendedor.subscribe(
      (valor) => (this.esVendedor = valor)
    );
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
  listaVideojuegos() {
    this.gService.list('videojuego/getVideojuegoActivo').pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      console.log(data);
      this.datos = data;
    });
  }
  agregarProducto(id: number) {
    this.gService
      .get('videojuego', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.infoVideojuego = data;
        this.cartService.addToCart(this.infoVideojuego);
        this.notificacion.mensaje(
          'Orden',
          'Videojuegos agregado a la orden',
          'success'
        );
      });
  }
}
