import { Component, OnInit } from '@angular/core';
import {ServicioProspectosService} from '../servicio-prospectos.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js';  


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {


  public data = [
  ];
  public viendoProspecto = false;

  prospecto={
    id:"",
    nombre:"",
    apellidoPaterno:"", 
    apellidoMaterno:"",
    calle:"",
    numero:"",
    colonia:"",
    codigoPostal:"",
    telefono:"",
    RFC:"",
    estado:"",
    estadoInt:"",
    motivoRechazo:""
  }

public documentos = [];


  constructor(private router:Router,private ServicioProspectos:ServicioProspectosService) { }

  ngOnInit(): void {
    this.obtenerProspectos();
  }

  obtenerProspectos() {
     this.ServicioProspectos
      .obtenerProspectos()
      .subscribe((data: any[]) =>{
        this.data = data;
        console.log(data);
        console.log(this.data);
      } );
      
  }

verProspecto(RFC){
  this.viendoProspecto=true;
  console.log(RFC);
  this.ServicioProspectos
  .BusquedaProspecto(RFC)
  .subscribe((usuario: any[]) =>{
    this.prospecto = usuario[0];
    console.log(usuario) ;
    console.log(this.prospecto);
    this.busquedaDocumentos();
  }
  );
}

public verdocumento(src){
  this.router.navigate([]).then(result => {  window.open(src, '_blank'); });

}

public busquedaDocumentos(){
  console.log(this.prospecto.id);
  this.ServicioProspectos
  .busquedaDocumentos(this.prospecto.id)
  .subscribe((usuario: any[]) =>{
    this.documentos = usuario;
    console.log(usuario) ;
    console.log( this.documentos);
  }
  );
}

}
