import { LoginService } from './../Servicios/login.service';
import { Utils } from './../Utilerias/Utils';
import { Preferences } from './../Utilerias/Preferences';
import { ToastController, AlertController, MenuController  } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import {AsambleasService} from '../Servicios/asambleas.service'
import { Platform } from '@ionic/angular';

//para navegar entre paginas
import { Router , NavigationExtras  } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  
  data : any;
  asambleas : any ;
  id: string;
  path : string;
  asamblea : any;
  socio : any;
  nombre : string;
  backButtonSubscription; 

  constructor( private router:Router , 
    public asambleasService : AsambleasService, 
    private toastController : ToastController,
    private alertController: AlertController,
    private preferences : Preferences,
    private utils : Utils,
    private menu: MenuController,
    private platform : Platform,
    ) {

      this.platform.ready().then(()=> {
        console.log("onReady")
        this.MuestraAsamblea();
      });


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
     console.log("ngOnInit")
    
     
  }

  async ObtenerSocioPreferences()
  {
    await this.preferences.getValue("socio").then((val)=>{
      this.socio = val;

      if(this.socio != null){
           this.nombre =this.socio.Nombre.charAt(0)+this.socio.Apellidos.charAt(0);;
      }else{
        console.log("No existe socio Registrado")
      }
    })
    console.log("socio: "+JSON.stringify(this.socio));
    await this.preferences.getValue("bienvenido").then((val)=> {
    if (val == null || val == false){
          this.utils.muestraAlert("Bienvenido "+this.socio.Nombre+" "+this.socio.Apellidos);
          this.preferences.setValue("bienvenido", true);
      }
    });
    console.log("bienvenido...");
  
  }

  ionViewWillEnter(){
    
    this.ObtenerSocioPreferences()
    console.log("ionViewWillEnter")

 
  }

  ionViewDidLoad(){
    console.log("ionViewDidLoad pagina principal")
  }
 

  async MuestraAsamblea(){
        this.utils.presentLoading("Cargando Asambleas ...")
        let result  = await this.asambleasService.ObtenerAsambleas()
        result.subscribe(data =>{
            this.asambleas = data;
            this.utils.cerrarLoading();
        },err=> {
          this.utils.cerrarLoading();

        })

  }

  DetalleAsamblea(item){
    this.asamblea = item;
     
     if (this.asamblea.EstatusAsamblea ==2){
       this.presentAlertMultipleButtons();
     }else if(this.asamblea.EstatusAsamblea ==3){
       this.utils.muestraToast("Esta Asamblea ha finalizado")
       let navigationExtras: NavigationExtras = {
        state: {
          asamblea: this.asamblea,
          socio : this.socio
        }
      };
      this.router.navigate(['/acuerdos'], navigationExtras);
       
     }
     else{
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
          text: 'Cancelar',
        }, {
          text: 'Iniciar',
          handler: () => {
            this.utils.presentLoading("Cargando Acuerdos ...");
            this.asambleasService.registrarSocioAsamblea(this.socio.IdSocio ,  this.asamblea.IdAsamblea).subscribe(data=> {
                  this.data = data;
                  
                  if(this.data.Estatus == 200){
                    let navigationExtras: NavigationExtras = {
                      state: {
                        asamblea: this.asamblea,
                        socio : this.socio
                      }
                    };
                    this.router.navigate(['/acuerdos'], navigationExtras);
                  }else if(this.data.Estatus == -1){
                      this.utils.cerrarLoading() 
                      this.utils.muestraAlert(this.data.Mensaje);
                  }else{
                     this.utils.cerrarLoading()
                     this.utils.muestraToast("Intenta de nuevo para registrarte en la asamblea");
                  }
            }, err=> {

                  this.utils.cerrarLoading();
                  this.utils.muestraToast(JSON.stringify(err));
            })
          }
        }
      ]
    });

    await alert.present();
  }
 

  salir(){
    this.utils.muestraToast("Saliendo...!!")
    navigator['app'].exitApp();
  }

}
