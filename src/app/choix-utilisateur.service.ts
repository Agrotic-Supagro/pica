import { Injectable } from '@angular/core';
import { ListeparcelleService } from './listeparcelle.service';

@Injectable({
  providedIn: 'root'
})
export class ChoixUtilisateurService {
  choix = {
    parcelle: '',
    millesime : '',
    optimal : '',
  };

  parcelleChoisie;
  
  constructor(private ListeparcelleService : ListeparcelleService) { }

  addChoixUtilisateur(parcelle:string, millesime: string) {
    this.choix.parcelle = parcelle;
    this.choix.millesime = millesime;
    if (millesime == 'pica2017') {
      this.choix.optimal = 'optimal2017';
    } else if (millesime == 'pica2018') {
      this.choix.optimal = 'optimal2018';
    } else if (millesime == 'pica2019') {
      this.choix.optimal = 'optimal2019';
    }
    localStorage.setItem("choix.parcelle",this.choix.parcelle);
    localStorage.setItem("choix.millesime",this.choix.millesime);    
    localStorage.setItem("choix.optimal",this.choix.optimal);
    this.returnChoix(this.choix.parcelle);
  }

  recupChoix() {
    this.choix.parcelle = localStorage.getItem("choix.parcelle");
    this.choix.millesime = localStorage.getItem("choix.millesime");
    this.choix.optimal = localStorage.getItem("choix.optimal");    
    this.returnChoix(this.choix.parcelle);    
  }

  returnChoix(parcelle) {
    if (parcelle === "Larzat") {
      this.parcelleChoisie = this.ListeparcelleService.parcelles[0];
    } else if (parcelle === "Arnel") {
      this.parcelleChoisie = this.ListeparcelleService.parcelles[1];
    } else if (parcelle === "Estagnol") {
      this.parcelleChoisie = this.ListeparcelleService.parcelles[2];
    }
  }
}
