import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  RegistrarSocio : string  = "RegistrarSocio" 
  ValidaSocio : string  = "ValidaSocio" 

  url : string
  private registro : any;
  constructor(private httpClient : HttpClient   ) {
      
   }

   private crearUrl(metodo : string )
   {
      return  environment.urlServicios+environment.ControladorWsSocio+ metodo;
   }

   validaSocio(idSocio , contrasena){

      let postData = "IdSocio="+idSocio+"&Contrasena="+contrasena 
      this.url =this.crearUrl(this.ValidaSocio)

      return this.httpClient.post(this.url,postData,{
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
   }

 
 RegistarSocio(registro){
  this.registro = registro;
  this.url =this.crearUrl(this.RegistrarSocio)
  let postData = {"IdSocio" : this.registro.IdSocio , "Contrasena" : this.registro.Contrasena};

  return this.httpClient.post(this.url,postData)
}


}
