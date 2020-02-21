
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'

const circuloR = 80;

@Injectable({
    providedIn: 'root'
  })

export class Preferences {
  constructor(private storage : Storage){

  }

   async setValue(nombreCampo:string , valor : any){ 
      const result  =  await this.storage.set(nombreCampo , valor);
      return result;
  }

  async getValue(nombreCampo: string){
    const result = await this.storage.get(nombreCampo);
    return result;
  }

  async RemoveValue(nombreCampo: string){
    return  await this.storage.remove(nombreCampo);
   }
  imprimir (){
    this.storage.forEach( (value, key, index) => {
      console.log("This is the value", value)
      console.log("from the key", key)
      console.log("Index is" ,index)
    })

  }


}
