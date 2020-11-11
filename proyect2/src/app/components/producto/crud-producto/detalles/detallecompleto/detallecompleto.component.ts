import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as $ from 'jquery';
import { Perfil } from 'src/app/components/models/perfil';
import { Producto } from 'src/app/components/models/producto';
import { Venta } from 'src/app/components/models/venta';
import { CarroService } from 'src/app/services/carro.service';
import { UploadService } from 'src/app/services/upload.service';
interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-detallecompleto',
  templateUrl: './detallecompleto.component.html',
  styleUrls: ['./detallecompleto.component.css']
})
export class DetallecompletoComponent implements OnInit {
  Usuario: Perfil = this.userService.getUser();
  photoSelected: string | ArrayBuffer;
  isChecked = false;
  public estadolike: number = undefined;

  public temp: boolean;
  uploadedFiles: Array<File>;
  file: File;
  public temp1: boolean;
  public meencanta = "favorite_border"
  palabras_clave: string;
  listapalabras: string;
  constructor(public dialogRef: MatDialogRef<DetallecompletoComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Producto,public dialog: MatDialog, private userService: UploadService, private carroService:CarroService) { }

  ngOnInit(): void {
    DetallecompletoComponent.prototype.estadolike = undefined;
    this.photoSelected = this.product.foto
    this.listapalabras = "";
    this.userService.ListPalabraClavemodify(this.product.id).subscribe((res: string[]) => {
      for (let index = 0; index < res.length; index++) {
        this.listapalabras += res[index] + ", ";
      }
      this.palabras_clave = this.listapalabras;
    })


    $(function () {
      var flag = 0;
      $('.share').on('click', function () {
        if (flag == 0) {
          $(this).siblings('.one').animate({
            top: '450px',
            left: '85%'
          }, 200);
          $(this).siblings('.two').delay(200).animate({
            top: '450px',
            left: '58%'
          }, 200);
          $(this).siblings('.three').delay(300).animate({
            top: '450px',
            left: '31%'
          }, 200);
          $(this).siblings('.four').delay(300).animate({
            top: '450px',
            left: '5%'
          }, 200);
          $('.one i,.two i, .three i, .four i').delay(500).fadeIn(200);
          flag = 1;
        }
        else {
          $('.one, .two, .three, .four').animate({
            top: '450px',
            left: '5%'
          }, 200);
          $('.one i,.two i, .three i,  .four i').delay(500).fadeOut(200);
          flag = 0;
        }
      });
    });
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
  mensaje() {
    alert("si entra")
  }
  dislike() {
    let element = document.getElementById("maticon")
    $('.three').on('click', function () {
      if (DetallecompletoComponent.prototype.temp && !DetallecompletoComponent.prototype.temp1) {
        document.getElementById("dislikes").style.backgroundColor = "green";
        DetallecompletoComponent.prototype.estadolike = 2;
        console.log("activo " + DetallecompletoComponent.prototype.temp1)
        DetallecompletoComponent.prototype.temp = false
      } else {
        document.getElementById("dislikes").style.backgroundColor = "#7bff00";
        DetallecompletoComponent.prototype.estadolike = 0;
        console.log("desactivo " + DetallecompletoComponent.prototype.temp1)
        DetallecompletoComponent.prototype.temp = true;
      }
    })
  }
  like() {
    if (this.meencanta == "favorite") {
      this.meencanta = "favorite_border"
      DetallecompletoComponent.prototype.estadolike = 0;
      DetallecompletoComponent.prototype.temp1 = false
    } else if (DetallecompletoComponent.prototype.temp == true || this.temp == null) {
      this.meencanta = "favorite"
      DetallecompletoComponent.prototype.estadolike = 1;
      DetallecompletoComponent.prototype.temp1 = true
    }


  }
  addCart() {
    if (confirm('Deseas agregar este producto a tu carrito de compras?')) {
      this.carroService.VerificarProducto(this.product.id, this.Usuario.id).subscribe((res: Venta) => {
        if (res.id != 0) {
          alert("Ya se encuentra este producto en tu carrito de compras");
        } else {
          this.carroService.getIdCarrito(this.Usuario.id).subscribe((res: Venta) => {
            let idCompra = res.id
            this.carroService.AddCarrito(this.product.precio, this.product.id, idCompra).subscribe((res) => {
              if (DetallecompletoComponent.prototype.estadolike != undefined) {
                this.userService.AddComentario(this.product.id, this.Usuario.id).subscribe((res) => {
                  //console.log(res)
                })
                this.userService.AddDenuncia(this.product.id, this.Usuario.id).subscribe((res) => {
                  //console.log(res)
                })
                this.userService.getIdComentario(this.product.id, this.Usuario.id).subscribe((res: Venta) => {
                  //console.log(res.id)
                  let idComentario = res.id
                  this.userService.getIdDenuncia(this.product.id, this.Usuario.id).subscribe((res: Venta) => {
                    //console.log(res.id)
                    let idDenuncia = res.id
                    this.userService.addPublicacion(DetallecompletoComponent.prototype.estadolike, 1,
                      this.product.id, idComentario, idDenuncia).subscribe((res) => {
                        //alert(res);
                      })
                  })
                })
          
              }
              alert(res)
              this.dialog.closeAll();
            })
          })
        }
      });
    }

  }
  terminar() {
    if (DetallecompletoComponent.prototype.estadolike != undefined) {
      this.userService.AddComentario(this.product.id, this.Usuario.id).subscribe((res) => {
        //console.log(res)
      })
      this.userService.AddDenuncia(this.product.id, this.Usuario.id).subscribe((res) => {
        //console.log(res)
      })
      this.userService.getIdComentario(this.product.id, this.Usuario.id).subscribe((res: Venta) => {
        //console.log(res.id)
        let idComentario = res.id
        this.userService.getIdDenuncia(this.product.id, this.Usuario.id).subscribe((res: Venta) => {
          //console.log(res.id)
          let idDenuncia = res.id
          this.userService.addPublicacion(DetallecompletoComponent.prototype.estadolike, 1,
            this.product.id, idComentario, idDenuncia).subscribe((res) => {
              //alert(res);
            })
        })
      })

    }
  }
}
