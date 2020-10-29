import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})


export class HomeComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
      label: 'Login',
      icon: 'login',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true,
      ruta: 'login'
    },
    {
      label: 'Home',
      icon: 'home',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      ruta: '#'
    }
  ];
 




  title = 'app';
  images: string[] = [
    "https://i.pinimg.com/originals/6c/26/24/6c262447e1b451a73d68c45729811f18.png",
    "https://picsum.photos/id/60/1000/700",
    "https://decortips.com/es/wp-content/uploads/2019/01/decoracion-hogar-detalles-naturales.jpg",
    "https://dam.cocinafacil.com.mx/wp-content/uploads/2018/09/utensilios-para-cocinar-cocina-facil-stage-add-.jpg"

  ];
  
  
  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 3000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;

    var a = document.getElementById('mylink');
    var str=this.menuItems[0].ruta
    var result = str.link("https://www.w3schools.com");
  }
  myFunction() {
    if(this.menuItems.find(x=>x.ruta == "login").ruta=="login"){
    var str = this.menuItems[0].label
   var result = str.link(this.menuItems[0].ruta);
  alert(document.getElementById("demo").nodeValue )
    }
    }
  ngOnInit(): void {
  }

}

export interface MenuItem {
  label: string;
  icon: string;
  showOnMobile: boolean;
  showOnTablet: boolean;
  showOnDesktop: boolean;
  ruta: string;
}