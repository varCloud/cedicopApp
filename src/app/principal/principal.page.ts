import { Utils } from './../Utilerias/Utils';
import { Preferences } from './../Utilerias/Preferences';
import { ToastController, AlertController, MenuController  } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import {AsambleasService} from '../Servicios/asambleas.service'

//para navegar entre paginas
import { Router , NavigationExtras  } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  asambleas : any ;
  id: string;
  path : string;
  asamblea : any;
  socio : any;
  nombre : string;

  constructor( private router:Router , 
    public asambleasService : AsambleasService, 
    private toastController : ToastController,
    private alertController: AlertController,
    private preferences : Preferences,
    private utils : Utils,
    private menu: MenuController) {


  }
  MuestraMenu() {
    
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  ngOnInit() {
      this.MuestraAsamblea()
      this.preferences.getValue("socio").then((val)=>{
        this.socio = val;
        console.log("socio: "+JSON.stringify(this.socio));
        if(this.socio != null){
             this.nombre =this.socio.Nombre.charAt(0)+this.socio.Apellidos.charAt(0);;
        }else{
          console.log("No existe socio Registrado")
        }
       
      })


  }

  ionViewWillEnter(){
      //this.menu.enable(true, 'first');
      this.preferences.getValue("bienvenido").then((val)=> {
          if (val == null){
              this.utils.muestraAlert("Bienvenido "+this.socio.Nombre+" "+this.socio.Apellidos);
              this.preferences.setValue("bienvenido", true);
          }
      });
  }

  MuestraAsamblea(){
        this.asambleasService.ObtenerAsambleas().subscribe(data =>{
            this.asambleas = data;
        })
  }

  DetalleAsamblea(item){
    this.asamblea = item;
     
     if (item.EstatusAsamblea ==2){
       this.presentAlertMultipleButtons();
     }else{
        var toast = this.toastController.create({
            message: 'Esta Asamblea aun no ha sido activada',
            duration: 2000
          })
        toast.then( t => t.present());
     }
  }

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      header: 'Estas apunto de iniciar la votacion de los acuerdos',
      subHeader: '',
      message: '',
      buttons: [
        {
          text: 'Cancel',
        }, {
          text: 'Iniciar',
          handler: () => {

           let navigationExtras: NavigationExtras = {
              state: {
                asamblea: this.asamblea
              }
            };
            this.router.navigate(['/acuerdos'], navigationExtras);
            //this.router.navigate(['/acuerdos',this.asamblea.IdAsamblea])

          }
        }
      ]
    });

    await alert.present();
  }

}
