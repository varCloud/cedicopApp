
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'

const circuloR = 80;

@Injectable({
    providedIn: 'root'
  })

export class Preferences {
  constructor(private storge : Storage){

  }

  setValue(nombreCampo:string , valor : any){ 
      return this.storge.set(nombreCampo , valor);
  }

  getValue(nombreCampo: string){
      return this.storge.get(nombreCampo);
  }


}
