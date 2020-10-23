import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgotemail',
  templateUrl: './forgotemail.component.html',
  styleUrls: ['./forgotemail.component.css']
})
export class ForgotemailComponent implements OnInit {
  correo: string="";
  constructor() { }

  ngOnInit(): void {
  }

}
