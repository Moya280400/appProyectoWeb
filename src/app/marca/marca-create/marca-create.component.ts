import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { HttpClient } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-marca-create',
  templateUrl: './marca-create.component.html',
  styleUrls: ['./marca-create.component.css']
})
export class MarcaCreateComponent implements OnInit {

  error: any;
  makeSubmit: boolean = false;

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

  reactiveForm() {
    this.formCreate = this.fb.group({
      descripcion: ['', [Validators.required]],
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
      this.notificacion.mensaje('Marca', 'Marca agregada con exito', 'success');
    }
  }

  submitForm() {
    this.makeSubmit = true;

    this.Server_URL = 'marca_vehiculo/store?';
    this.gService.create(this.Server_URL, this.formCreate.value).subscribe((respuesta: any) => {
      this.router.navigate(['/marca'], {
        //Parametro es cualquiera
        queryParams: { crear: 'true' },
      });
    });
  }

  onReset() {
    this.formCreate.reset();
  }
  onBack() {
    this.router.navigate(['/marca']);
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  };

}
