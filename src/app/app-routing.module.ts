import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {Routes,RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import {CapturaComponent} from './captura/captura.component';
import{ListadoComponent} from './listado/listado.component';
import {EvaluacionComponent} from './evaluacion/evaluacion.component';
import {PrincipalComponent} from './principal/principal.component';

const routes: Routes =[

  {path: 'app', component: AppComponent },
  {path: '', component: LoginComponent },
  {path: 'menu', component: MenuComponent },
  {path: 'captura', component: CapturaComponent },
  {path: 'listado', component: ListadoComponent },
  {path: 'evaluacion', component: EvaluacionComponent },
  {path: 'principal', component: PrincipalComponent }
  
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[ RouterModule]
})
export class AppRoutingModule { }
