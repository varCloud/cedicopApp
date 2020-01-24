import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  metodos: String
  url : string
  constructor(private httpClient : HttpClient   ) {
    this.metodos = "wsSocio/"
   }

   validaSocio(noSocio , contrasena){

      let postData = "NoSocio="+noSocio+"&contrasena="+contrasena 
      this.url = environment.urlServicios+this.metodos+"validaSocio";

      return this.httpClient.post(this.url,postData,{
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
   }


}
