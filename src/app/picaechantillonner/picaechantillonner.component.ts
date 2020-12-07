import { Component, AfterViewInit} from '@angular/core';
import * as L from 'leaflet';
import { ListeparcelleService } from '../listeparcelle.service';
import { ChoixUtilisateurService } from '../choix-utilisateur.service';
import 'leaflet-draw';
import { Router } from '@angular/router'
import { ConstructioncarteService } from '../constructioncarte.service';
import { PlanjoueurService } from '../planjoueur.service'
import { ApiOpencpuService } from '../api-opencpu.service'
declare var openCPUchargedata: Function;
declare var calculdistance: Function;
declare var algoresultat: Function;

@Component({
  selector: 'app-picaechantillonner',
  templateUrl: './picaechantillonner.component.html',
  styleUrls: ['./picaechantillonner.component.css']
})

export class PicaechantillonnerComponent implements AfterViewInit {
  choixParcelle;
  parcelles : any[];
  nbItems = 0;
  points;
  premierPlan = true;
  NearNeigh;
  parcours;
  drawControl;
  

  constructor(
    private ListeparcelleService : ListeparcelleService, 
    private ChoixUtilisateurService : ChoixUtilisateurService, 
    private router:Router,
    public ConstructioncarteService: ConstructioncarteService,
    public PlanjoueurService: PlanjoueurService,
    public ApiOpencpuService: ApiOpencpuService,
    ) { }

  ngAfterViewInit(): void {
    if (this.ConstructioncarteService.echantillonStart === 0) {
      this.router.navigate(['']);
    };
    this.parcelles = this.ListeparcelleService.parcelles;
    this.ChoixUtilisateurService.recupChoix();;
    this.choixParcelle = this.ChoixUtilisateurService.choix;
    console.log(this.ChoixUtilisateurService.choix.parcelle);    
    openCPUchargedata(this.ChoixUtilisateurService.choix.parcelle)
    this.ConstructioncarteService.initializeMapOptions('mymapechantillonner');
    this.addMapEchantillonner();
    if (this.PlanjoueurService.plansjoueur.length >0) {
      this.addGhost();
      this.premierPlan = false;
    };  
  }  

  addMapEchantillonner () {
    var drawnItems = new L.FeatureGroup();
    this.ConstructioncarteService.mymap.addLayer(drawnItems);
    this.drawControl = new L.Control.Draw({
      position: 'topright',
      draw: {
        polygon: false,
        polyline: false,
        circle: false,
        rectangle: false,
        circlemarker: false,
        marker: {
          icon: this.ConstructioncarteService.picaIcon,
          repeatMode: false,
        },
      },
      edit: {
        edit: false,
        remove: false,
        featureGroup: drawnItems
      }
    });
    this.ConstructioncarteService.mymap.addControl(this.drawControl);    
    
    this.ConstructioncarteService.mymap.on('draw:created', (e) => {
      this.markerAdd(e,drawnItems)});
  }

  displPoint(drawnItems) {
    var tableContent = '';
    var i = 1;
    var tableauPoint = [];
    var tableauNearNeigh = []; 
    drawnItems.getLayers().forEach(element => {        
      tableContent += '<tr><td>Point '+i+'</td></tr><tr><td>Latitude : </td><td>'+ element._latlng.lat + '</td></tr>'+'<tr><td>Longitude : </td><td>'+ element._latlng.lng + '</td></tr>';
      var pointEchantillonner = [element._latlng.lat,element._latlng.lng];
      tableauPoint[i-1] = pointEchantillonner;
      var NearNeigh_loc = this.nearMarker(element._latlng.lat,element._latlng.lng)
      tableauNearNeigh[i-1] = NearNeigh_loc;
      i ++;
    });
    this.NearNeigh = tableauNearNeigh;
    localStorage.setItem("nearneigh", JSON.stringify(tableauNearNeigh))

    this.points = tableauPoint;    
    localStorage.setItem("points", JSON.stringify(tableauPoint))
    document.getElementById('point').innerHTML = tableContent; 
    
    document.getElementById('avertissement').innerHTML = '';
    localStorage.setItem("nbPoint", drawnItems.getLayers().length.toString());
    this.nbItems = drawnItems.getLayers().length
  };

  markerAdd(e,drawnItems) {
    if (drawnItems.getLayers().length < 10) {  
      var layer = e.layer;
      if (this.isInPolygons([layer._latlng.lat,layer._latlng.lng], this.ConstructioncarteService.choixParcelle.emprise)) {
        const popupOptions = {
          className: "customPopup"
        };          
        const _this = this;

        const popupInfo = '<button class="btn btn-primary btn-block supprMarker">Suppr.</button>';
        
        layer.bindPopup(popupInfo, popupOptions).on("popupopen", (a) => {
          var popUp = a.target.getPopup();        
          this.displPoint(drawnItems);
          popUp.getElement()
            .querySelector(".supprMarker")
            .addEventListener("click", e => {
              drawnItems.removeLayer(layer);
              this.displPoint(drawnItems);
            });       
        });

        var coord = [layer._latlng.lat,layer._latlng.lng];
        layer.on("drag", () => {        
          this.displPoint(drawnItems);
          if (!this.isInPolygons([layer._latlng.lat,layer._latlng.lng], this.ConstructioncarteService.choixParcelle.emprise)) {
            layer.setLatLng(coord);
          } else {
            coord = [layer._latlng.lat,layer._latlng.lng];
          }
        })

        drawnItems.addLayer(layer);
        layer.dragging.enable();
        this.displPoint(drawnItems);
      } else {
        alert('Les marqueurs ne peuvent être placés que dans la parcelle!');
      }
    } else if (drawnItems.getLayers().length > 9) {
      document.getElementById('avertissement').innerHTML = 'Trop de point!';
    };
  }

  addGhost() {
    //On récupère les points du joueur et on les affiche.
    var pointsGhost = this.PlanjoueurService.plansjoueur[0];
    for (let i = 0; i < pointsGhost.nbPoints; i++) {
      var latlng = new L.LatLng(pointsGhost.points[i][0], pointsGhost.points[i][1]);
      var marker = L.marker(latlng, {icon : this.ConstructioncarteService.picaIconGhost}).addTo(this.ConstructioncarteService.mymap);
   };
  }

  isInPolygons(point, polygons) {
    var inside = false;
    for (let i=0; i < polygons.length; i++) {
      if (this.isInPolygon(point, polygons[i])) {
        inside = true;
      }
    }
    return inside;
  }

  isInPolygon(point,polygon) {
    var isInX = false;
    var i=0;
    while (isInX === false && i < polygon.length-1) {
       if (point[0] < polygon[i][0] != point[0] < polygon[i+1][0]) {
        isInX = true;
       };
       i ++;
    };     
    var isInY = false;
    var j=0;
    while (isInY == false && j < polygon.length-1) {
     if (point[1] < polygon[j][1] != point[1] < polygon[j+1][1]) {
      isInY = true;
     };
     j ++;
    };
    return isInX && isInY;
 }

 nearMarker(lng, lat) {
   var site;
   var dist_site=1000;
   for (let i=0; i< this.ChoixUtilisateurService.parcelleChoisie.points.features.length; i++ ){
    var dist = Math.sqrt(Math.pow((this.ChoixUtilisateurService.parcelleChoisie.points.features[i].geometry.coordinates[0]-lat),2) + Math.pow((this.ChoixUtilisateurService.parcelleChoisie.points.features[i].geometry.coordinates[1]-lng),2));
    if (dist < dist_site) {
      site = this.ChoixUtilisateurService.parcelleChoisie.points.features[i].properties.Site;
      dist_site = dist;
    }
   }
   return site;
 }

 calculErreur() {
    var points = this.ChoixUtilisateurService.parcelleChoisie.points.features.filter(element =>
       this.NearNeigh.includes(element.properties.Site)
     );
   var somme=0;
   if (this.ChoixUtilisateurService.choix.millesime === "pica2017") {
    for (let i=0; i < points.length; i++) {
      somme += points[i].properties.Yield2017;
    }
   } else if (this.ChoixUtilisateurService.choix.millesime === "pica2018") {
    for (let i=0; i < points.length; i++) {
      somme += points[i].properties.Yield2018;
    }
   } else if (this.ChoixUtilisateurService.choix.millesime === "pica2019") {
    for (let i=0; i < points.length; i++) {
      somme += points[i].properties.Yield2019;
    }
   }
   
   var moyenne = somme/points.length;
   var erreur = parseFloat((Math.abs(moyenne-1000)/1000*100).toFixed(2));
   return erreur;
 }

 ordrePoint(parcours: any[]) {
   var ordre = [];
   var index = [];
   for (let i=1; i < parcours.length; i++) {
    ordre[i-1] = parcours[i].ID_site;
   };
   for (let j=0; j < this.NearNeigh.length; j++) {
     index[j] = ordre.indexOf(this.NearNeigh[j]);
   }
   return index;
 }


 async onSubmit() {
    this.ConstructioncarteService.mymap.removeControl(this.drawControl)
    document.getElementById('valider').setAttribute("disabled", "disabled");
    document.getElementById('valider').innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><br>En attente de l\'algorithme...';
    var t1 = setTimeout(function(){
      document.getElementById('valider').innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><br>En attente de l\'algorithme... Désolé cela peut prendre jusqu\'à 20 secondes.';
    },5000);
    var t2 = setTimeout(function(){
      var funfacts = [
        "En 2017, plus d'1 million d'Ha ont été pilotés grâce à la télédétection (toutes cultures confondues).",
        "Le premier usage des images satellites en viticulture est le tour de plaine.",
        "Environ 1 agriculteur sur 2 se sert de la géolocalisation.",
        "Moins de 50% des conseillers viticoles utilisent des cartes de vigueur issues de satellite.",
        "Les outils numériques les plus utilisés en viticulture sont les outils de modélisation.",
        "Le premier frein à l'adoption du numérique en viticulture est le temps de saisie.",
        "Depuis son lancement en 2017, le Mas numérique a accueilli plus de 2000 visiteurs.",
        "La crise du phylloxera à la fin du XIXe siècle a fait baisser la production française de vin de 85 à moins de 30 millions d'hectolitres.",
        "Il y a plus de visiteurs au Salon de l'Agriculture (plus de 800 000) que d'exploitations agricoles en France (452 000).",
        "Les agriculteurs comptent pour 2% de la population française mais pour 14% des maires.",
        "Il existe 1 200 variétés de fromage en france, dont seulement 45 sont en AOP.",
        "Suite à la crise du phyloxera, le vignoble lorrain a été remplacé par la culture de la mirabelle. Aujourd'hui, cette production représente 70% de la production mondiale.",
        "En moyenne, un olivier vit entre 300 et 600 ans.",
        "L'un des oliviers les plus anciens a plus de 4000 ans, il est situé en Crète et produit toujours...",
        "En 1930, un agriculteur nourissait 10 personnes, en 1970, il en nourissait 50 et à la fin des années 1990, plus de 100."
      ];
      var funfact = funfacts[Math.floor(Math.random()*15+1)];
      document.getElementById('valider').innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><br>En attente de l\'algorithme... Désolé cela peut prendre jusqu\'à 20 secondes.'+
      "<br>En attendant, savez-vous que : "+funfact;
    },10000);
    this.calculErreur();   
    var distance = await calculdistance(this.ChoixUtilisateurService.choix.parcelle, this.ChoixUtilisateurService.choix.millesime, this.NearNeigh);
    var resultat = await algoresultat();
    var ordre = this.ordrePoint(resultat.parcours);
    this.PlanjoueurService.addPlanjoueur(this.nbItems,this.points,resultat, Math.round(resultat.distance/100), this.calculErreur(), ordre); 
    clearInterval(t1);
    clearInterval(t2);
    this.router.navigate(['resultatjoueur']);
  }
};
