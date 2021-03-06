import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { GenericService } from 'src/app/share/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css'],
})
export class ClienteCreateComponent implements OnInit {
  cliente: any;
  error: any;

  Server_URL: any;

  formCreate: FormGroup;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService,
    private notificacion: NotificacionService,
    private route: ActivatedRoute
  ) {
    this.reactiveForm();
  }
  //cambiar
  reactiveForm() {
    this.formCreate = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15)]],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      estado: ['', [Validators.required]]
    });
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
      this.notificacion.mensaje('Cliente', 'Cliente agregado con exito', 'success');
    }
  }

  submitForm() {
    this.makeSubmit = true;
    var numeroString = this.formCreate.value['telefono'].toString();
    this.formCreate.value['telefono'] = numeroString;


    this.Server_URL='cliente/store?';
    this.gService.create(this.Server_URL, this.formCreate.value).subscribe((respuesta: any)=> {
        this.router.navigate(['/'], {
          //Parametro es cualquiera
          queryParams: { crear: 'true' },
        });
      });
  }
  onReset() {
    this.formCreate.reset();
  }
  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  };
}

