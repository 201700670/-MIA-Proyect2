import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
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
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  Usuario: Perfil = this.userService.getUser();
  nombre: string = ""
  descripcion: string = ""
  photoSelected: string | ArrayBuffer;
  isChecked = false;
  uploadedFiles: Array<File>;
  file: File;
  categoria: string = "";
  urlfoto: string = "assets/newproducto.png";
  precio: number = 0;
  venta: Venta;
  product: Producto;
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
  /////////////PARA LAS CATEGORIAS///////////////
  foods: Categoria[] = [];
  ////////////////////////////////////////////

  constructor(private http: HttpClient, private userService: UploadService) {

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
          alert(this.urlfoto)
          this.userService.addVenta(this.Usuario.id).subscribe((res) => {

          })
          this.userService.getidVenta(this.Usuario.id).subscribe((res: Venta) => {
            this.venta = res

            let idproducto;
            this.userService.AddProducto(this.nombre, this.precio, this.urlfoto, this.descripcion, 1, this.categoria).subscribe((res: Producto) => {
              this.product = res;
              this.userService.getidProducto(this.product.nombre, this.precio).subscribe((res: Venta) => {
                idproducto = res.id
                alert(idproducto)
                for (let index = 0; index < this.fruits.length; index++) {
                  const palabra = this.fruits[index];
                  console.log(palabra)
                  this.userService.AddPalabraClave(palabra, idproducto).subscribe((res) => {
                  });
                }
                this.userService.Detalle_Venta(this.precio, idproducto, this.venta.id).subscribe((res) => {
                  console.log(res);
                })
              });


            })

          })
        } else {
          alert("Llenar todos los campos")
        }
      });
    } else {
      if (this.nombre != "" && this.descripcion != "" && this.urlfoto != "" && this.fruits != null) {
        alert(this.urlfoto)
        this.userService.addVenta(this.Usuario.id).subscribe((res) => {

        })
        this.userService.getidVenta(this.Usuario.id).subscribe((res: Venta) => {
          this.venta = res

          let idproducto;
          this.userService.AddProducto(this.nombre, this.precio, this.urlfoto, this.descripcion, 1, this.categoria).subscribe((res: Producto) => {
            this.product = res;
            this.userService.getidProducto(this.product.nombre, this.precio).subscribe((res: Venta) => {
              idproducto = res.id
              alert(idproducto)
              for (let index = 0; index < this.fruits.length; index++) {
                const palabra = this.fruits[index];
                console.log(palabra)
                this.userService.AddPalabraClave(palabra, idproducto).subscribe((res) => {
                });
              }
              this.userService.Detalle_Venta(this.precio, idproducto, this.venta.id).subscribe((res) => {
                console.log(res);
              })
            });


          })

        })
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
