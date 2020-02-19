import { AlertController } from '@ionic/angular';
import { AcuerdosService } from './../Servicios/acuerdos.service';
import { Router,  NavigationExtras, ActivatedRoute } from '@angular/router';
import { Component, OnInit  } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Utils } from './../Utilerias/Utils'


//import {  } from 'rxjs'
const circuloR = 80;
const circuloArray = 2 * Math.PI * circuloR



@Component({
  selector: 'app-acuerdos-detalle',
  templateUrl: './acuerdos-detalle.page.html',
  styleUrls: ['./acuerdos-detalle.page.scss'],
})
export class AcuerdosDetallePage implements OnInit    {

  socio : any;
  acuerdo : any; 
  estatus : any;
  votoArribaBlack : string;
  votoAbajoBlack : string;
  descripcionAcuerdo : string ; 
 
  time: BehaviorSubject<string> =  new BehaviorSubject('00:00')
  percent : BehaviorSubject<number> = new BehaviorSubject(100);
  timer :number // segundos
  intervarl;
  duracion = 10;
  circuloR= circuloR;
  circuloArray = circuloArray
  afavor : boolean = false
  enContra : boolean = false;

  constructor(private alertController :  AlertController ,private router : Router , private acuerdoServicio : AcuerdosService, private utils : Utils) { 
    this.votoAbajoBlack = "assets/img/votoAbajoBlack.png";
    this.votoArribaBlack = "assets/img/votoArribaBlack.png";
  }

  ngOnInit() {

    
    if(this.router.getCurrentNavigation().extras.state){

      this.acuerdo =  this.router.getCurrentNavigation().extras.state.acuerdo;
      this.socio = this.router.getCurrentNavigation().extras.state.socio;
      this.descripcionAcuerdo = this.acuerdo.Descripcion;
      console.log(this.acuerdo);
      console.log("IdSocio: "+this.socio.IdSocio)
    }
    this.startTimer(this.duracion);
  }
 

  alClickAceptar(){
    clearInterval(this.intervarl);
    this.utils.presentLoading("procesando su voto.");
    this.acuerdo.votosAFavor = this.afavor;
    this.acuerdo.votosEnContra = this.enContra;
    this.acuerdoServicio.VotarAcuerdos(this.acuerdo,this.socio.IdSocio).subscribe(data =>{
          this.estatus  = data;
          console.log(data);
          this.utils.cerrarLoading();
          if (this.estatus.Estatus == 200){
               console.log(this.estatus.Mensaje);
              var alert = this.alertController.create({
                header: this.estatus.Mensaje,
                subHeader: '',
                message: '',
                buttons: [
                  {
                    text: 'Aceptar',
                    role: 'Aceptar',
                    cssClass: 'secondary',
                    handler: (blah) => {
                    let navigationExtras : NavigationExtras ={
                      state :
                      {
                       acuerdo : this.acuerdo
                      }
                    }
                     this.router.navigate(['/acuerdos'],navigationExtras);
                    }
                  }
                ]
              });
              alert.then( t => t.present());
              
          }
    },err => {
      this.utils.cerrarLoading();
      this.utils.muestraToast('Espere un momento y vuelva a intentarlo');
      console.log(err);
      
   });

  }
  alClickVoto(){
    this.afavor = true;
    this.enContra = false;
    this.votoAbajoBlack = "assets/img/votoAbajoBlack.png";
    this.votoArribaBlack = "assets/img/votoArribaBlue.png";
  }

  alClickNoVoto(){
    this.afavor = false;
    this.enContra = true;
    this.votoAbajoBlack = "assets/img/votoAbajoRed.png";
    this.votoArribaBlack = "assets/img/votoArribaBlack.png";
  }

  startTimer(duration : number)
  {
    clearInterval(this.intervarl);
    this.timer =  duration;
    this.updateTimeValue();
    this.intervarl = setInterval(()=>{
                        this.updateTimeValue();
                    },1000);  
  }

  stopTimer()
  {
    clearInterval(this.intervarl);
    this.time.next('00:00');

  }

  updateTimeValue(){

    let minutos : any =  this.timer / 60;
    let segundos : any = this.timer % 60;

    minutos  = String('0' + Math.floor(minutos)).slice(-2);
    segundos  = String('0' + Math.floor(segundos)).slice(-2);

    const text  =  minutos + ':'  + segundos;
    this.time.next(text);

    const totalTime = this.duracion 
    const percentage  = ((totalTime - this.timer) / totalTime) * 100;
    this.percent.next(percentage);

    --this.timer;
    
    if(this.timer < 0)
    {
      console.log("timer: "+this.stopTimer);
      this.stopTimer();
      if(!this.afavor && !this.enContra )
      {
        this.enContra = true;
      }
      this.acuerdo.votosAFavor = this.afavor;
      this.acuerdo.votosEnContra = this.enContra;
      this.alClickAceptar()

    }
    
  }

  porcentageOffset(percent){
    const percentFloat = percent / 100;
    return circuloArray * (1-percentFloat);
  }
 
}
