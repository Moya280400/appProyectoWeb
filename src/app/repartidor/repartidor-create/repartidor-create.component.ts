import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-repartidor-create',
  templateUrl: './repartidor-create.component.html',
  styleUrls: ['./repartidor-create.component.css']
})
export class RepartidorCreateComponent implements OnInit {

  Server_URL: any;
  repartidor: any;
  vehiculos: any;
  error: any;
  makeSubmit: boolean = false;
  formCreate: FormGroup;
  lista = new Array();
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {
    this.reactiveForm();

  }

  reactiveForm() {
    this.formCreate = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      vehiculo_id: ['', [Validators.required]],
    });
    this.getVehiculos();
  }
  ngOnInit(): void { }

  submitForm() {


    this.makeSubmit = true;

    this.Server_URL = 'repartidor/store?';

    this.gService.create(this.Server_URL, this.formCreate.value).subscribe((respuesta: any) => {
      this.router.navigate(['/repartidor'], {
        //Parametro es cualquiera
        queryParams: { crear: 'true' },
      });
    });
  }
  onReset() {
    this.formCreate.reset();
  }
  onBack() {
    this.router.navigate(['/repartidor']);
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  };


  getVehiculos() {
    this.gService
      .list('vehiculo')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.vehiculos = data;
      });

    console.log(this.vehiculos);
  }


}
