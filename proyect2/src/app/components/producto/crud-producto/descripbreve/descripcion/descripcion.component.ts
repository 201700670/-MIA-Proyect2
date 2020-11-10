import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from 'src/app/components/models/producto';

@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.component.html',
  styleUrls: ['./descripcion.component.css']
})
export class DescripcionComponent implements OnInit {
  
  constructor(public dialogRef: MatDialogRef<DescripcionComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Producto) { }

  ngOnInit(): void {
  }
}
