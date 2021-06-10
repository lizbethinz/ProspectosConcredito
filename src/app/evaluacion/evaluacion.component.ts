import { Component, OnInit } from '@angular/core';
import {ServicioProspectosService} from '../servicio-prospectos.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js';  



@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit {

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
    this.obtenerProspectosAEvaluar();
  }

  obtenerProspectosAEvaluar() {
    this.ServicioProspectos
     .obtenerProspectosAEvaluar()
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

public Aceptar(){

  Swal
  .fire({
   title: "Aceptar",
   text: "¿Está seguro de aceptar al prospecto?",
   icon: 'info',
   showCancelButton: true,
   confirmButtonText: "Sí",
   cancelButtonText: "Cancelar",
  })
  .then(resultado => {
   if (resultado.value) {
    
    this.ServicioProspectos
    .aceptarProspecto(this.prospecto.id)
    .subscribe((usuario: any[]) =>{
      if(usuario['resultado']=='OK'){

         console.log(usuario);
         Swal.fire('Éxito','Se aceptó exitosamente' , 'success'); 
         this.router.navigate(['/principal'])
       }else{
         console.log(usuario);
         Swal.fire('Error','Ocurrió un error al aceptar al usuario' , 'warning'); 
       }

    }
    );

   } else {
       console.log("*NO se sale *");
   }
  });
}
public Rechazar(){
  if(this.prospecto.motivoRechazo==""){
    Swal.fire('Atención', 'Proporcione motivo del rechazo', 'info'); 
    return;
  }
  Swal
  .fire({
   title: "Aceptar",
   text: "¿Está seguro de rechazar al prospecto?",
   icon: 'warning',
   showCancelButton: true,
   confirmButtonText: "Sí",
   cancelButtonText: "Cancelar",
  })
  .then(resultado => {
   if (resultado.value) {
    this.ServicioProspectos
    .rechazarProspecto(this.prospecto.motivoRechazo,this.prospecto.id)
    .subscribe((usuario: any[]) =>{
      if(usuario['resultado']=='OK'){

         console.log(usuario);
         Swal.fire('Éxito','Se rechazó exitosamente' , 'success'); 
         this.router.navigate(['/principal'])
       }else{
         console.log(usuario);
         Swal.fire('Error','Ocurrió un error al rechazar al usuario' , 'warning'); 
       }

    }
    );
   } else {
       console.log("*NO se rechaza *");
   }
  });
}



}
