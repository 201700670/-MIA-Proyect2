import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CarroService } from 'src/app/services/carro.service';
import { CorreoService } from 'src/app/services/correo.service';
import { UploadService } from 'src/app/services/upload.service';
import { Perfil } from '../models/perfil';
import { Producto } from '../models/producto';
import { Venta } from '../models/venta';
import { Categoria } from '../producto/crud-producto/agregar/agregar.component';
import { DetallecompletoComponent } from '../producto/crud-producto/detalles/detallecompleto/detallecompleto.component';

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
  constructor(public dialog: MatDialog, private carroService: CarroService, private route: Router, private http: HttpClient, private active: ActivatedRoute, private userService: UploadService) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 450) ? 1 : 2;

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
    this.dialog.open(DetallecompletoComponent, {
      data: this.allProduct[item]
      
    });
  }
  addCarritoProducto(item) {
    if(confirm('Deseas agregar este producto a tu carrito de compras?')){
      this.carroService.VerificarProducto(this.allProduct[item].id,this.Usuario.id).subscribe((res:Venta) => {
        if(res.id!=0){
          alert("Ya se encuentra este producto en tu carrito de compras");
        }else{
          this.carroService.getIdCarrito(this.Usuario.id).subscribe((res:Venta) => {
              let idCompra=res.id
              this.carroService.AddCarrito(this.allProduct[item].precio, this.allProduct[item].id,idCompra).subscribe((res) => {
                alert(res)
            })
          })
        }
      });
    }
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
    } else {
      alert("Seleccione una categoría!! ")
    }
  }
  PalabrasClaveMostrar() {
    if (this.fruits != null) {
      this.allProduct = null
      for (let index = 0; index < this.fruits.length; index++) {
        const palabra = this.fruits[index];
        console.log(palabra)
        this.userService.ClavePublicacion(this.Usuario.id, palabra).subscribe((res: Producto[]) => {
          
          for (let i = 0; i < res.length; i++) {
            const element = res[i];
            if (this.allProduct == null) {
              this.allProduct = [element];
            } else {
              for (let x = 0; x < this.allProduct.length + 1; x++) {
                if (this.allProduct[x] != null ) {
                  console.log(this.allProduct[x].nombre.trim()+" = "+element.nombre.trim())
                  if (this.allProduct[x].id == element.id && this.allProduct[x].nombre == element.nombre && this.allProduct[x].palabras_clave == element.palabras_clave) {
                    console.log("ya fue ingresado")
                    return;
                  } 
                } else {
                  this.allProduct[x]=element;
                  this.allProduct[x].id = element.id
                  this.allProduct[x].categoria = element.categoria
                  this.allProduct[x].detalle_producto = element.detalle_producto
                  this.allProduct[x].estado = element.estado
                  this.allProduct[x].foto = element.foto
                  this.allProduct[x].nombre = element.nombre
                  this.allProduct[x].palabras_clave = element.palabras_clave
                  this.allProduct[x].precio = element.precio
                  return;
                  //this.allProduct=[element];
                }
              }
            }
          }
        });
      }
    } else {
      alert("Ingrese palabras claves!! ")
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
