import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ServicioProspectosService} from '../servicio-prospectos.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  esadmin:boolean;
  rol:string;

  constructor(private router:Router,private serviciocomponent:ServicioProspectosService) { 
  
  }


  inciarSesion(){
    sessionStorage.clear()
    this.router.navigate(['/']);
  }
  
  captura(){
    this.router.navigate(['/captura']);
  }
  
  listado(){
    this.router.navigate(['/listado']);
  }
  evaluacion(){
    this.router.navigate(['/evaluacion']);
  }
  
  

  ngOnInit(): void {
    this.esadmin=false;
    this.rol=sessionStorage.getItem('Rol');
    console.log(this.rol);
    if(sessionStorage.getItem('Rol')=='1'){
      console.log("el rol es promotor");
    }

   
  };

  
}
