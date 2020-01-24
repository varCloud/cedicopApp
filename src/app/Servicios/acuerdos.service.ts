

import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AcuerdosService {


  metodoObtenerAcuerdo : String = "ObtenerAcuerdosSocio";
  metodoVotarAcuerdo : string  = "VotarAcuerdo"
  url : string;
  acuerdo : any;
 
  constructor(private httpCliente : HttpClient) { 
    
  }

  ObtenerAcuerdos(idAsamblea,idSocio){
    this.url = environment.urlServicios+environment.ControladorWsWsAcuerdos+this.metodoObtenerAcuerdo
    //let postData = "IdAsamblea="+idAsamblea+"&idSocio="+idSocio;

    let postData = {"IdAsamblea":idAsamblea ,"idSocio":idSocio}
    return this.httpCliente.post(this.url , postData)

   }

   VotarAcuerdos(item){
     this.acuerdo = item;
     console.log( this.acuerdo);
     this.url = environment.urlServicios+environment.ControladorWsWsAcuerdos+this.metodoVotarAcuerdo
     let postData = "IdAsamblea="+this.acuerdo.IdAsamblea+"&IdAcuerdo="+ this.acuerdo.IdAcuerdo+"&AFavor="+this.acuerdo.votosAFavor+"&Encontra="+ this.acuerdo.votosEnContra+"&IdSocio=1";

   
    return this.httpCliente.post(this.url , postData,{
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })

   }

}
