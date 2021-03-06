import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService } from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent implements OnInit {
  formulario: FormGroup;
  //Para mostrar/ocultar mensajes de validacion
  makeSubmit: boolean = false;
  //Para guardar la info del usuario, opcional
  infoUsuario: any;

  //Se inyectan los datos que ocupo
  constructor(public fb: FormBuilder,
    private authService: AuthenticationService,
    private notificacion: NotificacionService,
    private router: Router,
    private route: ActivatedRoute) {
    this.reactiveForm();
  }
  //Definir form con reglas de validacion
  reactiveForm() {

    //https://angular.io/guide/reactive-forms
    //https://angular.io/api/forms/Validators

    //LAS ENTRADAS QUE ESTAN AQUI DEBEN ESTAR EN EL FORM
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
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
      login = params.mensaje || false;
    }))

    if (login) {
      this.notificacion.mensaje('Usuario', 'Cliente ingresado con exito', 'success');
    }
  }
  onReset() {
    this.formulario.reset();
  }

  submitForm() {
    this.makeSubmit = true;
    //Validacion
    if (this.formulario.invalid) {
      return;
    }
    this.authService
      .loginUser(this.formulario.value)
      .subscribe((respuesta: any) => {
        (this.infoUsuario = respuesta),
        this.router.navigate(['/'], {
          queryParams: { login: 'true' },
        });
      }
      );
  }

  //Mensaje errores de form en Angular
  public errorHandling = (control: string, error: string) => {
    return (
      this.formulario.controls[control].hasError(error) &&
      this.formulario.controls[control].invalid &&
      (this.makeSubmit || this.formulario.controls[control].touched)
    );
  };

}
