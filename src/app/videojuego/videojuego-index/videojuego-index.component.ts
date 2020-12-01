import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';
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
  error: any;
  filtradoList: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  infoVideojuego: any;
  esVendedor:boolean;
  currentUser: any;
  boolTipoFiltro:any;
  datosFiltradoSeleccionado: any;
  formFiltrar: FormGroup;
  constructor(
     public fb: FormBuilder,
    private authService: AuthenticationService,
    private gService: GenericService,
    private notificacion: NotificacionService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {
    this.reactiveForm();
    this.listaVideojuegos();

  }

  reactiveForm() {
    this.formFiltrar = this.fb.group({
      filtros: this.fb.array([]),
      filtro_id: this.fb.array([]),
    });
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

  this.gService.list('plataforma').subscribe(
      (respuesta: any) => {
        (this.filtradoList = respuesta), this.checkboxFiltrado();
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
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
  get filtros(): FormArray {
    return this.formFiltrar.get('filtros') as FormArray;
  }
  get filtro_id(): FormArray {
    return this.formFiltrar.get('filtro_id') as FormArray;
  }
  private checkboxFiltrado() {
  this.reactiveForm();
    this.filtradoList.forEach(() => {
      const control = new FormControl(); // primer parámetro valor a asignar
      (this.formFiltrar.controls.filtros as FormArray).push(control);
    });
  }


  cambioFiltro(event: any){
    if(event.target.value=='0'){
      this.boolTipoFiltro=true;
            return this.gService.list('plataforma').subscribe(
      (respuesta: any) => {
        (this.filtradoList = respuesta), this.checkboxFiltrado();
        console.log(this.filtradoList)
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
    }else{
      this.boolTipoFiltro=false;
      return this.gService.list('genero').subscribe(
      (respuesta: any) => {
        (this.filtradoList = respuesta), this.checkboxFiltrado();
        console.log(this.filtradoList)
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
    }
  }

  onCheckChange(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formFiltrar.controls.filtro_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.filtro_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formFiltrar.controls.filtro_id as FormArray).removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  filtrar(){
    if(!this.boolTipoFiltro){
      this.gService.filter('videojuego/filtradoPlataforma', this.formFiltrar.value).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        console.log(data);
        console.log(this.formFiltrar.value);
        this.datos = data;
        console.log(this.datos);
      });
    }
    else{
      this.gService.filter('videojuego/filtradoGenero', this.formFiltrar.value).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        console.log('Genero');
        console.log(this.formFiltrar.value);
        this.datos = data;
        console.log(this.datos);
      });
    }
  }
}
