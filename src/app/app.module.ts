import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet'
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { FormsModule } from '@angular/forms';
import { PicaaccueilComponent } from './picaaccueil/picaaccueil.component';
import { PicaChoixparametreComponent } from './pica-choixparametre/pica-choixparametre.component';
import { RouterModule, Routes } from '@angular/router';
import { PicaechantillonnerComponent } from './picaechantillonner/picaechantillonner.component';
import { ChoixUtilisateurService } from './choix-utilisateur.service';
import { ListeparcelleService } from './listeparcelle.service';
import { PicaresultatjoueurComponent } from './picaresultatjoueur/picaresultatjoueur.component';
import { ConstructioncarteService } from './constructioncarte.service';
import { PlanjoueurService } from './planjoueur.service';
import { ApiOpencpuService } from './api-opencpu.service';
import { PicaresultatfinalComponent } from './picaresultatfinal/picaresultatfinal.component';

const appRoutes: Routes = [
  { path: 'accueil', component: PicaaccueilComponent },
  { path: 'parametre', component:  PicaChoixparametreComponent},
  { path: 'echantillonnage', component: PicaechantillonnerComponent},
  { path: 'resultatjoueur', component: PicaresultatjoueurComponent},
  { path: 'resultatfinal', component: PicaresultatfinalComponent},
  { path: '', component: PicaaccueilComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PicaaccueilComponent,
    PicaChoixparametreComponent,
    PicaechantillonnerComponent,
    PicaresultatjoueurComponent,
    PicaresultatfinalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    LeafletModule,
    FormsModule,
    LeafletDrawModule,
  ],
  providers: [
    ChoixUtilisateurService,
    ListeparcelleService,
    ConstructioncarteService,
    PlanjoueurService,
    ApiOpencpuService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
