import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { GenericService } from 'src/app/share/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css'],
})
export class UsuarioCreateComponent implements OnInit {
  usuario: any;
  roles: any;
  error: any;
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
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15)]],
      telefono: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      password: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      rol_id: ['', [Validators.required]],

    });
    this.getRoles();
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
      this.notificacion.mensaje('Usuario', 'Iniciado con exito', 'success');
    }
  }

  submitForm() {
    this.makeSubmit = true;

    var numeroString = this.formCreate.value['telefono'].toString();
    this.formCreate.value['telefono'] = numeroString;
    console.log(this.formCreate.value);
    this.authService
      .createUser(this.formCreate.value)
      .subscribe((respuesta: any) => {
        this.usuario = respuesta;
        this.router.navigate(['/usuario/login'], {
          //Parametro es cualquiera
          queryParams: { crear: 'true' },
        });
      });
  }
  onReset() {
    this.formCreate.reset();
  }

  getRoles() {
    this.gService
      .list('rol')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.roles = data;
      });
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  };
}

