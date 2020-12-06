import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import {  Router,ActivatedRoute } from '@angular/router';
import {
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-pedido-update',
  templateUrl: './pedido-update.component.html',
  styleUrls: ['./pedido-update.component.css']
})
export class PedidoUpdateComponent implements OnInit {

  estadoPedidos: any;
  datos: any;
  error: any;
  makeSubmit: boolean = false;
  formUpdate: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private notification: NotificacionService,
    private route: ActivatedRoute,
  ) {
      const id = +this.route.snapshot.paramMap.get('id');
      this.getObtenerPedido(id);
   }

     getObtenerPedido(id: any) {
    this.gService.get('pedido', id)
      .subscribe((respuesta: any) => {
      this.datos = respuesta;
      //Obtenida la información del videojuego
      //se construye el formulario
      this.reactiveForm();
    });
  }

  reactiveForm() {
    this.formUpdate = this.fb.group({

      id: [this.datos.id],
      estado_pedido_id: [this.datos.estado_pedido_id, [Validators.required]],
    });
    this.getEstadoPedidos();
  }
  ngOnInit(): void { }

  submitForm() {
    this.makeSubmit = true;

    this.gService
      .update('pedido/update', this.formUpdate.value)
      .subscribe((respuesta: any) => {
        this.datos = respuesta;
        this.router.navigate(['/pedido'], {
          //Parametro es cualquiera
          queryParams: { actualizar: 'true' },
        });
      });
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formUpdate.controls[control].hasError(error) &&
      this.formUpdate.controls[control].invalid &&
      (this.makeSubmit || this.formUpdate.controls[control].touched)
    );
  };



  getEstadoPedidos() {
    this.gService
      .list('estado_pedido')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.estadoPedidos = data;
      });

      console.log(this.estadoPedidos);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }


}
