import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-repartidor-update',
  templateUrl: './repartidor-update.component.html',
  styleUrls: ['./repartidor-update.component.css']
})
export class RepartidorUpdateComponent implements OnInit {

  Server_URL: any;
  repartidor: any;
  vehiculos: any;
  error: any;
  makeSubmit: boolean = false;
  formUpdate: FormGroup;
  lista = new Array();
  radioActivo: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private route: ActivatedRoute,
    private notificacion: NotificacionService
  ) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getRepartidor(id);

  }
  getRepartidor(id: number) {
    this.gService.get('repartidor', id).subscribe((respuesta: any) => {
      this.repartidor = respuesta;
      //Obtenida la información del videojuego
      //se construye el formulario
      this.reactiveForm();
    });
  }

  reactiveForm() {
    this.formUpdate = this.fb.group({

      id: [this.repartidor.id],
      nombre: [this.repartidor.nombre, [Validators.required]],
      correo: [this.repartidor.correo, [Validators.required, Validators.email]],
      telefono: [this.repartidor.telefono, [Validators.required, Validators.pattern('[0-9]+')]],
      vehiculo_id: [this.repartidor.vehiculo_id, [Validators.required]],
      estado: [this.repartidor.estado, [Validators.required]],
    });
    this.getVehiculos();

    if (this.formUpdate.controls.estado.value == 1) {
      this.radioActivo = true;
    }
    else {
      this.radioActivo = false;
    }
    console.log(this.radioActivo);
  }
  ngOnInit(): void { }

  submitForm() {
    this.makeSubmit = true;

    this.gService
      .update('repartidor/update', this.formUpdate.value)
      .subscribe((respuesta: any) => {
        this.repartidor = respuesta;
        this.router.navigate(['/repartidor'], {
          //Parametro es cualquiera
          queryParams: { actualizar: 'true' },
        });
      });
  }
  onReset() {
    this.formUpdate.reset();
  }
  onBack() {
    this.router.navigate(['/repartidor']);
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formUpdate.controls[control].hasError(error) &&
      this.formUpdate.controls[control].invalid &&
      (this.makeSubmit || this.formUpdate.controls[control].touched)
    );
  };


  getVehiculos() {
    this.gService
      .list('vehiculo')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.vehiculos = data;
      });
  }

  onRadioChangeEstado(event) {
    /* seleccionado */
    if (event.target.value == "1") {
      this.formUpdate.value.estado = 1;
    } else {
      this.formUpdate.value.estado = 0;
    }
  }

}
