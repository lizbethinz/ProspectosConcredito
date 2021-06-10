import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';

import {HttpClientModule} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import {ServicioProspectosService } from './servicio-prospectos.service';


import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import * as bootstrap from "bootstrap";
import * as $ from "jquery";

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { CapturaComponent } from './captura/captura.component';
import { ListadoComponent } from './listado/listado.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';


import { AngularFileViewerModule } from '@taldor-ltd/angular-file-viewer';
import { PrincipalComponent } from './principal/principal.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    CapturaComponent,
    ListadoComponent,
    EvaluacionComponent,
    PrincipalComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    AngularFileViewerModule,
  ],
  providers: [
    ServicioProspectosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
