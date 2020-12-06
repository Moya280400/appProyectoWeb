import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-factura-list',
  templateUrl: './factura-list.component.html',
  styleUrls: ['./factura-list.component.css']
})
export class FacturaListComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  datos; any;

  constructor(private gService: GenericService) {
    this.listaFacturas();
  }

  ngOnInit(): void {
  }

  listaFacturas(){
    this.gService.list('factura/').pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
      console.log(data);
      this.datos=data;
    });
  }
}
