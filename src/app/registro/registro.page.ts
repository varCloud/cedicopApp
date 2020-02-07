
import { Utils } from './../Utilerias/Utils';
import { Preferences } from './../Utilerias/Preferences';
import { LoginService } from './../Servicios/login.service';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {


  registro : any;
  data : any;

  constructor(private servicioLogin : LoginService ,
     private router :Router ,
      private HttpClient: HttpClient ,
      private preferences: Preferences,
      private utils: Utils) { }

  ngOnInit() {
      this.registro = {IdSocio :"" , Contrasena:"" , ConfirmContrasena :""}  
  }

  alClickRegistrarse() {
    this.utils.presentLoading("Cargando ..!!");
     console.log(this.registro);
    this.servicioLogin.RegistarSocio(this.registro).subscribe(data => {
       this.utils.cerrarLoading();
       this.data = data;
        console.log(this.data)
        if(this.data.Estatus == 200)
        {
            this.preferences.setValue("bienvenido",false)
            this.preferences.setValue("socio",this.data.Model);
            this.router.navigateByUrl('/principal');
        }else{
              this.utils.muestraAlert(this.data.Mensaje);
              this.router.navigateByUrl('login');
              
        }
    },err => {
        this.utils.cerrarLoading();
    })
    
  }

}
