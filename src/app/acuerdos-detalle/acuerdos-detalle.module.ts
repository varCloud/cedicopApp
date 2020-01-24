import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AcuerdosDetallePage } from './acuerdos-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: AcuerdosDetallePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AcuerdosDetallePage]
})
export class AcuerdosDetallePageModule {}
