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
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
@Component({
  selector: 'app-pedido-index',
  templateUrl: './pedido-index.component.html',
  styleUrls: ['./pedido-index.component.css']
})
export class PedidoIndexComponent implements OnInit {

  Server_URL: any;
  tipoEntrega: any;
  repartidor: any;
  items: ItemCart[] = [];
  total = 0;
  subtotal = 0;
  impuesto=0;
  costoEnvio=0;

  fecha = new Date();
  qtyItems = 0;
  error: any;
  makeSubmit: boolean = false;
  formCliente: FormGroup;
  id: any;
  cliente={ direccion:"", nombre:""};
  boolRepartidor:any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public fb: FormBuilder,
    private cartService: CartService,
    private noti: NotificacionService,
    private gService: GenericService,
    private authServiceUser: AuthenticationService,
    private router: Router,
  ) {
    this.reactiveForm();
  }
  reactiveForm() {
    this.formCliente = this.fb.group({
      fecha: [''],
      direccion_entrega: [''],
      subtotal: [''],
      costo_envio: [''],
      impuesto: [''],
      total: [''],
      estado:[''],
      cliente_id: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      usuario_id: [''],
      repartidor_id: ['', [Validators.required]],
      tipo_entrega_id: ['1', [Validators.required]],
      detalle: this.fb.array([])

    });

    this.getTipoEntrega();
    this.getRepartidores();
  }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.impuesto = this.cartService.getImpuesto();
    this.subtotal = this.cartService.getSubtotal();
    this.cartService.setEstadoEnvio(1);
    this.costoEnvio=this.cartService.calculoCostoEnvio();

    console.log(this.impuesto)
    this.cartService.countItems.subscribe((value) => {
      this.qtyItems = value;
    });
  }
  actualizarCantidad(item: any) {
    this.cartService.addToCart(item);
    this.total = this.cartService.getTotal();
    this.impuesto = this.cartService.getImpuesto();
    this.subtotal = this.cartService.getSubtotal();
    this.noti.mensaje('Orden', 'Cantidad actualizada', 'success');

  }
  eliminarItem(item: any) {
    this.cartService.removeFromCart(item);
    this.total = this.cartService.getTotal();
    this.impuesto = this.cartService.getImpuesto();
    this.subtotal = this.cartService.getSubtotal();
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
if (this.cliente.nombre!='') {

    if (this.qtyItems > 0 ) {
      if(this.formCliente.controls.tipo_entrega_id.value=='0'){
        this.formCliente.controls.repartidor_id.setValue('');
      }
      var detalles = new Array();
      this.formCliente.controls.fecha.setValue(this.fecha);
      this.formCliente.controls.direccion_entrega.setValue(this.cliente.direccion);
      this.formCliente.controls.subtotal.setValue(this.cartService.getSubtotal());
      this.formCliente.controls.total.setValue(this.cartService.getTotal());
      this.formCliente.controls.impuesto.setValue(this.cartService.getImpuesto());
      this.formCliente.controls.costo_envio.setValue(this.costoEnvio);
      this.formCliente.controls.usuario_id.setValue(this.authServiceUser.currentUserValue.usuario.id);
      this.formCliente.controls.estado.setValue('1');
      console.log(this.formCliente.controls);

      console.log(this.cartService.getItems());

      this.cartService.getItems().forEach(function (item){

        var linea= item.product.id+','+item.cantidad+','+item.subtotal;
        detalles.push(linea);
      });


      detalles.forEach((obj) => {
        (this.formCliente.controls.detalle as FormArray).push(
          new FormControl(obj)
        );


      });


      console.log(this.formCliente.controls);

      this.gService
        .create('pedido/store?', this.formCliente.value)
        .subscribe((respuesta: any) => {
          this.noti.mensaje(
            'Pedido',
            'Pedido registrado satisfactoriamente',
            'sucess'
          );
          this.cartService.deleteCart();
          this.items = this.cartService.getItems();
          this.total = this.cartService.getTotal();
          this.subtotal = this.cartService.getSubtotal();
          this.impuesto = this.cartService.getImpuesto();
        });
    } else {
      this.noti.mensaje('Pedido', 'Agregue videojuegos al pedido', 'warning');

      }
    }
    else{
      this.noti.mensaje('Pedido', 'Verifique si agregó un cliente registrado', 'warning');
    }

  }

  buscarCliente() {
    this.gService.get('cliente', this.formCliente.value.cliente_id).subscribe((data: any) => {
      this.cliente = data;
      console.log(this.cliente);
    })
  }

  getTipoEntrega() {
    this.gService
      .list('tipo_entrega')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.tipoEntrega = data;
      });
  }

  getRepartidores() {
    this.gService
      .list('repartidor')
      .subscribe((data: any) => {
        this.repartidor = data;
      });
  }

  cambioEntrega(event: any){
    if(event.target.value=='2'){

      this.boolRepartidor=true;
      this.cartService.setEstadoEnvio(2);
    }else{
      this.boolRepartidor=false;
      this.cartService.setEstadoEnvio(1);


    }
      this.costoEnvio=this.cartService.calculoCostoEnvio();
      this.total=this.cartService.getTotal();
  }
}
