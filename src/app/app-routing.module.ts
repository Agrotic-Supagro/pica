import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PicaaccueilComponent } from './picaaccueil/picaaccueil.component';
import { PicaChoixparametreComponent } from './pica-choixparametre/pica-choixparametre.component';
import { PicaechantillonnerComponent } from './picaechantillonner/picaechantillonner.component';
import { PicaresultatjoueurComponent } from './picaresultatjoueur/picaresultatjoueur.component';
import { PicaresultatfinalComponent } from './picaresultatfinal/picaresultatfinal.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'accueil', component: PicaaccueilComponent },
  { path: 'parametre', component:  PicaChoixparametreComponent},
  { path: 'echantillonnage', component: PicaechantillonnerComponent},
  { path: 'resultatjoueur', component: PicaresultatjoueurComponent},
  { path: 'resultatfinal', component: PicaresultatfinalComponent},
  { path: '', component: PicaaccueilComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
