import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { HttpClient } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-vehiculo-create',
  templateUrl: './vehiculo-create.component.html',
  styleUrls: ['./vehiculo-create.component.css']
})
export class VehiculoCreateComponent implements OnInit {

  error: any;
  makeSubmit: boolean = false;

  marcas:any;
  tipoVehiculos:any;

  Server_URL: any;

  formCreate: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
 constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private notificacion: NotificacionService,
    private route: ActivatedRoute
  ) {
    this.reactiveForm();
  }
  //cambiar
  reactiveForm() {
    this.formCreate = this.fb.group({
      id: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      marca_id: ['', [Validators.required]],
      tipo_vehiculo_id: ['', [Validators.required]],

    });
    this.getMarcas();
    this.getTipoVehiculos();
  }
  ngOnInit(): void {
    this.mensajes();
  }
  mensajes() {
    let login = true;
    //Obtener parametros de la URL
    this.route.queryParams.subscribe((params => {
      //Le indico que si no lo encuentra coloquelo como falso
      console.log(params.mensaje);
      login = params.mensaje || false;
    }))

    if (login) {
      this.notificacion.mensaje('Vehiculo', 'Vehiculo agregado con exito', 'success');
    }
  }

  submitForm() {
    this.makeSubmit = true;

    this.Server_URL = 'vehiculo/store?';
    this.gService.create(this.Server_URL, this.formCreate.value).subscribe((respuesta: any) => {
      this.router.navigate(['/vehiculo'], {
        //Parametro es cualquiera
        queryParams: { crear: 'true' },
      });
    });
  }

  getMarcas() {
    this.gService
      .list('marca_vehiculo')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.marcas = data;
      });
  }
  getTipoVehiculos() {
    this.gService
      .list('tipo_vehiculo')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.tipoVehiculos = data;
      });
  }
  onReset() {
    this.formCreate.reset();
  }
  onBack() {
    this.router.navigate(['/vehiculo']);
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  };

}
