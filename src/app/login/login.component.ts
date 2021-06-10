import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ServicioProspectosService} from '../servicio-prospectos.service';
import Swal from 'sweetalert2'
//import Swal from 'sweetalert2/dist/sweetalert2.js'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  
  login={
    usuario:null,
    contrasena:null
  }

  constructor(private LoginService:ServicioProspectosService,private router:Router) { }
  loginUsuario(){
    sessionStorage.clear()
    this.LoginService.loginUsuario(this.login).subscribe(
      datos=>{
        if(datos['resultado']=='OK'){

         // alert(datos['mensaje'])
          //window.GlobalVariable = datos;
          console.log(datos);
          var rol=datos['Mensaje'];
          sessionStorage.setItem('Rol', datos['mensaje'])
          sessionStorage.setItem('Correo', datos['correo'])

          this.router.navigate(['/principal'])
        }else{
          console.log(datos);
          Swal.fire('Error',datos['mensaje'] , 'warning'); 
         // alert(datos['mensaje'])
        }
      }
    );
  }

 

}
