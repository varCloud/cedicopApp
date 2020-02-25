import { environment } from './../../environments/environment';
import { Utils } from './../Utilerias/Utils';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router , NavigationExtras} from '@angular/router'; // para recibir parametros
import { AcuerdosService } from './../Servicios/acuerdos.service'
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { Platform } from '@ionic/angular';
import { File , FileEntry} from '@ionic-native/file/ngx';
import { FileTransfer  } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';




@Component({
  selector: 'app-acuerdos',
  templateUrl: './acuerdos.page.html',
  styleUrls: ['./acuerdos.page.scss'],
})
export class AcuerdosPage implements OnInit {

  socio : any;
  asamblea : any;
  acuerdos : any;
  acuerdo : any ;
  intervarl;
  constructor(private route : ActivatedRoute ,
              private router : Router,
              private servicioAcuerdos : AcuerdosService,
              private utils : Utils,
              private document : DocumentViewer,
              private file : File ,
              private fileTransefer : FileTransfer,
              private fileOpener : FileOpener,
              private platform : Platform) { 


              }

  ngOnInit() {
     console.log("OnIniti: AcuerdosPage");
     if(this.router.getCurrentNavigation().extras.state){
        this.asamblea =  this.router.getCurrentNavigation().extras.state.asamblea;
        this.socio = this.router.getCurrentNavigation().extras.state.socio;
        console.log("Asamblea: ", JSON.stringify(this.asamblea));
        console.log("idSocio: "+this.socio.IdSocio);
     }
    
  }
  
  verPDF(nombreDocumento : string){
    let filePath = this.file.applicationDirectory+'www/assets'
    this.utils.muestraToast("Abriendo el documento.")
    if (this.platform.is('android')){
        let AuxFilePath = Date.now();
        this.file.copyFile(filePath,nombreDocumento,this.file.dataDirectory,AuxFilePath+'.pdf').then( result => {
            this.fileOpener.open(result.nativeURL,'application/pdf')
        },err=>{
             this.utils.muestraToast("Error el documento."+JSON.stringify(err));
        });
    }else{ 
      const options : DocumentViewerOptions = {
            title: 'My PDF'
          }
      this.document.viewDocument(filePath+'/'+'portafolio.pdf','application/pdf',options)
    }
     
  }

  descargarDocumento()
  {
    
    this.utils.presentLoading("Abriendo documento...")
    // let documentoADescargar = 'http://www.bluecloud.com.mx/2020/proyectos/portafolio.pdf';
    let documentoADescargar = environment.urlServidor + this.asamblea.MaterialPDF.pathExpediente;
    console.log("Documento a Descargar:", documentoADescargar);
    let path = this.file.dataDirectory;
    const transfer = this.fileTransefer.create();

    this.file.checkFile(this.file.dataDirectory,  this.asamblea.IdAsamblea+'pdf')
    .then(result => {
        console.log("result checkFile: ",JSON.stringify(result))
        console.log("pathDocumentoExiste: ",this.file.dataDirectory+this.asamblea.IdAsamblea+'pdf')
        if(this.platform.is('ios')){
             this.document.viewDocument(this.file.dataDirectory+this.asamblea.IdAsamblea+'pdf','application/pdf',{})
        }else{
             this.fileOpener.open(this.file.dataDirectory+this.asamblea.IdAsamblea+'pdf','application/pdf')
        }
    }).catch(err =>{
    
        console.log('Directory doesn exist', JSON.stringify(err));
        transfer.download(documentoADescargar, path + this.asamblea.IdAsamblea+'pdf')
        .then((entry : FileEntry) => {
              this.utils.muestraToast("Descargando");
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
                          this.utils.cerrarLoading();
                      })
                    .catch(e => {
                            //console.log("Error opening file", e)
                            this.utils.cerrarLoading()
                      });
                }
         })
        .catch((error)  => {
                  this.utils.cerrarLoading()
                  console.log("error de descargar" +error);
                  this.utils.muestraToast("error descargar" +JSON.stringify(error));
         });
      })
  }


  ionViewWillEnter()
  {
     this.ObtenerAcuerdos();
     console.log("ionViewWillEnter: AcuerdosPage");
     if(this.asamblea !== "undefined"){
      this.initInteval();
    }
  }
  ionViewWillLeave(){
    clearInterval(this.intervarl);
   }


  ObtenerAcuerdos()
  {
    this.servicioAcuerdos.ObtenerAcuerdos(this.asamblea.IdAsamblea,this.socio.IdSocio).subscribe(data =>{
        this.acuerdos = data;
        //console.log(data);
    })
  }

  alClickMuestraAcuerdoDetalle(item)
  {
    clearInterval(this.intervarl);

    this.acuerdo = item;
    if (this.acuerdo.activarVotacion){
      if(this.acuerdo.fueVotado){
        this.utils.muestraToast("Lo sentimos, ya haz emitido tu voto");
        this.initInteval();
      }else{
        let navigationExtras: NavigationExtras = {
          state: {
            acuerdo: this.acuerdo,
            socio: this.socio
          }
        };
        this.router.navigate(['/acuerdos-detalle'], navigationExtras);
      }
   }else{
     this.utils.muestraToast("El acuerdo aun no ha sido activado");
     this.initInteval();
   }

  }

  initInteval()
  {
    this.intervarl = setInterval(()=>{
      this.ObtenerAcuerdos();
    },4000);
  }
  
  Regresar(){
    console.log("Regresar");

  }




}
