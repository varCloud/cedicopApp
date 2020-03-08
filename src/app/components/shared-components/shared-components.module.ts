import { IonicModule } from '@ionic/angular';
import { MaterialComponent } from './../material/material.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [MaterialComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [MaterialComponent]
})
export class SharedComponentsModule { }
