import { Component, AfterViewInit} from '@angular/core';
import * as L from 'leaflet';
import { ChoixUtilisateurService } from '../choix-utilisateur.service';
import { ConstructioncarteService } from '../constructioncarte.service';
import { Router } from '@angular/router';
import { PlanjoueurService } from '../planjoueur.service'
import { ListeparcelleService } from '../listeparcelle.service'

@Component({
  selector: 'app-picaresultatfinal',
  templateUrl: './picaresultatfinal.component.html',
  styleUrls: ['./picaresultatfinal.component.css']
})
export class PicaresultatfinalComponent implements AfterViewInit {
  choixParcelle;
  nbPoint;
  points;
  markerPlan = [];
  picaOptimalParcelleMillesime;
  markerPlanOptimal = [];
  idPlanOptimal = [];
  geoJsonParcelleOptimal;
  plansJoueur;

  constructor(
    private ChoixUtilisateurService : ChoixUtilisateurService,
    public ConstructioncarteService: ConstructioncarteService, 
    private router:Router,
    public PlanjoueurService: PlanjoueurService,
    private ListeparcelleService : ListeparcelleService,
  ) { }

  ngAfterViewInit(): void {
    if (this.ConstructioncarteService.echantillonStart === 0) {
      this.router.navigate(['']);
    };
    this.ChoixUtilisateurService.recupChoix();
    this.choixParcelle = this.ChoixUtilisateurService.choix;
    this.nbPoint = parseInt(localStorage.getItem("nbPoint"));
    this.points = JSON.parse(localStorage.getItem("points"));
    this.plansJoueur = this.PlanjoueurService.plansjoueur;
    this.ConstructioncarteService.initializeMapOptions('mymapresultatfinal');
    this.markerPlan = this.ConstructioncarteService.addResultatJoueur(this.nbPoint, this.points, this.plansJoueur[0].ordre);
    this.picaOptimalParcelleMillesime = this.ConstructioncarteService.paramParcoursOptimal(this.nbPoint);
    this.remplirTableauOptimal();
    this.afficherParcoursOptimal(this.nbPoint);   
  }

  remplirTableauOptimal() {
    //On remplie le tableau des résultats avec les caractéristiques du parcours optimal.
      var tempsOptimal = this.PlanjoueurService.calculTemps(this.picaOptimalParcelleMillesime["distance"],this.nbPoint);
      document.getElementById('parcoursOptimal_temps').innerHTML = tempsOptimal[0] + " min et " + tempsOptimal[1] + " sec";
      document.getElementById('parcoursOptimal_erreur').innerHTML = this.picaOptimalParcelleMillesime["erreur"].toFixed(2)+"%";
      document.getElementById('parcoursOptimal_nbPoint').innerHTML = this.nbPoint;

    if (this.nbPoint > 3) {
      var tempsOptimalMoins = this.PlanjoueurService.calculTemps(this.ConstructioncarteService.paramParcoursOptimal(this.nbPoint-1)["distance"],this.nbPoint-1);
      document.getElementById('parcoursOptimalmoins_temps').innerHTML = tempsOptimalMoins[0] + " min et " + tempsOptimalMoins[1] + " sec";
      document.getElementById('parcoursOptimalmoins_erreur').innerHTML = this.ConstructioncarteService.paramParcoursOptimal(this.nbPoint-1)["erreur"].toFixed(2)+"%";
      document.getElementById('parcoursOptimalmoins_nbPoint').innerHTML = (this.nbPoint-1).toString();
    } else {
      document.getElementById('ligneParcoursOptimalmoins').remove();
    };
    
    if (this.nbPoint <10) {
      var tempsOptimalPlus = this.PlanjoueurService.calculTemps(this.ConstructioncarteService.paramParcoursOptimal(this.nbPoint+1)["distance"],this.nbPoint+1);
      document.getElementById('parcoursOptimalplus_temps').innerHTML = tempsOptimalPlus[0] + " min et " + tempsOptimalPlus[1] + " sec";
      document.getElementById('parcoursOptimalplus_erreur').innerHTML =this.ConstructioncarteService.paramParcoursOptimal(this.nbPoint+1)["erreur"].toFixed(2)+"%";
      document.getElementById('parcoursOptimalplus_nbPoint').innerHTML = this.nbPoint+1;
    } else {      
      document.getElementById('ligneParcoursOptimalplus').remove();
    }
  }

  afficherParcoursOptimal(nbPoint) {
    if (this.ConstructioncarteService.millesime === "pica2017") {
      this.geoJsonParcelleOptimal = this.ConstructioncarteService.choixParcelle.optimal2017;
    } else if (this.ConstructioncarteService.millesime === "pica2018") {
      this.geoJsonParcelleOptimal = this.ConstructioncarteService.choixParcelle.optimal2018;
    } else if (this.ConstructioncarteService.millesime === "pica2019") {
      this.geoJsonParcelleOptimal = this.ConstructioncarteService.choixParcelle.optimal2019;
    };

    for (let i=1; i < nbPoint+1; i++) {     
      var idPoint = parseInt(this.picaOptimalParcelleMillesime["site_ID_"+i]);
      var pointOptimal = this.ListeparcelleService.setGeoJSON(this.geoJsonParcelleOptimal,idPoint,i).addTo(this.ConstructioncarteService.mymap);
      this.markerPlanOptimal.push(pointOptimal);
    };
  }

  restart() {
    this.router.navigate(['parametre']);
  }

  
  changePlan(plan) {
    for (let i=0 ; i<this.markerPlan.length; i++) {
       this.ConstructioncarteService.mymap.removeLayer(this.markerPlan[i]);
    }
    this.markerPlan = [];
    var planJoueur = this.PlanjoueurService.plansjoueur.find(element => element == plan);
    for (let i = 0; i < planJoueur.points.length; i++) {
       var latlng = new L.LatLng(planJoueur.points[i][0], planJoueur.points[i][1]);
       var marker = L.marker(latlng, {icon : this.ConstructioncarteService.getIcon(planJoueur.ordre[i]+1)}).addTo(this.ConstructioncarteService.mymap);
       this.markerPlan.push(marker);
    };
 }

 
  changePlanOptimal(planOptimal) {
    for (let i=0; i<this.markerPlanOptimal.length; i++) {      
      this.ConstructioncarteService.mymap.removeLayer(this.markerPlanOptimal[i]);
    }
    this.markerPlanOptimal =[];
    if (planOptimal === "moins") {
      this.picaOptimalParcelleMillesime = this.ConstructioncarteService.paramParcoursOptimal(this.nbPoint-1);
      this.afficherParcoursOptimal(this.nbPoint-1);
    } else if (planOptimal === "plus") {      
      this.picaOptimalParcelleMillesime = this.ConstructioncarteService.paramParcoursOptimal(this.nbPoint+1);      
      this.afficherParcoursOptimal(this.nbPoint+1);
    } else {
      this.picaOptimalParcelleMillesime = this.ConstructioncarteService.paramParcoursOptimal(this.nbPoint);
      this.afficherParcoursOptimal(this.nbPoint);
    };
}

}
