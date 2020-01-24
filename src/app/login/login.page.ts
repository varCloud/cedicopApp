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
              private preferences: Preferences) { }

  ngOnInit() {

  }

  alClickIniciarSesion(){
      console.log("usuario "+this.usuario+" pass: "+this.pass)
      this.wsLogin.validaSocio(this.usuario , this.pass).subscribe(data=>{
         console.log(data);
        this.data = data;
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
      })

  }


  alClickRegistrase()
  {
    this.router.navigateByUrl('registro');
  }

}
