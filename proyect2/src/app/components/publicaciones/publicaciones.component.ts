import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UploadService } from 'src/app/services/upload.service';
import { Perfil } from '../models/perfil';
import { Producto } from '../models/producto';
import { Categoria } from '../producto/crud-producto/agregar/agregar.component';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit {
  Usuario: Perfil = this.userService.getUser();
  breakpoint: number;
  allProduct: Producto[] = [];
  i;
  des;
  categoria: string = "";
  foods: Categoria[] = [];
  menuItems: MenuItem[] = [
    {
      label: this.Usuario.nombre + " " + this.Usuario.apellido,
      icon: 'perm_identity',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      ruta: 'PerfilCliente',
      foto: this.Usuario.foto
    }
  ];
  ////ESTE ME SIRVE PARA LAS PALABRAS CLAVES/////
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Celulares'];
  allFruits: string[] = [];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  //////////////////////////////////////////////
  constructor(public dialog: MatDialog, private serviceUpload: UploadService, private route: Router, private http: HttpClient, private active: ActivatedRoute, private userService: UploadService) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 450) ? 1 : 1;

    this.userService.mostrarPublicacion(this.Usuario.id).subscribe((res: Producto[]) => {
      this.allProduct = res;
    });
    this.userService.ListCategoria().subscribe((res: Array<string>) => {

      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        this.foods.push({ value: element[0], viewValue: element[0] },)
      }
    })

  }
  onResize(event) {
    this.breakpoint = (window.innerWidth <= 450) ? 1 : 2;
  }

  agregarProducto() {
  }
  descripcionProducto(item) {
  }
  modificarProducto(item) {
  }
  eliminarProducto(item) {
    this.userService.eliminarProducto(this.allProduct[item].id).subscribe((res) => {
      alert(res['msg'])
      location.reload();
    });

  }
  cerrarSesion() {
    localStorage.removeItem("usuarioLogeado");
    this.route.navigate(['']);
    window.localStorage.removeItem('usuarioLogeado');
    let userString = JSON.stringify(this.Usuario);
    window.localStorage.removeItem(userString);
    window.localStorage.clear();

  }
  ascendente() {
    this.allProduct = null
    this.userService.AscendentePublicacion(this.Usuario.id).subscribe((res: Producto[]) => {
      this.allProduct = res;
    });
  }
  descendente() {
    this.allProduct = null
    this.userService.DescendentePublicacion(this.Usuario.id).subscribe((res: Producto[]) => {
      this.allProduct = res;
    });
  }
  CategoriaProducto() {
    if (this.categoria != "") {
      this.allProduct = null
      this.userService.CategoriaPublicacion(this.Usuario.id, this.categoria).subscribe((res: Producto[]) => {
        this.allProduct = res;
      });
    }else{
      alert("Seleccione una categoría!! ")
    }
  }
  PalabrasClaveMostrar(){
    for (let index = 0; index < this.fruits.length; index++) {
      const palabra = this.fruits[index];
      console.log(palabra)
      
    }
  }
  ///////////////METODO ADD PARA AGREGAR LOS CHIP DE LAS PALABRAS CLAVES/////////////
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      console.log("palabra ingresada:   " + value)

      this.allFruits.push(value.trim());
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
  //////////////////////////////////////////////////////////////////////////////////
}
export interface MenuItem {
  label: string;
  icon: string;
  showOnMobile: boolean;
  showOnTablet: boolean;
  showOnDesktop: boolean;
  ruta: string;
  foto: string;
}
