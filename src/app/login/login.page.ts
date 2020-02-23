import { environment } from './../../environments/environment';
import { Utils } from './../Utilerias/Utils';
import { Preferences } from './../Utilerias/Preferences';
import { LoginService } from './../Servicios/login.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

//para navegar entre paginas
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage  {

  splash = true;
  tabBarElement: any;
  usuario : String;
  pass : String;
  data : any ;
  constructor(private wsLogin: LoginService,
              public toastController: ToastController,
              private router:Router,
              private preferences: Preferences,
              private utils: Utils) {
                console.log("constructor");
                //this.tabBarElement = document.querySelector('.tabbar');
                //console.log(this.tabBarElement);
                setTimeout(() => {  this.splash = false;  }, 3700);
                //this.preferences.imprimir();
              }

  

  ionViewDidLoad(){
    console.log("ionViewDidLoad TIMEOUT")
  }
 

  
  alClickIniciarSesion(){
    if (this.usuario === ''){
      this.utils.muestraToast('Este campo no puede estar vacio');
      return;
    }

    if(this.pass === ''){
      this.utils.muestraToast('Este campo no puede estar vacio');
      return;
    }
      this.utils.presentLoading("Cargando ...")
      this.wsLogin.validaSocio(this.usuario , this.pass).subscribe(data=>{
          this.data = data;
          if(this.data.Estatus == 200){
            this.LanzaPrincipal()
          }else{
                this.utils.muestraToast(this.data.Mensaje);
          }
      },err=> {
          console.log(err);
          this.utils.cerrarLoading();
          this.utils.muestraToast(JSON.stringify(err));
      })

  }

  alClickRegistrase()
  {
    this.router.navigateByUrl('registro');
  }

  async LanzaPrincipal()
  {
    await this.preferences.setValue("socio",this.data.Model);
    this.router.navigateByUrl('principal');
  }

}
