import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {ServicioProspectosService} from '../servicio-prospectos.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';  
import { FileMimeType } from '@taldor-ltd/angular-file-viewer';
import { ViewChild,ElementRef  } from '@angular/core';

@Component({
  selector: 'app-captura',
  templateUrl: './captura.component.html',
  styleUrls: ['./captura.component.css']
})
export class CapturaComponent implements OnInit {
  
  

  public respuestaImagenEnviada;
  public resultadoCarga;
  public nombrecategoria:string="";
  public Nombreimagen="";
  public nombreimagensencillo="";
  public sehacargadoimg:boolean=false;
  public nombreDocumento:string="";
  public agregardocumento:boolean=false;

  public idProspecto = 0;

  prospecto={
      nombreProspecto:"",
      apellidoP:"",
      apellidoM:"",
      calle:"",
      numeroCasa:"",
      colonia:"",
      codigoPostal:"",
      telefono:"",
      rfc:""
  }
  

  public src = '';
  public type = FileMimeType.PDF;
   
  public documentos = [];

  constructor(private router:Router,private ServicioProspectos:ServicioProspectosService) { }
  
  ngOnInit(): void {
  }
  @ViewChild('myInput')  myInputVariable: ElementRef;
  @ViewChild('nombreDoc')  nombreDocVariable: ElementRef;

  public cargandoImagen(files: FileList){

    if(this.nombreDocumento.length<=0){
      Swal.fire('Atención','Favor de proporcionar un nombre al documento' , 'info'); 
      this.myInputVariable.nativeElement.value = "";
      return false;
    }

		this.ServicioProspectos.postFile(files[0]).subscribe(

			response => {
				this.respuestaImagenEnviada = response; 
				if(this.respuestaImagenEnviada <= 1){
          console.log("Error en el servidor"); 
          Swal.fire('Error', 'No se puede subir la imagen', 'warning'); 
				}else{

					if(this.respuestaImagenEnviada.code == 200 && this.respuestaImagenEnviada.status == "success"){
            this.resultadoCarga = 1;
            console.log(this.respuestaImagenEnviada.msj);
            this.nombreimagensencillo=this.respuestaImagenEnviada.msj;
            this.Nombreimagen="http://localhost/NuevosProspectos/"+this.respuestaImagenEnviada.msj;
            this.src = this.Nombreimagen;
            this.type = this.respuestaImagenEnviada.tipo;
            console.log(this.type);
            this.sehacargadoimg=true;
            console.log(this.Nombreimagen);
            console.log(this.sehacargadoimg);
            let modelData = {
              nombre : this.nombreimagensencillo,
              src: this.src,
              type: this.type,
              nombreDocumento : this.nombreDocumento
          }; 
          this.documentos.push(modelData);
          
          //this.files.nativeElement.value = "";
					}else{
            Swal.fire('Error', this.respuestaImagenEnviada.msj , 'warning'); 
						this.resultadoCarga = 2;
					}
         
				}
			},
			error => {
				console.log(<any>error);
			}

		);//FIN DE METODO SUBSCRIBE
    //this.files[];
    this.agregardocumento=false;
    this.myInputVariable.nativeElement.value = "";
    this.nombreDocVariable.nativeElement.value="";
    this.Nombreimagen="";
    
  }

  public verdocumento(src){
    this.router.navigate([]).then(result => {  window.open(src, '_blank'); });

  }

  public Salir(){
    Swal
    .fire({
     title: "Salir",
     text: "Está seguro de salir, no se guardarán los datos del prospecto",
     icon: 'warning',
     showCancelButton: true,
     confirmButtonText: "Sí",
     cancelButtonText: "Cancelar",
    })
    .then(resultado => {
     if (resultado.value) {
      this.router.navigate(['/principal']);
     } else {
         // Dijeron que no
         console.log("*NO se sale *");
     }
    });
     
  }
 

  Guardar() {
    
    if(this.prospecto.nombreProspecto==""){
      Swal.fire('Atención', 'Proporcione un nombre', 'info'); 
      return;
    }
    if(this.prospecto.apellidoP==""){
      Swal.fire('Atención', 'Proporcione apellido Paterno', 'info'); 
      return;
    }
    if(this.prospecto.calle==""){
      Swal.fire('Atención', 'Proporcione una calle', 'info'); 
      return;
    }
    if(this.prospecto.numeroCasa==""){
      Swal.fire('Atención', 'Proporcione un número de casa', 'info'); 
      return;
    }
    if(this.prospecto.colonia==""){
      Swal.fire('Atención', 'Proporcione una colonia', 'info'); 
      return;
    }
    if(this.prospecto.codigoPostal==""){
      Swal.fire('Atención', 'Proporcione código Postal', 'info'); 
      return;
    }
    if(this.prospecto.telefono==""){
      Swal.fire('Atención', 'Proporcione un teléfono', 'info'); 
      return;
    }
    if(this.prospecto.rfc==""){
      Swal.fire('Atención', 'Proporcione RFC', 'info'); 
      return;
    }
    console.log(this.prospecto);
    this.ServicioProspectos.guardarProspecto(this.prospecto).subscribe(
      datos=>{
        if(datos['resultado']=='OK'){
          //Swal.fire('Éxito', 'Se ha registrado el prospecto', 'success'); 
          console.log(datos);
          this.buscarUsuarios(this.prospecto.rfc);
         // this.router.navigate(['/principal']);
         
         
        }else{
          Swal.fire('Error', 'No se registró el usuario, compruebe que no sea un usuario repetido', 'warning'); 
        }
      }
    );
  }


  buscarUsuarios(rfc){

    
    console.log(rfc);
    this.ServicioProspectos
    .BusquedaProspecto(rfc)
    .subscribe((usuario: any[]) =>{
      this.idProspecto = usuario[0]['id'];
      console.log(usuario) ;
      console.log(this.idProspecto);
      this.guardarDocumentosServer();
    }
    );
  }

  guardarDocumentosServer(){
    this.documentos.forEach((item) => {
      console.log(item.src);
      //let documentoaguardar=[];
       var modelDocument = {
        idProspecto : this.idProspecto,
        nombre: item.nombreDocumento,
        url: item.src
      }; 
      console.log(modelDocument);
     // documentoaguardar.push(modelDocument);
      
      this.ServicioProspectos.guardarDocumentosServer(modelDocument).subscribe(
        datos=>{
          if(datos['resultado']=='OK'){
            //Swal.fire('Éxito', 'Se ha registrado el prospecto', 'success'); 
            console.log(datos);
            //this.router.navigate(['/principal']);
           
           
          }else{
            Swal.fire('Error', 'No se guardaron los documentos en el servidor', 'warning'); 
          }
        }
      );
  });
            Swal.fire('Éxito', 'Se ha registrado el prospecto', 'success'); 
            this.router.navigate(['/principal']);
  }
  

}
