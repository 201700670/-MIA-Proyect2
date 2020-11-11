import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { ConfirmarCorreoComponent } from './components/confirmar-correo/confirmar-correo.component';
import { CRUDComponent } from "./components/crud/crud.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegistroComponent } from './components/registro/registro.component';
import { RecuperarContraComponent } from './components/recuperar-contra/recuperar-contra.component'
import { PublicacionesComponent } from './components/publicaciones/publicaciones.component';
import { ProductGuard } from './guard/product.guard';
import { PerfilClienteComponent } from './components/perfil-cliente/perfil-cliente.component';
import { SecurityGuard } from './guard/security.guard';
import { ProductoComponent } from './components/producto/producto.component';
import { InicioComponent } from './components/administrador/inicio/inicio/inicio.component';
import { CarritoComponent } from './components/carritoCompras/carrito/carrito.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'crud',
    component: CRUDComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'user/confirmacion/:id',
    component: ConfirmarCorreoComponent
  }, {
    path: 'recuperarContra/:id',
    component: RecuperarContraComponent
  },
  {
    path: 'Publicacion',
    component:  PublicacionesComponent,
  },
  {
    path: 'Carrito',
    component:  CarritoComponent,
  },
  {
    path: 'PerfilCliente',
    component:PerfilClienteComponent,
    canActivate:[SecurityGuard],
  },
  {
    path: 'admin',
    component:InicioComponent,
  },
  {
    path: 'ProductoCliente',
    component:ProductoComponent,
    canActivate:[ProductGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
