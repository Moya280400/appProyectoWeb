import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { formatDate } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-videojuego-update',
  templateUrl: './videojuego-update.component.html',
  styleUrls: ['./videojuego-update.component.css']
})
export class VideojuegoUpdateComponent implements OnInit {

  videojuego: any;
  Server_URL: any;
  imageURL: string;
  generosList: any;
  plataformasList: any;
  distribuidores: any;
  desarrolladors: any;
  formUpdate: FormGroup;
  radioActivo: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  makeSubmit: boolean = false;
  lista = new Array();
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {
    //Desde el constructor obtener el identificar de la ruta
    const id = +this.route.snapshot.paramMap.get('id');
    this.getVideojuego(id);
  }
  getVideojuego(id: number) {
    this.gService.get('videojuego', id).subscribe((respuesta: any) => {
      this.videojuego = respuesta;
      //Obtenida la información del videojuego
      //se construye el formulario
      this.reactiveForm();
    });
  }
  reactiveForm() {
    this.getGeneros();
    this.getPlataformas();
    this.getDistribuidors();
    this.getDesarrolladors();

    console.log(this.lista);
    //Si hay información del videojuego
    if (this.videojuego) {
      let fecha = formatDate(
        this.videojuego.fechaSalida,
        'dd/MM/yyyy',
        'en-US'
      );
      //Cargar la información del videojuego
      //en los controles que conforman el formulario
      this.formUpdate = this.fb.group({
        id: [this.videojuego.id],
        nombre: [this.videojuego.nombre, [Validators.required]],
        descripcion: [this.videojuego.descripcion, [Validators.required]],
        fechaSalida: [
          this.videojuego.fechaSalida,
          [Validators.required],
        ],
        precio: [
          this.videojuego.precio,
          [Validators.required, Validators.pattern('[0-9]+')],
        ],
        pathCover: [this.videojuego.pathCover],
        pathVideo: [this.videojuego.pathVideo],
        generos: this.fb.array([]),
        estado: [this.videojuego.estado, [Validators.required]],
        genero_id: this.fb.array([]),
        plataformas: this.fb.array([]),
        plataforma_id: this.fb.array([]),
        distribuidor_id: this.videojuego.distribuidor_id.toString(),
        desarrollador_id: this.videojuego.desarrollador_id.toString(),
        imagenes: this.fb.array([]),
      });

      // Vista previa imagen
      this.imageURL = this.videojuego.pathImagen;
      this.getImagenes();
    if (this.formUpdate.controls.estado.value == 1) {
      this.radioActivo = true;
    }
    else {
      this.radioActivo = false;
    }

    }
  }
  ngOnInit(): void { }
  //Inicio Genero
  getGeneros() {
    return this.gService
      .list('genero')
      .subscribe((respuesta: any) => {
        (this.generosList = respuesta), this.checkboxgeneros();
      });
  }
  get generos(): FormArray {
    return this.formUpdate.get('generos') as FormArray;
  }
  get genero_id(): FormArray {
    return this.formUpdate.get('genero_id') as FormArray;
  }
  private checkboxgeneros() {
    //Recorrer la lista de generos y especificar si esta seleccionado
    this.generosList.forEach((o) => {
      let selected = false;
      if (this.videojuego.generos.find((x) => x.id == o.id)) {
        selected = true;
      }
      const control = new FormControl(selected);
      (this.formUpdate.controls.generos as FormArray).push(control);
      if (selected) {
        //Agregar al array de id seleccionados
        (this.formUpdate.controls.genero_id as FormArray).push(
          new FormControl(o.id)
        );
      }
    });
  }
  onCheckChangeGenero(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formUpdate.controls.genero_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.genero_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formUpdate.controls.genero_id as FormArray).removeAt(i);
          return;
        }

        i++;
      });
    }
  }
  //Fin Genero

  //Inicio Plataforma
  getPlataformas() {
    return this.gService
      .list('plataforma')
      .subscribe((respuesta: any) => {
        (this.plataformasList = respuesta), this.checkboxplataforma();
      });
  }
  get plataformas(): FormArray {
    return this.formUpdate.get('plataformas') as FormArray;
  }
  get plataforma_id(): FormArray {
    return this.formUpdate.get('plataformas') as FormArray;
  }
  private checkboxplataforma() {
    //Recorrer la lista de plataformas y especificar si esta seleccionado
    this.plataformasList.forEach((o) => {
      let selected = false;
      if (this.videojuego.plataformas.find((x) => x.id == o.id)) {
        selected = true;
      }
      const control = new FormControl(selected);
      (this.formUpdate.controls.plataformas as FormArray).push(control);
      if (selected) {
        //Agregar al array de id seleccionados
        (this.formUpdate.controls.plataforma_id as FormArray).push(
          new FormControl(o.id)
        );
      }
    });
  }
  onCheckChangePlataforma(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formUpdate.controls.plataforma_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.plataforma_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formUpdate.controls.plataforma_id as FormArray).removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  //Fin Plataforma
  get imagenes(): FormArray {
    return this.formUpdate.get('imagenes') as FormArray;
  }
  get imagen_id(): FormArray {
    return this.formUpdate.get('imagen_id') as FormArray;
  }

  //Obtener la imagen o archivo seleccionado
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formUpdate.get('image').setValue(file);
      // Vista previa imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
   agregarEmbed(form:any){
    if(!(form.value.pathVideo=="")){
    let linkVideo=form.value.pathVideo;

    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = linkVideo.match(regExp);

      if (match[1].length==8) {
        var linkCompleto= 'https://www.youtube.com/embed/'+match[2];
        this.formUpdate.value.pathVideo=linkCompleto;
      }
    }
  }

  submitForm() {
    this.agregarEmbed(this.formUpdate);
    this.makeSubmit = true;
     this.gService
      .update('videojuego/update', this.formUpdate.value)
      .subscribe((respuesta: any) => {
        this.videojuego = respuesta;
        this.router.navigate(['/videojuego/list'], {
        //Parametro es cualquiera
        queryParams: { actualizar: 'true' },
      });
      });
  }
  onReset() {
    this.formUpdate.reset();
  }
  onBack() {
    this.router.navigate(['/videojuego/list']);
  }
  annadirImagen(val) {
    this.lista.push(val);
    (this.formUpdate.controls.imagenes as FormArray).push(
      new FormControl(val)
    );
    console.log(this.lista);

  }
  eliminarImagen(val) {
    /* Deseleccionar*/
    // Buscar el elemento que se le quito la selección
    let i = 0;

    this.imagenes.controls.forEach((ctrl: FormControl) => {
      if (val == i) {
        // Quitar el elemento deseleccionado del array
        (this.formUpdate.controls.imagenes as FormArray).removeAt(i);
        return;
      }

      i++;
    });
    this.lista.splice(val, 1);
  }
  public errorHandling = (control: string, error: string) => {
    return (
      this.formUpdate.controls[control].hasError(error) &&
      this.formUpdate.controls[control].invalid &&
      (this.makeSubmit || this.formUpdate.controls[control].touched)
    );
  };
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

  getImagenes() {

    this.videojuego.imagenes_videojuego.forEach((o) => {

    // Quitar el elemento deseleccionado del array


    this.lista.push(o.pathImagen);
    console.log(this.lista);

    (this.formUpdate.controls.imagenes as FormArray).push(
      new FormControl(o.pathImagen)
    );

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

