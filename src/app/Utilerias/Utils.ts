import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';

const circuloR = 80;

@Injectable({
    providedIn: 'root'
  })

export class Utils {

   
    constructor(private alertController : AlertController, private loadingController: LoadingController, private toastController :  ToastController) {}
    private loading : any;
    private isLoading = false; 

    async presentLoading(mensaje : string) {
       return await this.loadingController.create({
        message: mensaje,
        cssClass: "loading-wrapper"
      }).then(a => {
        a.present().then(() => {
          console.log('presented');
          if (!this.isLoading) {
             a.dismiss().then(() => console.log('abort presenting'));
          }
        });
      });
    }

    async cerrarLoading()
    {
        this.isLoading = false;
        return await this.loadingController.dismiss().then(() => console.log('loading dismissed'));
    }
  
    async muestraToast(mensaje : string) {
        const toast = await this.toastController.create({
        message: mensaje,
        duration: 2000,
        
      });
      toast.present();
    }

    async muestraAlert(mensaje:string){
      const alert = await this.alertController.create({
        header: '',
        subHeader: mensaje,
        message: '',
        buttons: ['OK']
      });
  
      await alert.present();
    }
  }