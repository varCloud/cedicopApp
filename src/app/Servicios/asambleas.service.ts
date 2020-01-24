import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})

export class AsambleasService {

  private MetodoObtenerAsambleas : string
  private url : string

  constructor(private httpClient : HttpClient) {
    this.MetodoObtenerAsambleas = 'ObtenerAsambleas/'

   }

   ObtenerAsambleas()
   {
        this.url = environment.urlServicios+environment.ControladorWsWsAsamblea+this.MetodoObtenerAsambleas;
        let postData = "idAsamblea=0";
        return this.httpClient.post(this.url,postData,{
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
   }

   ObtenerImagen()
   {
      return this.httpClient.get("https://ui-avatars.com/api/?name=John+Doe");
   }




}
