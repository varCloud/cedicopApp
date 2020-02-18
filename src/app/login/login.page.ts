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

export class LoginPage implements OnInit {


  usuario : String;
  pass : String;
  data : any ;
  constructor(private wsLogin: LoginService,
              public toastController: ToastController,
              private router:Router,
              private preferences: Preferences,
              private utils: Utils) { }

  ngOnInit() {

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
      console.log("usuario "+this.usuario+" pass: "+this.pass)
      this.wsLogin.validaSocio(this.usuario , this.pass).subscribe(data=>{
         console.log(data);
        this.data = data;
        this.utils.cerrarLoading();
        if(this.data.Estatus == 200){
          this.preferences.setValue("socio",this.data.Model);
          this.router.navigateByUrl('principal');
        }else{
              var toast = this.toastController.create({
                  message: this.data.Mensaje,
                  duration: 2000
                })
                toast.then( t => t.present());
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

}
