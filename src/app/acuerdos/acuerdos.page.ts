import { Utils } from './../Utilerias/Utils';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router , NavigationExtras} from '@angular/router'; // para recibir parametros
import { AcuerdosService } from './../Servicios/acuerdos.service'
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
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
        console.log("idAsamble: "+this.asamblea.IdAsamblea);
        console.log("idSocio: "+this.socio.IdSocio);
     }
    
  }
  
  verPDF(){
    let filePath = this.file.applicationDirectory+'www/assets'
    this.utils.muestraToast("Abriendo el documento.")
    if (this.platform.is('android')){
        let AuxFilePath = Date.now();
        this.file.copyFile(filePath,'portafolio.pdf',this.file.dataDirectory,AuxFilePath+'.pdf').then( result => {
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
    let documentoADescargar = 'http://www.bluecloud.com.mx/2020/proyectos/portafolio.pdf';
    let path = this.file.dataDirectory;
    const transfer = this.fileTransefer.create();

    transfer.download(documentoADescargar, path + 'archivo.pdf').then( entry => {
       this.utils.muestraToast("Descargando");
       this.utils.muestraToast("url" +JSON.stringify(entry));
       let url = entry.toUrl();
       
        this.utils.muestraToast("url" +JSON.stringify(url));
        if (this.platform.is('ios')){
            this.document.viewDocument(url,'application/pdf',{})
        }else{
             this.fileOpener.open(url,'application/pdf')
        }
        }).catch((error)  => {
          console.log(error);
           this.utils.muestraToast("error descargar" +JSON.stringify(error));
        });
        
    //this.utils.muestraToast("Fin de  descargando el documento.")

  }


  ionViewWillEnter()
  {
     this.ObtenerAcuerdos();
     console.log("ionViewWillEnter: AcuerdosPage");
     console.log(this.asamblea);
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
