import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CRUDComponent } from './components/crud/crud.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotemailComponent } from "./components/forgotemail/forgotemail.component";
import{ RegistroComponent} from'./components/registro/registro.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule,  ReactiveFormsModule } from "@angular/forms";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ButtonsModule} from 'angular-bootstrap-md'
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatDialogModule} from '@angular/material/dialog';
import {UploadService} from './services/upload.service'
import {HttpClientModule} from '@angular/common/http'
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { ImageUploadModule } from "angular2-image-upload";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { from } from 'rxjs';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {FlexLayoutModule} from "@angular/flex-layout";
@NgModule({
  declarations: [
    AppComponent,
    CRUDComponent,
    HomeComponent,
    LoginComponent,
    ForgotemailComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MDBBootstrapModule,
    ButtonsModule,
    MatDialogModule,
    HttpClientModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ImageUploadModule.forRoot(),
    MatGridListModule,
    MatListModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatCarouselModule.forRoot(),
    CarouselModule,
    FlexLayoutModule
  ],
  exports:[MatDatepickerModule],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
