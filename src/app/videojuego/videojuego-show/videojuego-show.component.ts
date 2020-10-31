import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-videojuego-show',
  templateUrl: './videojuego-show.component.html',
  styleUrls: ['./videojuego-show.component.css', './videojuego-show-carouselparallax.component.css']
})
export class VideojuegoShowComponent implements OnInit {
  datos: any;
  video:any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private gService: GenericService,
    private notification:NotificacionService,
    private route: ActivatedRoute,
    private sanitizer : DomSanitizer
    ) { }

  ngOnInit(): void {
    //Obtener el id del videojuego
    let id = +this.route.snapshot.paramMap.get('id');
    //Obtener el videojuego
    this.obtenerVideojuego(id);
    console.log(this.datos)
  }

  obtenerVideojuego(id:any){
  this.gService.get('videojuego',id)
  .pipe(takeUntil(this.destroy$))
  .subscribe((data:any)=>{

  let estadoVar= data.estado? 'Activo':'Inactivo';
  data.estado=estadoVar;

  this.datos=data;

  this.video = this.sanitizer.bypassSecurityTrustResourceUrl(this.datos.pathVideo);
  })
  }
 ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }

}
