import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'principal', loadChildren: './principal/principal.module#PrincipalPageModule' },
  { path: 'principal/:id', loadChildren: './acuerdos/acuerdos.module#AcuerdosPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'registro', loadChildren: './registro/registro.module#RegistroPageModule' },
  { path: 'acuerdos', loadChildren: './acuerdos/acuerdos.module#AcuerdosPageModule' },
  { path: 'acuerdos-detalle', loadChildren: './acuerdos-detalle/acuerdos-detalle.module#AcuerdosDetallePageModule' },
  //{ path: 'acuerdos-detalle/:id', loadChildren: './acuerdos-detalle/acuerdos-detalle.module#AcuerdosDetallePageModule' },
  //{ path: 'acuerdos/:id', loadChildren: './acuerdos/acuerdos.module#AcuerdosPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
