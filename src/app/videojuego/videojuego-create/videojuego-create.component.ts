import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { takeUntil } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-videojuego-create',
  templateUrl: './videojuego-create.component.html',
  styleUrls: ['./videojuego-create.component.css']
})
export class VideojuegoCreateComponent implements OnInit {

  Server_URL: any;
  videojuego: any;
  distribuidores: any;
  desarrolladors: any;
  imageURL: string;
  generosList: any;
  plataformasList: any;
  imagenesList: any;
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
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.formCreate = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      fechaSalida: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      generos: this.fb.array([]),
      genero_id: this.fb.array([]),
      plataformas: this.fb.array([]),
      plataforma_id: this.fb.array([]),
      pathCover: ['', [Validators.required, Validators.pattern(reg)]],
      pathVideo: ['', [Validators.required, Validators.pattern(reg)]],
      distribuidor_id: ['', [Validators.required]],
      desarrollador_id: ['', [Validators.required]],

      imagenes: this.fb.array([]),
    });
    this.getGeneros();
    this.getPlataformas();
    this.getDistribuidors();
    this.getDesarrolladors();
  }
  ngOnInit(): void { }

  //Inicio Generos
  getGeneros() {
    return this.gService.list('genero').subscribe(
      (respuesta: any) => {
        (this.generosList = respuesta), this.checkboxgeneros();
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }
  get generos(): FormArray {
    return this.formCreate.get('generos') as FormArray;
  }
  get genero_id(): FormArray {
    return this.formCreate.get('genero_id') as FormArray;
  }
  private checkboxgeneros() {
    this.generosList.forEach(() => {
      const control = new FormControl(); // primer parámetro valor a asignar
      (this.formCreate.controls.generos as FormArray).push(control);
    });
  }
  onCheckChangeGenero(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formCreate.controls.genero_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.genero_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formCreate.controls.genero_id as FormArray).removeAt(i);
          return;
        }

        i++;
      });
    }
  }
  //Fin Generos

  //Inicio Plataformas
  getPlataformas() {
    return this.gService.list('plataforma').subscribe(
      (respuesta: any) => {
        (this.plataformasList = respuesta), this.checkboxplataformas();
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }
  get plataformas(): FormArray {
    return this.formCreate.get('plataformas') as FormArray;
  }
  get plataforma_id(): FormArray {
    return this.formCreate.get('plataforma_id') as FormArray;
  }
  private checkboxplataformas() {
    this.plataformasList.forEach(() => {
      const control = new FormControl(); // primer parámetro valor a asignar
      (this.formCreate.controls.plataformas as FormArray).push(control);
    });
  }
  onCheckChangePlataforma(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formCreate.controls.plataforma_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.plataforma_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formCreate.controls.plataforma_id as FormArray).removeAt(i);
          return;
        }

        i++;
      });
    }
  }
  //Fin Plataforma

  get imagenes(): FormArray {
    return this.formCreate.get('imagenes') as FormArray;
  }
  get imagen_id(): FormArray {
    return this.formCreate.get('imagen_id') as FormArray;
  }

  //Obtener la imagen o archivo seleccionado
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formCreate.get('image').setValue(file);
      // Vista previa imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  submitForm() {

    //this.lista.forEach(function (value){
    //this.formCreate.controls.imagenes.push(value);
    //});
    this.agregarEmbed(this.formCreate);

    this.makeSubmit = true;

    this.Server_URL = 'videojuego/store?';

    this.gService.create(this.Server_URL, this.formCreate.value).subscribe((respuesta: any) => {
      this.router.navigate(['/videojuego/list'], {
        //Parametro es cualquiera
        queryParams: { crear: 'true' },
      });
    });
  }

  agregarEmbed(form:any){
    if(!(form.value.pathVideo=='')){
      let linkVideo=form.value.pathVideo;

       var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
       var match = linkVideo.match(regExp);


      var linkCompleto= 'https://www.youtube.com/embed/'+match[2];
      console.log(linkCompleto);
      this.formCreate.value.pathVideo=linkCompleto;

    }


  }
  onReset() {
    this.formCreate.reset();
  }
  onBack() {
    this.router.navigate(['/videojuego/list']);
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  };

  annadirImagen(val) {
    this.lista.push(val);
    (this.formCreate.controls.imagenes as FormArray).push(
      new FormControl(val)
    );

  }
  eliminarImagen(val) {
    /* Deseleccionar*/
    // Buscar el elemento que se le quito la selección
    let i = 0;

    this.imagenes.controls.forEach((ctrl: FormControl) => {
      if (val == i) {
        // Quitar el elemento deseleccionado del array
        (this.formCreate.controls.imagenes as FormArray).removeAt(i);
        return;
      }

      i++;
    });
    this.lista.splice(val, 1);
  }

  getDistribuidors() {
    this.gService
      .list('distribuidor')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.distribuidores = data;
      });
  }

  getDesarrolladors() {
    this.gService
      .list('desarrollador')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.desarrolladors = data;
      });
  }
}
