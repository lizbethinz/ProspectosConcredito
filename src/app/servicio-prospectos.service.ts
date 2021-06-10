import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioProspectosService {
  URL="http://localhost/NuevosProspectos/";

  constructor(private http:HttpClient) { }

  loginUsuario(login){
    return this.http.post(`${this.URL}login.php`,JSON.stringify(login));
  }

  public postFile(imagenParaSubir: File){

		const formData = new FormData(); 
		formData.append('imagenPropia', imagenParaSubir); 
		return this.http.post(`${this.URL}/cargarDocto.php`, formData);

  }

  guardarProspecto(guardar){
    return this.http.post(`${this.URL}guardarProspecto.php`,JSON.stringify(guardar));
  }

  rechazarProspecto(motivoRechazo: string, id: string){
      return this.http.get(`${this.URL}rechazarProspecto.php?motivoRechazo=${motivoRechazo}&id=${id}`);
  }

  aceptarProspecto(id:string){
    return this.http.get(`${this.URL}AceptarProspecto.php?id=${id}`);
  }

  BusquedaProspecto(busqueda: string){
    return this.http.get(`${this.URL}/BusquedaProspecto.php?busqueda=${busqueda}`);
  }

  busquedaDocumentos(busqueda: string){
    return this.http.get(`${this.URL}/busquedaDocumentos.php?busqueda=${busqueda}`);
  }

  guardarDocumentosServer(guardar){
    return this.http.post(`${this.URL}guardarDocumentosServer.php`,JSON.stringify(guardar));
  }

  obtenerProspectos() {
    return this.http.get(`${this.URL}/getProspectos.php`);
  }

  obtenerProspectosAEvaluar() {
    return this.http.get(`${this.URL}/getProspectosAEvaluar.php`);
  }


}
