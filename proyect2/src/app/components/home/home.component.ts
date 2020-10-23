import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})


export class HomeComponent implements OnInit {
  
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

    
  }

  ngOnInit(): void {
    var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
  var x1 = document.getElementById("Body");
  }

}
