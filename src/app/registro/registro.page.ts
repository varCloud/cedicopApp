
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
    if (this.registro.IdSocio === ''){
      this.utils.muestraToast('Este campo no puede estar vacio');
      return;
    }

    if(this.registro.Contrasena === ''){
      this.utils.muestraToast('Este campo no puede estar vacio');
      return;
    }

    if(this.registro.ConfirmContrasena === ''){
      this.utils.muestraToast('El campo Confirmar Contraseña no puede estar vacio');
      return;
    }

    if(this.registro.ConfirmContrasena !== this.registro.Contrasena){
      this.utils.muestraToast('Las contraseñas no coinciden');
      return;
    }


    this.utils.presentLoading("Cargando ..!!");
    this.servicioLogin.RegistarSocio(this.registro).subscribe(data => {
       this.utils.cerrarLoading();
       this.data = data;

        if(this.data.Estatus == 200)
        {
            console.log(this.data)
            this.preferences.setValue("bienvenido",false).then(result =>{
              this.preferences.setValue("socio",this.data.Model).then(res=> {
                  this.router.navigateByUrl('/principal');
              });
            })
          
        }else{
              this.utils.muestraAlert(this.data.Mensaje);
              this.router.navigateByUrl('login');
              
        }
    },err => {
        this.utils.muestraToast(JSON.stringify(err));
        this.utils.cerrarLoading();
    })
    
  }

}
