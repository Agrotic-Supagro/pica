/*pica-choixparametre
Ce composant correspond à l'écran de choix de la parcelle et du millesime par le joueur.

Variables utilisées :
- choixParcelle : Récupère la parcelle et ses caractéristiques lors du choix des paramètres.
- parcelles : tableau qui comprend les trois parcelles et leur caractéristiques.
- defaultParcelle et defaultMillesime : Parcelle et Millesime sélectionné par défaut
- chapitrecorner1 et chapitrecorner2 : coordonnées géographiques des coins de l'emprise du jeu
- chapitremaxbounds : calcul l'emprise maximale du jeu à partir des variables précédentes

Fonctions :
- setParcelle : permet d'adapter l'affichage de l'écran à la parcelle sélectionnée par le joueur.
- setMillesime : permet d'adapter l'affichage de l'écran au millésime sélectionné par le joueur.
- onsubmit : controle les évènements lors de la validation des paramètres par le joueur

*/

//Liste des imports :
import { Component, AfterViewInit} from '@angular/core';
import * as L from 'leaflet';
import { NgForm } from '@angular/forms';
import { ListeparcelleService } from '../listeparcelle.service'
import { ChoixUtilisateurService } from '../choix-utilisateur.service'
import { Router } from '@angular/router'
import { ConstructioncarteService } from '../constructioncarte.service';
import { PlanjoueurService } from '../planjoueur.service';

@Component({
  selector: 'app-pica-choixparametre',
  templateUrl: './pica-choixparametre.component.html',
  styleUrls: ['./pica-choixparametre.component.css']
})

export class PicaChoixparametreComponent implements AfterViewInit {
  // Variables utilisées :
  choixParcelle;
  parcelles : any[];
  defaultParcelle = "larzat";
  defaultMillesime = "pica2017";  
  chapitrecorner2 = L.latLng(43.55425783681239, 3.87682261526906);
  chapitrecorner1 = L.latLng(43.526153988197812, 3.833899052720867);
  chapitremaxbounds = L.latLngBounds(this.chapitrecorner1,this.chapitrecorner2);
  
  //Constructeur
  constructor(
    private ListeparcelleService : ListeparcelleService, 
    private ChoixUtilisateurService : ChoixUtilisateurService, 
    private router:Router, 
    public ConstructioncarteService:ConstructioncarteService,    
    public PlanjoueurService:PlanjoueurService,
    ) {}
  
  //Fonction qui s'éxecute juste après le chargement de la page
  ngAfterViewInit() : void {
    if (this.ConstructioncarteService.echantillonStart === 0) { 
      this.router.navigate(['']);
    };
    this.PlanjoueurService.plansjoueur = []; 
    this.ChoixUtilisateurService.choix.parcelle = '';
    this.ConstructioncarteService.millesime=this.ConstructioncarteService.defaultMillesime; 
    this.parcelles = this.ListeparcelleService.parcelles;
    this.ConstructioncarteService.initializeMapOptions('mymap');
  };

  setParcelle(parcelle) {
    this.ConstructioncarteService.mymap.removeLayer(this.ConstructioncarteService.picaLayer);
    if (parcelle == 'larzat') {
      var parcelleView = this.parcelles[0].get_center();
      var parcelleBounds = this.parcelles[0].get_bounds();
      var parcelleName = this.parcelles[0].get_name();
      var parcelleArea = this.parcelles[0].get_area();
      var parcelleCepage = this.parcelles[0].get_cepage();
      var parcelleInterrang = this.parcelles[0].get_interrang();
      this.choixParcelle = this.parcelles[0];
    } else if (parcelle == 'arnel') {
      var parcelleView = this.parcelles[1].get_center();      
      var parcelleBounds = this.parcelles[1].get_bounds();
      var parcelleName = this.parcelles[1].get_name();
      var parcelleArea = this.parcelles[1].get_area();
      var parcelleCepage = this.parcelles[1].get_cepage();
      var parcelleInterrang = this.parcelles[1].get_interrang();      
      this.choixParcelle = this.parcelles[1];
    } else if (parcelle == 'estagnol') {
      var parcelleView = this.parcelles[2].get_center();
      var parcelleBounds = this.parcelles[2].get_bounds();
      var parcelleName = this.parcelles[2].get_name();
      var parcelleArea = this.parcelles[2].get_area();
      var parcelleCepage = this.parcelles[2].get_cepage();
      var parcelleInterrang = this.parcelles[2].get_interrang();
      this.choixParcelle = this.parcelles[2];
    };
    this.ConstructioncarteService.picaLayer = this.choixParcelle[this.ConstructioncarteService.millesime].addTo(this.ConstructioncarteService.mymap);
    this.ConstructioncarteService.choixParcelle = this.choixParcelle;
    this.ConstructioncarteService.mymap.setMaxBounds(this.ConstructioncarteService.chapitremaxbounds);
    this.ConstructioncarteService.mymap.setView(parcelleView,17);    
    this.ConstructioncarteService.mymap.setMaxBounds(parcelleBounds);    
    var value = (<HTMLInputElement>document.getElementById("opacity")).value;
    this.ConstructioncarteService.picaLayer.setOpacity(1-parseInt(value)/100);

    document.getElementById('name').innerHTML = parcelleName;
    document.getElementById('area').innerHTML = parcelleArea + " Ha";
    document.getElementById('cepage').innerHTML = parcelleCepage;
    document.getElementById('interrang').innerHTML = parcelleInterrang + " m";
  };


  setMillesime(millesime) {    
    this.ConstructioncarteService.mymap.removeLayer(this.ConstructioncarteService.picaLayer);
    if (millesime == 'pica2017'){
      this.ConstructioncarteService.millesime = "pica2017";
      this.ConstructioncarteService.picaLayer = this.ConstructioncarteService.choixParcelle[this.ConstructioncarteService.millesime];
      var contentMillesime = "2017 : Lien fort entre rendement et vigueur";
    } else if (millesime == 'pica2018'){      
      this.ConstructioncarteService.millesime = "pica2018";
      this.ConstructioncarteService.picaLayer = this.ConstructioncarteService.choixParcelle[this.ConstructioncarteService.millesime];      
      var contentMillesime = "2018 : Lien faible entre rendement et vigueur";
    } else if (millesime == 'pica2019'){
      this.ConstructioncarteService.millesime = "pica2019";
      this.ConstructioncarteService.picaLayer = this.ConstructioncarteService.choixParcelle[this.ConstructioncarteService.millesime];
      var contentMillesime = "2019 : Lien moyen entre rendement et vigueur";
    };    
    var value = (<HTMLInputElement>document.getElementById("opacity")).value;
    this.ConstructioncarteService.picaLayer.setOpacity(1-parseInt(value)/100);
    this.ConstructioncarteService.picaLayer.addTo(this.ConstructioncarteService.mymap);
    document.getElementById('millesime').innerHTML = contentMillesime;
  };

  onSubmit(form: NgForm) {
    const parcelle = this.ConstructioncarteService.choixParcelle.name;
    const millesime = this.ConstructioncarteService.millesime;
    this.ChoixUtilisateurService.addChoixUtilisateur(parcelle, millesime);
    this.router.navigate(['echantillonnage']);
  }
}