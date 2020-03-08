import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { Platform } from '@ionic/angular';
import { File , FileEntry} from '@ionic-native/file/ngx';
import { FileTransfer  } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { environment } from './../../environments/environment';

const circuloR = 80;

@Injectable({
    providedIn: 'root'
  })

export class Utils {

   
    constructor(
       private alertController : AlertController,
       private loadingController: LoadingController,
       private toastController :  ToastController,
       private document : DocumentViewer,
       private file : File ,
       private fileTransefer : FileTransfer,
       private fileOpener : FileOpener,
       private platform : Platform
       ) {}
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


    descargarDocumento(nombreDocumento : string , pathDocuemntoServer : string)
  {
    
    this.presentLoading("Abriendo documento...")
    let documentoADescargar = environment.urlServidor + pathDocuemntoServer;
    console.log("Documento a Descargar:", documentoADescargar);
    let path = this.file.dataDirectory;
    //let nombreDocumento = this.asamblea.MaterialPDF.nombreDoc;
    const transfer = this.fileTransefer.create();
    
    this.file.checkFile(this.file.dataDirectory,  nombreDocumento)
    .then(result => {
        console.log("result checkFile: ",JSON.stringify(result))
        console.log("pathDocumentoExiste: ",this.file.dataDirectory+nombreDocumento)
        if(this.platform.is('ios')){
             this.document.viewDocument(this.file.dataDirectory+nombreDocumento,'application/pdf',{})
        }else{
             this.fileOpener.open(this.file.dataDirectory+nombreDocumento,'application/pdf')
        }
    }).catch(err =>{
    
        console.log('Directory doesn exist', JSON.stringify(err));
        transfer.download(documentoADescargar, path + nombreDocumento)
        .then((entry : FileEntry) => {
              //console.log("nativeURL: ", entry.nativeURL)
              //console.log("entry : " +JSON.stringify(entry));
              let url = entry.toURL();
              //console.log("url : " +JSON.stringify(url));
              if (this.platform.is('ios')){
                    this.document.viewDocument(url,'application/pdf',{})
              }else{
                    this.fileOpener.open(url,'application/pdf')
                    .then(() => {
                          //console.log("File is opened")
                          this.cerrarLoading();
                      })
                    .catch(e => {
                            //console.log("Error opening file", e)
                            this.cerrarLoading()
                      });
                }
         })
        .catch((error)  => {
                  this.cerrarLoading()
                  console.log("error de descargar" +error);
                  this.muestraToast("error descargar" +JSON.stringify(error));
         });
      })
  }
  }