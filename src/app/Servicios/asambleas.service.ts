import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})

export class AsambleasService {

  private MetodoObtenerAsambleas : string = 'ObtenerAsambleas'
  private url : string
  private RegistrarSocioAsamblea : string  = "RegitrarSocioAsambleaDesdeAPP" 

  constructor(private httpClient : HttpClient) {

   }

   private crearUrl(metodo : string )
   {
      return  environment.urlServicios+environment.ControladorWsAsamblea+ metodo;
   }
   
   async ObtenerAsambleas()
   {
        this.url = this.crearUrl(this.MetodoObtenerAsambleas);
        let postData = "idAsamblea=0";
        return  await this.httpClient.post(this.url,postData,{
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
   }

 
   
   registrarSocioAsamblea(idSocio , idAsamblea){
    this.url =this.crearUrl(this.RegistrarSocioAsamblea)
    let postData = {"IdSocio" : idSocio , "idAsamblea" : idAsamblea};
    return this.httpClient.post(this.url,postData)
 }




}
