import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Perfil } from 'src/app/components/models/perfil';
import { Producto } from 'src/app/components/models/producto';
import { Venta } from 'src/app/components/models/venta';
import { UploadService } from 'src/app/services/upload.service';
interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-modificarproducto',
  templateUrl: './modificarproducto.component.html',
  styleUrls: ['./modificarproducto.component.css']
})
export class ModificarproductoComponent implements OnInit {
  Usuario: Perfil = this.userService.getUser();
  nombre: string;
  descripcion: string;
  photoSelected: string | ArrayBuffer;
  isChecked = false;
  uploadedFiles: Array<File>;
  file: File;
  categoria: string;
  urlfoto: string;
  precio: number;
  venta: Venta;
  product: Producto;
  ////ESTE ME SIRVE PARA LAS PALABRAS CLAVES/////
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = [];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  //////////////////////////////////////////////
  /////////////PARA LAS CATEGORIAS///////////////
  foods: Categoria[] = [];
  ////////////////////////////////////////////

  constructor(public dialogRef: MatDialogRef<ModificarproductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto, private userService: UploadService, private route: Router, public dialog: MatDialog) {

    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }

  ngOnInit(): void {
    this.userService.ListPalabraClave().subscribe((res: Array<string>) => {
      if (res != null) {
        for (let index = 0; index < res.length; index++) {
          const element = res[index];
          this.allFruits.push(element[0])
        }
      }
    })
    this.userService.ListCategoria().subscribe((res: Array<string>) => {

      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        this.foods.push({ value: element[0], viewValue: element[0] },)
      }
    })
    this.urlfoto = this.data.foto
    this.photoSelected = this.data.foto
    this.nombre = this.data.nombre
    this.descripcion = this.data.detalle_producto
    this.precio = this.data.precio
    this.categoria = this.data.categoria
    this.userService.ListPalabraClavemodify(this.data.id).subscribe((res: string[]) => {
      this.fruits = res
    })
  }
  onPhotoSelected(event: HtmlInputEvent, e: any): void {
    e.preventDefault();
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      this.uploadedFiles = e.target.files;

      // image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
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
  /////////////ESTE METODO ES EL QUE SUBIRA EL PRODUCTO DEL VENDEDOR///////////////
  /////////////////////////////////////////////////////////////////////////////////
  Result() {

    if (this.isChecked && this.uploadedFiles != null) {
      /////////ESTE ES PARA SUBIR IMAGEN 
      let formData = new FormData();
      for (let i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
      }
      this.userService.uploadFile(formData).subscribe((res) => {
        console.log('response received is ', JSON.stringify(res));
        let temporal = JSON.stringify(res).split("\"", 4);
        let temporal2 = temporal[3].split("/")
        this.urlfoto = temporal2[4] + "/" + temporal2[5];
        if (this.nombre != "" && this.descripcion != "" && this.urlfoto != "" && this.fruits != null) {
          this.userService.modificarProducto(this.nombre, this.precio, this.urlfoto, this.descripcion, this.categoria, this.data.id)
            .subscribe((res) => {

              for (let index = 0; index < this.fruits.length; index++) {
                const palabra = this.fruits[index];
                console.log(palabra)
                this.userService.AddPalabraClave(palabra, this.data.id).subscribe((res) => {
                });
              }
              alert(res['msg'])
              this.route.navigate(["ProductoCliente"]);
              this.dialog.closeAll();
            })
        } else {
          alert("Llenar todos los campos")
        }
      });
    } else {
      if (this.nombre != "" && this.descripcion != "" && this.urlfoto != "" && this.fruits != null) {
        ////////ESTE NO SUBE IMAGEN SOLO MODIFICA LOS DATOS
        this.userService.modificarProducto(this.nombre, this.precio, this.urlfoto, this.descripcion, this.categoria, this.data.id)
          .subscribe((res) => {

            for (let index = 0; index < this.fruits.length; index++) {
              const palabra = this.fruits[index];
              this.userService.AddPalabraClave(palabra, this.data.id).subscribe((res) => {
              });
            }

            alert(res['msg'])
            
          })
        this.dialog.closeAll();
        location.reload();
      } else {
        alert("Llenar todos los campos")
      }
    }
  }
}
export interface Categoria {
  value: string;
  viewValue: string;
}