import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstructioncarteService } from '../constructioncarte.service';

@Component({
  selector: 'app-picaaccueil',
  templateUrl: './picaaccueil.component.html',
  styleUrls: ['./picaaccueil.component.css']
})
export class PicaaccueilComponent implements OnInit {

  constructor(private ConstructioncarteService : ConstructioncarteService,  
    private router:Router,) { }
  
  afficher_div(iddivaff, iddivmas) {
    if (document.getElementById(iddivaff).style.display == 'none')
      {
        document.getElementById(iddivaff).style.display = 'block';
        document.getElementById(iddivmas).style.display = 'none';
      }
    else
      {
        document.getElementById(iddivaff).style.display = 'none';
      }
  }

  
  ngOnInit(): void {
  }

  startEchantillon() {
    this.ConstructioncarteService.echantillonStart = 1;    
    this.router.navigate(['parametre']);
  }
}

