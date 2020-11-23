import { Injectable } from '@angular/core';
import { Planjoueur } from './planjoueur';

@Injectable({
  providedIn: 'root'
})

export class PlanjoueurService {
  public plansjoueur: Planjoueur[] = [];

  addPlanjoueur(nbPoint, points, resultatAlgo, distance = 0, erreur = 0, ordre) {  
    var planjoueur = new Planjoueur(this.plansjoueur.length, this.calculTemps(distance,nbPoint), nbPoint, points, resultatAlgo, erreur, ordre);
    this.plansjoueur.unshift(planjoueur);
  }

  calculTemps(distance, nbPoint) {
    var temps = distance*1.38+nbPoint*60;
    var minute = Math.floor(temps/60);
    var seconde = Math.round(temps % 60);
    return [minute,seconde]
  }

  constructor() { }
}
