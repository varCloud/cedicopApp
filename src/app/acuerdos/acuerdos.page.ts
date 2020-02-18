import { Utils } from './../Utilerias/Utils';
import { Component, OnInit } from '@angular/core';

import {  ActivatedRoute , Router , NavigationExtras} from '@angular/router'; // para recibir parametros
import { AcuerdosService } from './../Servicios/acuerdos.service'



@Component({
  selector: 'app-acuerdos',
  templateUrl: './acuerdos.page.html',
  styleUrls: ['./acuerdos.page.scss'],
})
export class AcuerdosPage implements OnInit {

  socio : any;
  asamblea : any;
  acuerdos : any;
  acuerdo : any ;
  intervarl;
  constructor(private route : ActivatedRoute ,
              private router : Router,
              private servicioAcuerdos : AcuerdosService,
              private utils : Utils) { }

  ngOnInit() {
      /*this.route.paramMap.subscribe((params) =>{
          let parametros = params.get('id');
          console.log(parametros);
      });
      */
     console.log("OnIniti: AcuerdosPage");
     if(this.router.getCurrentNavigation().extras.state){
        this.asamblea =  this.router.getCurrentNavigation().extras.state.asamblea;
        this.socio = this.router.getCurrentNavigation().extras.state.socio;
        console.log("idAsamble: "+this.asamblea.IdAsamblea);
        console.log("idSocio: "+this.socio.IdSocio);
     }
    
  }

  ionViewWillEnter()
  {
     this.ObtenerAcuerdos();
     console.log("ionViewWillEnter: AcuerdosPage");
     console.log(this.asamblea);
     if(this.asamblea !== "undefined"){
      this.initInteval();
    }
  }
  ionViewWillLeave(){
    clearInterval(this.intervarl);
   }


  ObtenerAcuerdos()
  {
    this.servicioAcuerdos.ObtenerAcuerdos(this.asamblea.IdAsamblea,this.socio.IdSocio).subscribe(data =>{
        this.acuerdos = data;
        console.log(data);
    })
  }

  alClickMuestraAcuerdoDetalle(item)
  {
    clearInterval(this.intervarl);

    this.acuerdo = item;
    if (this.acuerdo.activarVotacion){
      if(this.acuerdo.fueVotado){
        this.utils.muestraToast("Lo sentimos, ya haz emitido tu voto");
        this.initInteval();
      }else{
        let navigationExtras: NavigationExtras = {
          state: {
            acuerdo: this.acuerdo,
            socio: this.socio
          }
        };
        this.router.navigate(['/acuerdos-detalle'], navigationExtras);
      }
   }else{
     this.utils.muestraToast("El acuerdo aun no ha sido activado");
     this.initInteval();
   }

  }

  initInteval()
  {
    this.intervarl = setInterval(()=>{
      this.ObtenerAcuerdos();
    },4000);
  }
  
  Regresar(){
    console.log("Regresar");

  }




}
