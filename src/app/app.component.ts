import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { LoginPage } from './login/login.page';
import { timer } from 'rxjs/observable/timer'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  showSplash   = true;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router : Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //this.statusBar.styleBlackTranslucent();
      this.statusBar.backgroundColorByHexString("#ba002a")
      this.splashScreen.hide();
      //this.router.navigateByUrl("login")
      // para que despues del splash por default muestre alguna animacion
      //this.showSplash = false
      timer(4000).subscribe(()=> this.showSplash = false)
  
    });
  }
}
