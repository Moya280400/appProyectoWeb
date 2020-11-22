import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, ItemCart } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';
@Component({
  selector: 'app-pedido-index',
  templateUrl: './pedido-index.component.html',
  styleUrls: ['./pedido-index.component.css']
})
export class PedidoIndexComponent implements OnInit {

  items: ItemCart[] = [];
  total = 0;
  fecha = new Date();
  qtyItems = 0;
  error: any;
  makeSubmit: boolean = false;
  formCliente: FormGroup;
  id: any;
  cliente: any;
  constructor(
    public fb: FormBuilder,
    private cartService: CartService,
    private noti: NotificacionService,
    private gService: GenericService,
    private router: Router
  ) {
    this.reactiveForm();
  }
  reactiveForm() {
    this.formCliente = this.fb.group({
      id: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    });
  }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();

    this.cartService.countItems.subscribe((value) => {
      this.qtyItems = value;
    });
  }
  actualizarCantidad(item: any) {
    this.cartService.addToCart(item);
    this.total = this.cartService.getTotal();
    this.noti.mensaje('Orden', 'Cantidad actualizada', 'success');
  }
  eliminarItem(item: any) {
    this.cartService.removeFromCart(item);
    this.total = this.cartService.getTotal();
    this.noti.mensaje('Orden', 'Videojuego eliminado de la orden', 'warning');
  }
  public errorHandling = (control: string, error: string) => {
    return (
      this.formCliente.controls[control].hasError(error) &&
      this.formCliente.controls[control].invalid &&
      (this.makeSubmit || this.formCliente.controls[control].touched)
    );
  };
  ordenar() {
    if (this.qtyItems > 0) {
      let detalles = { detalles: this.cartService.getItems() };
      this.gService
        .create('videojuego/orden', detalles)
        .subscribe((respuesta: any) => {
          this.noti.mensaje(
            'Orden',
            'Orden registrada satisfactoriamente',
            'sucess'
          );
          this.cartService.deleteCart();
          this.items = this.cartService.getItems();
          this.total = this.cartService.getTotal();
        });
    } else {
      this.noti.mensaje('Orden', 'Agregue videojuegos a la orden', 'warning');
    }
  }

  buscarCliente() {
    this.gService.get('cliente', this.formCliente.value.id).subscribe((data: any) => {
      this.cliente = data;
      console.log(this.cliente);
    })
  }
}
