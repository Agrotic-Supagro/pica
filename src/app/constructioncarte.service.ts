import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { ListeparcelleService } from './listeparcelle.service'
import { ChoixUtilisateurService } from './choix-utilisateur.service'

@Injectable({
  providedIn: 'root'
})
export class ConstructioncarteService {
  echantillonStart = 0;
  public mymap;
  public picaLayer;
  overlayLayers;
  choixParcelle;
  parcelles = this.ListeparcelleService.parcelles;
  millesime = "pica2017";
  defaultParcelle = "larzat";
  defaultMillesime = "pica2017";
  markerPlan=[];
  picaOptimalParcelle;
  public transparence=0;
  picaIcon = L.icon({
    iconUrl : 'assets/images/iconeechantillon.png',
    iconSize:     [26, 51], // size of the icon
    iconAnchor:   [13, 51], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -60] // point from which the popup should open relative to the iconAnchor
  });  
  picaIconGhost = L.icon({
  iconUrl : 'assets/images/iconeechantillon_ghost.png',
  iconSize:     [26, 51], // size of the icon
  iconAnchor:   [13, 51], // point of the icon which will correspond to marker's location
  popupAnchor:  [-3, -60] // point from which the popup should open relative to the iconAnchor
  });  
  picaIconOptimal = L.icon({
    iconUrl : 'assets/images/iconeechantillon_optimal.png',
    iconSize:     [26, 51], // size of the icon
    iconAnchor:   [13, 51], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -60] // point from which the popup should open relative to the iconAnchor
    }); 
  picaOptimal = {
    "Arnel": [
       {
          "year": 2017,
          "N": 3,
          "distance": 320.787138401585,
          "erreur": 7.11837620048046,
          "site_ID_1": 167,
          "site_ID_2": 175,
          "site_ID_3": 129,
          "site_ID_4": "NA",
          "site_ID_5": "NA",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2017,
          "N": 4,
          "distance": 376.287138401585,
          "erreur": 5.62557054457639,
          "site_ID_1": 209,
          "site_ID_2": 222,
          "site_ID_3": 176,
          "site_ID_4": "172",
          "site_ID_5": "NA",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2017,
          "N": 5,
          "distance": 416.087138401585,
          "erreur": 5.23064375883127,
          "site_ID_1": 209,
          "site_ID_2": 222,
          "site_ID_3": 184,
          "site_ID_4": "176",
          "site_ID_5": "172",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2017,
          "N": 6,
          "distance": 470.887138401585,
          "erreur": 4.82728909700663,
          "site_ID_1": 167,
          "site_ID_2": 173,
          "site_ID_3": 144,
          "site_ID_4": "190",
          "site_ID_5": "182",
          "site_ID_6": "177",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2017,
          "N": 7,
          "distance": 506.487138401585,
          "erreur": 2.23789200224197,
          "site_ID_1": 209,
          "site_ID_2": 214,
          "site_ID_3": 176,
          "site_ID_4": "184",
          "site_ID_5": "189",
          "site_ID_6": "235",
          "site_ID_7": "222",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2017,
          "N": 8,
          "distance": 611.387138401585,
          "erreur": 2.01469813815795,
          "site_ID_1": 177,
          "site_ID_2": 141,
          "site_ID_3": 154,
          "site_ID_4": "200",
          "site_ID_5": "146",
          "site_ID_6": "192",
          "site_ID_7": "173",
          "site_ID_8": "125",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2017,
          "N": 9,
          "distance": 662.987138401585,
          "erreur": 1.02540164107689,
          "site_ID_1": 125,
          "site_ID_2": 129,
          "site_ID_3": 178,
          "site_ID_4": "185",
          "site_ID_5": "156",
          "site_ID_6": "202",
          "site_ID_7": "493",
          "site_ID_8": "440",
          "site_ID_9": "464",
          "site_ID_10": "NA"
       },
       {
          "year": 2017,
          "N": 10,
          "distance": 889.687138401585,
          "erreur": 0.137853173044937,
          "site_ID_1": 131,
          "site_ID_2": 137,
          "site_ID_3": 145,
          "site_ID_4": "183",
          "site_ID_5": "154",
          "site_ID_6": "117",
          "site_ID_7": "512",
          "site_ID_8": "474",
          "site_ID_9": "483",
          "site_ID_10": "521"
       },
       {
          "year": 2018,
          "N": 3,
          "distance": 326.587138401585,
          "erreur": 15.4090111886632,
          "site_ID_1": 125,
          "site_ID_2": 134,
          "site_ID_3": 88,
          "site_ID_4": "NA",
          "site_ID_5": "NA",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2018,
          "N": 4,
          "distance": 385.987138401585,
          "erreur": 27.5904233940758,
          "site_ID_1": 129,
          "site_ID_2": 135,
          "site_ID_3": 98,
          "site_ID_4": "83",
          "site_ID_5": "NA",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2018,
          "N": 5,
          "distance": 446.087138401585,
          "erreur": 27.2164767374708,
          "site_ID_1": 131,
          "site_ID_2": 137,
          "site_ID_3": 141,
          "site_ID_4": "104",
          "site_ID_5": "85",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2018,
          "N": 6,
          "distance": 480.987138401585,
          "erreur": 15.4749535457594,
          "site_ID_1": 170,
          "site_ID_2": 178,
          "site_ID_3": 191,
          "site_ID_4": "145",
          "site_ID_5": "140",
          "site_ID_6": "132",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2018,
          "N": 7,
          "distance": 540.887138401585,
          "erreur": 4.89755607748918,
          "site_ID_1": 170,
          "site_ID_2": 178,
          "site_ID_3": 183,
          "site_ID_4": "188",
          "site_ID_5": "197",
          "site_ID_6": "192",
          "site_ID_7": "132",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2018,
          "N": 8,
          "distance": 726.187138401585,
          "erreur": 25.9764300742548,
          "site_ID_1": 215,
          "site_ID_2": 226,
          "site_ID_3": 189,
          "site_ID_4": "221",
          "site_ID_5": "243",
          "site_ID_6": "235",
          "site_ID_7": "197",
          "site_ID_8": "167",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2018,
          "N": 9,
          "distance": 717.187138401585,
          "erreur": 11.2337165341283,
          "site_ID_1": 173,
          "site_ID_2": 224,
          "site_ID_3": 178,
          "site_ID_4": "240",
          "site_ID_5": "579",
          "site_ID_6": "573",
          "site_ID_7": "569",
          "site_ID_8": "603",
          "site_ID_9": "557",
          "site_ID_10": "NA"
       },
       {
          "year": 2018,
          "N": 10,
          "distance": 792.687138401585,
          "erreur": 6.17809026745074,
          "site_ID_1": 126,
          "site_ID_2": 135,
          "site_ID_3": 142,
          "site_ID_4": "149",
          "site_ID_5": "452",
          "site_ID_6": "489",
          "site_ID_7": "433",
          "site_ID_8": "471",
          "site_ID_9": "484",
          "site_ID_10": "438"
       },
       {
          "year": 2019,
          "N": 3,
          "distance": 376.687138401585,
          "erreur": 17.4174522553548,
          "site_ID_1": 419,
          "site_ID_2": 471,
          "site_ID_3": 425,
          "site_ID_4": "NA",
          "site_ID_5": "NA",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2019,
          "N": 4,
          "distance": 411.387138401585,
          "erreur": 15.1638318815165,
          "site_ID_1": 420,
          "site_ID_2": 425,
          "site_ID_3": 433,
          "site_ID_4": "387",
          "site_ID_5": "NA",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2019,
          "N": 5,
          "distance": 476.087138401585,
          "erreur": 6.31072840087277,
          "site_ID_1": 721,
          "site_ID_2": 730,
          "site_ID_3": 684,
          "site_ID_4": "675",
          "site_ID_5": "671",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2019,
          "N": 6,
          "distance": 511.087138401585,
          "erreur": 3.36824781332661,
          "site_ID_1": 675,
          "site_ID_2": 684,
          "site_ID_3": 688,
          "site_ID_4": "692",
          "site_ID_5": "679",
          "site_ID_6": "629",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2019,
          "N": 7,
          "distance": 736.587138401585,
          "erreur": 0.399567751148581,
          "site_ID_1": 419,
          "site_ID_2": 471,
          "site_ID_3": 433,
          "site_ID_4": "832",
          "site_ID_5": "575",
          "site_ID_6": "569",
          "site_ID_7": "551",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2019,
          "N": 8,
          "distance": 915.787138401585,
          "erreur": 10.3071470695723,
          "site_ID_1": 744,
          "site_ID_2": 777,
          "site_ID_3": 739,
          "site_ID_4": "772",
          "site_ID_5": "767",
          "site_ID_6": "721",
          "site_ID_7": "714",
          "site_ID_8": "1175",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2019,
          "N": 9,
          "distance": 923.087138401585,
          "erreur": 6.96840346378964,
          "site_ID_1": 209,
          "site_ID_2": 865,
          "site_ID_3": 828,
          "site_ID_4": "832",
          "site_ID_5": "348",
          "site_ID_6": "311",
          "site_ID_7": "357",
          "site_ID_8": "344",
          "site_ID_9": "339",
          "site_ID_10": "NA"
       },
       {
          "year": 2019,
          "N": 10,
          "distance": 1203.58713840158,
          "erreur": 0.15672300821613,
          "site_ID_1": 377,
          "site_ID_2": 430,
          "site_ID_3": 423,
          "site_ID_4": "1358",
          "site_ID_5": "1371",
          "site_ID_6": "1387",
          "site_ID_7": "1391",
          "site_ID_8": "790",
          "site_ID_9": "786",
          "site_ID_10": "721"
       }
    ],
    "Estagnol": [
       {
          "year": 2017,
          "N": 3,
          "distance": 141.150037468218,
          "erreur": 9.96249401933544,
          "site_ID_1": 636,
          "site_ID_2": 737,
          "site_ID_3": 741,
          "site_ID_4": "NA",
          "site_ID_5": "NA",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2017,
          "N": 4,
          "distance": 166.350037468218,
          "erreur": 4.1657385744283,
          "site_ID_1": 663,
          "site_ID_2": 658,
          "site_ID_3": 748,
          "site_ID_4": "753",
          "site_ID_5": "NA",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2017,
          "N": 5,
          "distance": 192.350037468218,
          "erreur": 3.34958546421324,
          "site_ID_1": 606,
          "site_ID_2": 602,
          "site_ID_3": 613,
          "site_ID_4": "724",
          "site_ID_5": "729",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2017,
          "N": 6,
          "distance": 256.050037468218,
          "erreur": 1.69672262374953,
          "site_ID_1": 558,
          "site_ID_2": 537,
          "site_ID_3": 532,
          "site_ID_4": "643",
          "site_ID_5": "748",
          "site_ID_6": "753",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2017,
          "N": 7,
          "distance": 332.350037468218,
          "erreur": 1.33897063355192,
          "site_ID_1": 559,
          "site_ID_2": 422,
          "site_ID_3": 434,
          "site_ID_4": "413",
          "site_ID_5": "598",
          "site_ID_6": "748",
          "site_ID_7": "741",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2017,
          "N": 8,
          "distance": 409.650037468218,
          "erreur": 0.196551060015751,
          "site_ID_1": 618,
          "site_ID_2": 629,
          "site_ID_3": 238,
          "site_ID_4": "226",
          "site_ID_5": "248",
          "site_ID_6": "389",
          "site_ID_7": "542",
          "site_ID_8": "729",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2017,
          "N": 9,
          "distance": 471.150037468218,
          "erreur": 0.15394036286291,
          "site_ID_1": 558,
          "site_ID_2": 570,
          "site_ID_3": 549,
          "site_ID_4": "399",
          "site_ID_5": "185",
          "site_ID_6": "190",
          "site_ID_7": "194",
          "site_ID_8": "388",
          "site_ID_9": "717",
          "site_ID_10": "NA"
       },
       {
          "year": 2017,
          "N": 10,
          "distance": 470.050037468218,
          "erreur": 0.120904211094477,
          "site_ID_1": 249,
          "site_ID_2": 244,
          "site_ID_3": 389,
          "site_ID_4": "384",
          "site_ID_5": "362",
          "site_ID_6": "550",
          "site_ID_7": "571",
          "site_ID_8": "575",
          "site_ID_9": "737",
          "site_ID_10": "741"
       },
       {
          "year": 2018,
          "N": 3,
          "distance": 141.150037468218,
          "erreur": 17.3068853028717,
          "site_ID_1": 636,
          "site_ID_2": 741,
          "site_ID_3": 737,
          "site_ID_4": "NA",
          "site_ID_5": "NA",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2018,
          "N": 4,
          "distance": 173.450037468218,
          "erreur": 15.3440610798882,
          "site_ID_1": 665,
          "site_ID_2": 659,
          "site_ID_3": 760,
          "site_ID_4": "775",
          "site_ID_5": "NA",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2018,
          "N": 5,
          "distance": 188.950037468218,
          "erreur": 17.9894345998763,
          "site_ID_1": 651,
          "site_ID_2": 632,
          "site_ID_3": 643,
          "site_ID_4": "760",
          "site_ID_5": "775",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2018,
          "N": 6,
          "distance": 260.650037468218,
          "erreur": 8.30949969496752,
          "site_ID_1": 665,
          "site_ID_2": 542,
          "site_ID_3": 553,
          "site_ID_4": "532",
          "site_ID_5": "760",
          "site_ID_6": "775",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2018,
          "N": 7,
          "distance": 325.350037468218,
          "erreur": 2.44057986062382,
          "site_ID_1": 542,
          "site_ID_2": 521,
          "site_ID_3": 532,
          "site_ID_4": "658",
          "site_ID_5": "760",
          "site_ID_6": "775",
          "site_ID_7": "665",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2018,
          "N": 8,
          "distance": 416.850037468218,
          "erreur": 45.597631489922,
          "site_ID_1": 302,
          "site_ID_2": 279,
          "site_ID_3": 274,
          "site_ID_4": "131",
          "site_ID_5": "136",
          "site_ID_6": "141",
          "site_ID_7": "491",
          "site_ID_8": "636",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2018,
          "N": 9,
          "distance": 484.250037468218,
          "erreur": 19.6423332955414,
          "site_ID_1": 559,
          "site_ID_2": 504,
          "site_ID_3": 499,
          "site_ID_4": "327",
          "site_ID_5": "113",
          "site_ID_6": "118",
          "site_ID_7": "105",
          "site_ID_8": "267",
          "site_ID_9": "741",
          "site_ID_10": "NA"
       },
       {
          "year": 2018,
          "N": 10,
          "distance": 499.950037468218,
          "erreur": 17.7949346688063,
          "site_ID_1": 355,
          "site_ID_2": 349,
          "site_ID_3": 327,
          "site_ID_4": "169",
          "site_ID_5": "174",
          "site_ID_6": "542",
          "site_ID_7": "553",
          "site_ID_8": "532",
          "site_ID_9": "673",
          "site_ID_10": "690"
       },
       {
          "year": 2019,
          "N": 3,
          "distance": 146.450037468218,
          "erreur": 16.2974088083742,
          "site_ID_1": 636,
          "site_ID_2": 617,
          "site_ID_3": 741,
          "site_ID_4": "NA",
          "site_ID_5": "NA",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2019,
          "N": 4,
          "distance": 171.350037468218,
          "erreur": 6.8592014228223,
          "site_ID_1": 649,
          "site_ID_2": 643,
          "site_ID_3": 737,
          "site_ID_4": "741",
          "site_ID_5": "NA",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2019,
          "N": 5,
          "distance": 193.550037468218,
          "erreur": 5.45316861043764,
          "site_ID_1": 621,
          "site_ID_2": 617,
          "site_ID_3": 598,
          "site_ID_4": "736",
          "site_ID_5": "728",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2019,
          "N": 6,
          "distance": 260.250037468218,
          "erreur": 4.37867582165158,
          "site_ID_1": 661,
          "site_ID_2": 643,
          "site_ID_3": 516,
          "site_ID_4": "521",
          "site_ID_5": "525",
          "site_ID_6": "705",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2019,
          "N": 7,
          "distance": 343.750037468218,
          "erreur": 18.7448882775287,
          "site_ID_1": 508,
          "site_ID_2": 355,
          "site_ID_3": 366,
          "site_ID_4": "345",
          "site_ID_5": "628",
          "site_ID_6": "618",
          "site_ID_7": "729",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2019,
          "N": 8,
          "distance": 362.050037468218,
          "erreur": 3.13249705073567,
          "site_ID_1": 634,
          "site_ID_2": 525,
          "site_ID_3": 521,
          "site_ID_4": "517",
          "site_ID_5": "379",
          "site_ID_6": "383",
          "site_ID_7": "372",
          "site_ID_8": "729",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2019,
          "N": 9,
          "distance": 464.450037468218,
          "erreur": 1.9263813892576,
          "site_ID_1": 195,
          "site_ID_2": 173,
          "site_ID_3": 316,
          "site_ID_4": "338",
          "site_ID_5": "507",
          "site_ID_6": "503",
          "site_ID_7": "482",
          "site_ID_8": "724",
          "site_ID_9": "729",
          "site_ID_10": "NA"
       },
       {
          "year": 2019,
          "N": 10,
          "distance": 530.950037468218,
          "erreur": 1.37180050992025,
          "site_ID_1": 559,
          "site_ID_2": 405,
          "site_ID_3": 194,
          "site_ID_4": "172",
          "site_ID_5": "166",
          "site_ID_6": "311",
          "site_ID_7": "315",
          "site_ID_8": "482",
          "site_ID_9": "503",
          "site_ID_10": "717"
       }
    ],
    "Larzat": [
       {
          "year": 2017,
          "N": 3,
          "distance": 235.906407183428,
          "erreur": 11.490008085445,
          "site_ID_1": 46,
          "site_ID_2": 49,
          "site_ID_3": 53,
          "site_ID_4": "NA",
          "site_ID_5": "NA",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2017,
          "N": 4,
          "distance": 256.006407183428,
          "erreur": 11.3161347480809,
          "site_ID_1": 129,
          "site_ID_2": 123,
          "site_ID_3": 120,
          "site_ID_4": "101",
          "site_ID_5": "NA",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2017,
          "N": 5,
          "distance": 315.906407183428,
          "erreur": 9.64456319707285,
          "site_ID_1": 129,
          "site_ID_2": 92,
          "site_ID_3": 95,
          "site_ID_4": "98",
          "site_ID_5": "101",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2017,
          "N": 6,
          "distance": 377.106407183428,
          "erreur": 5.7012467072474,
          "site_ID_1": 76,
          "site_ID_2": 66,
          "site_ID_3": 39,
          "site_ID_4": "44",
          "site_ID_5": "48",
          "site_ID_6": "79",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2017,
          "N": 7,
          "distance": 426.106407183428,
          "erreur": 5.68851197372715,
          "site_ID_1": 129,
          "site_ID_2": 123,
          "site_ID_3": 113,
          "site_ID_4": "86",
          "site_ID_5": "91",
          "site_ID_6": "95",
          "site_ID_7": "101",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2017,
          "N": 8,
          "distance": 508.106407183428,
          "erreur": 4.86666027066727,
          "site_ID_1": 52,
          "site_ID_2": 73,
          "site_ID_3": 69,
          "site_ID_4": "64",
          "site_ID_5": "37",
          "site_ID_6": "170",
          "site_ID_7": "174",
          "site_ID_8": "178",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2017,
          "N": 9,
          "distance": 784.806407183428,
          "erreur": 2.24242038173061,
          "site_ID_1": 43,
          "site_ID_2": 522,
          "site_ID_3": 519,
          "site_ID_4": "516",
          "site_ID_5": "335",
          "site_ID_6": "338",
          "site_ID_7": "344",
          "site_ID_8": "347",
          "site_ID_9": "326",
          "site_ID_10": "NA"
       },
       {
          "year": 2017,
          "N": 10,
          "distance": 1277.70640718343,
          "erreur": 0.248283209587318,
          "site_ID_1": 51,
          "site_ID_2": 1362,
          "site_ID_3": 1333,
          "site_ID_4": "1913",
          "site_ID_5": "1891",
          "site_ID_6": "2110",
          "site_ID_7": "2106",
          "site_ID_8": "1459",
          "site_ID_9": "1495",
          "site_ID_10": "1466"
       },
       {
          "year": 2018,
          "N": 3,
          "distance": 205.406407183428,
          "erreur": 64.0988548653964,
          "site_ID_1": 76,
          "site_ID_2": 73,
          "site_ID_3": 79,
          "site_ID_4": "NA",
          "site_ID_5": "NA",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2018,
          "N": 4,
          "distance": 256.106407183428,
          "erreur": 44.7146896908028,
          "site_ID_1": 129,
          "site_ID_2": 120,
          "site_ID_3": 98,
          "site_ID_4": "101",
          "site_ID_5": "NA",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2018,
          "N": 5,
          "distance": 337.006407183428,
          "erreur": 34.8907456399233,
          "site_ID_1": 100,
          "site_ID_2": 66,
          "site_ID_3": 70,
          "site_ID_4": "73",
          "site_ID_5": "79",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2018,
          "N": 6,
          "distance": 355.606407183428,
          "erreur": 34.9193653915036,
          "site_ID_1": 73,
          "site_ID_2": 70,
          "site_ID_3": 65,
          "site_ID_4": "92",
          "site_ID_5": "100",
          "site_ID_6": "79",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2018,
          "N": 7,
          "distance": 437.106407183428,
          "erreur": 26.6910222190826,
          "site_ID_1": 129,
          "site_ID_2": 119,
          "site_ID_3": 92,
          "site_ID_4": "110",
          "site_ID_5": "114",
          "site_ID_6": "97",
          "site_ID_7": "101",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2018,
          "N": 8,
          "distance": 633.006407183428,
          "erreur": 22.3028296686324,
          "site_ID_1": 76,
          "site_ID_2": 73,
          "site_ID_3": 63,
          "site_ID_4": "242",
          "site_ID_5": "239",
          "site_ID_6": "220",
          "site_ID_7": "251",
          "site_ID_8": "248",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2018,
          "N": 9,
          "distance": 619.206407183428,
          "erreur": 21.7472154728177,
          "site_ID_1": 79,
          "site_ID_2": 373,
          "site_ID_3": 368,
          "site_ID_4": "365",
          "site_ID_5": "360",
          "site_ID_6": "61",
          "site_ID_7": "39",
          "site_ID_8": "66",
          "site_ID_9": "48",
          "site_ID_10": "NA"
       },
       {
          "year": 2018,
          "N": 10,
          "distance": 838.706407183428,
          "erreur": 14.0986264632225,
          "site_ID_1": 50,
          "site_ID_2": 47,
          "site_ID_3": 285,
          "site_ID_4": "37",
          "site_ID_5": "776",
          "site_ID_6": "781",
          "site_ID_7": "784",
          "site_ID_8": "787",
          "site_ID_9": "816",
          "site_ID_10": "819"
       },
       {
          "year": 2019,
          "N": 3,
          "distance": 201.306407183428,
          "erreur": 21.9410108533902,
          "site_ID_1": 129,
          "site_ID_2": 98,
          "site_ID_3": 101,
          "site_ID_4": "NA",
          "site_ID_5": "NA",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2019,
          "N": 4,
          "distance": 256.006407183428,
          "erreur": 13.8955093086578,
          "site_ID_1": 129,
          "site_ID_2": 123,
          "site_ID_3": 120,
          "site_ID_4": "101",
          "site_ID_5": "NA",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2019,
          "N": 5,
          "distance": 297.606407183428,
          "erreur": 10.3532746686635,
          "site_ID_1": 129,
          "site_ID_2": 123,
          "site_ID_3": 93,
          "site_ID_4": "95",
          "site_ID_5": "101",
          "site_ID_6": "NA",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2019,
          "N": 6,
          "distance": 436.906407183428,
          "erreur": 3.56210628517954,
          "site_ID_1": 54,
          "site_ID_2": 278,
          "site_ID_3": 275,
          "site_ID_4": "269",
          "site_ID_5": "241",
          "site_ID_6": "247",
          "site_ID_7": "NA",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2019,
          "N": 7,
          "distance": 1168.70640718343,
          "erreur": 22.5238218318374,
          "site_ID_1": 101,
          "site_ID_2": 2396,
          "site_ID_3": 2380,
          "site_ID_4": "2671",
          "site_ID_5": "2172",
          "site_ID_6": "2169",
          "site_ID_7": "874",
          "site_ID_8": "NA",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2019,
          "N": 8,
          "distance": 650.606407183428,
          "erreur": 10.1089799203358,
          "site_ID_1": 101,
          "site_ID_2": 129,
          "site_ID_3": 121,
          "site_ID_4": "328",
          "site_ID_5": "346",
          "site_ID_6": "315",
          "site_ID_7": "343",
          "site_ID_8": "325",
          "site_ID_9": "NA",
          "site_ID_10": "NA"
       },
       {
          "year": 2019,
          "N": 9,
          "distance": 698.706407183428,
          "erreur": 8.88159698911365,
          "site_ID_1": 103,
          "site_ID_2": 125,
          "site_ID_3": 456,
          "site_ID_4": "453",
          "site_ID_5": "448",
          "site_ID_6": "415",
          "site_ID_7": "211",
          "site_ID_8": "189",
          "site_ID_9": "218",
          "site_ID_10": "NA"
       },
       {
          "year": 2019,
          "N": 10,
          "distance": 841.406407183428,
          "erreur": 3.35107634268981,
          "site_ID_1": 50,
          "site_ID_2": 179,
          "site_ID_3": 197,
          "site_ID_4": "201",
          "site_ID_5": "193",
          "site_ID_6": "438",
          "site_ID_7": "444",
          "site_ID_8": "441",
          "site_ID_9": "447",
          "site_ID_10": "425"
       }
    ]
  };
  picaPointEntree = {
   "type": "FeatureCollection" as const,
   "name": "pica_point_entree",
   "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
   "features": [
   { "type": "Feature" as const, "properties": { }, "geometry": { "type": "Point" as const, "coordinates": [ 3.842628614129383, 43.54683414307403 ] } },
   { "type": "Feature" as const, "properties": { }, "geometry": { "type": "Point" as const, "coordinates": [ 3.847819272844737, 43.542169872302523 ] } },
   { "type": "Feature" as const, "properties": { }, "geometry": { "type": "Point" as const, "coordinates": [ 3.867839638443495, 43.531683510969692 ] } }
   ]
   };

  chapitrecorner2 = L.latLng(43.55425783681239, 3.87682261526906);
  chapitrecorner1 = L.latLng(43.526153988197812, 3.833899052720867);
  chapitremaxbounds = L.latLngBounds(this.chapitrecorner1,this.chapitrecorner2);

  getIcon(id) {
     var path = 'assets/images/iconeechantillon'+id+'.png';
     var icon = L.icon({
      iconUrl : path,
      iconSize:     [26, 51], // size of the icon
      iconAnchor:   [13, 51], // point of the icon which will correspond to marker's location
      popupAnchor:  [-3, -60] // point from which the popup should open relative to the iconAnchor
    });  
    return icon;
  }



  initializeMapOptions(map) {
    if (this.ChoixUtilisateurService.choix.parcelle !== '') {
      this.millesime = this.ChoixUtilisateurService.choix.millesime;
      if (this.ChoixUtilisateurService.choix.parcelle == 'Larzat') {
        this.choixParcelle = this.parcelles[0];
      } else if (this.ChoixUtilisateurService.choix.parcelle == 'Arnel') {
        this.choixParcelle = this.parcelles[1];
      } else if (this.ChoixUtilisateurService.choix.parcelle == 'Estagnol') {
        this.choixParcelle = this.parcelles[2];
      };
    } else {
      this.choixParcelle = this.parcelles[0];
    }
    this.mymap = L.map(map,{
      maxZoom: 21,
      minZoom: 16,
      maxBounds: this.choixParcelle.get_bounds(),
    }).setView(this.choixParcelle.get_center(), 17);
    
    const wmsLayer = L.tileLayer.wms('https://copernicus.discomap.eea.europa.eu/arcgis/services/GioLand/VeryHighResolution2012/MapServer/WMSServer?', {
    attribution: 'IGN-F/Geoportail',
    layers: 'core003_Mosaic_NaturalColor_Feathering',
    });  
    wmsLayer.addTo(this.mymap);
    
    const ignLayer = L.tileLayer("https://wxs.ign.fr/j0d4f0ndq4viayjxj30a5u1v/geoportail/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIXSET=PM&TILEMATRIX={z}&TILECOL={x}&TILEROW={y}&STYLE=normal&FORMAT=image/jpeg", {
    attribution: 'IGN-F/Geoportail',
    minZoom : 1,
    maxNativeZoom : 18,
    maxZoom: 22,});
    ignLayer.addTo(this.mymap);

    this.picaLayer = this.choixParcelle[this.millesime].addTo(this.mymap);

    var geojsonMarkerOptions = {
      radius: 6,
      fillColor: "#ff7800",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
  };

    var pointEntreeLayer = L.geoJSON(this.picaPointEntree, {pointToLayer : function(feature, latlng) {
       return L.circleMarker(latlng, geojsonMarkerOptions);
    }}).addTo(this.mymap);

    var legend = new L.Control({position: 'bottomright'});
    legend.onAdd = this.addlegend;
    legend.addTo(this.mymap);

    this.addChangeTransparency();
  };

  addChangeTransparency() {
   var transparenceValue = this.transparence;
   var transparency =  L.Control.extend({        
      options: {
        position: 'bottomleft'
      },

      onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

        container.style.backgroundColor = 'white';     
        container.style.width = '100px';
        container.style.height = '60px';
        container.style.padding = '3px';
        container.innerHTML = 'Ajuster la transparence:<br> <input type="range" value="'+transparenceValue+'" id="opacity" class="form-control-range"/>';
        L.DomEvent.disableClickPropagation(container);

        return container;
      }
    });
    this.mymap.addControl(new transparency());
    document.getElementById('opacity').addEventListener('input',() => {       
     this.changeTransparency();
    })
  }
  

  changeTransparency() {
   var value = (<HTMLInputElement>document.getElementById("opacity")).value;
   this.transparence = parseInt(value);
   this.picaLayer.setOpacity(1-parseInt(value)/100);
  }

   addlegend() {
      function getColor(d) {
         return d > 0.45 ? '#417324' :         
                d > 0.40 ? '#53872A' :         
                d > 0.35 ? '#85C630' :         
                d > 0.30 ? '#FAEC7F' :         
                d > 0.25 ? '#E2AD3B' :         
                d > 0.20 ? '#BF5C00' :         
                d > 0.15 ? '#901811' :
                d > 0.10 ? '#5C110F' :
                        '#4D006C' ;
      };
      var div = L.DomUtil.create('div', 'info legend'),
              grades = [0,0.1,0.15,0.20,0.25,0.30,0.35,0.40,0.45,0.5];
      div.innerHTML = '<strong> GLCV </strong> <br>';

      for (var i=0; i < grades.length; i++) {
         div.innerHTML += '<i class="square" style="background:' + getColor(grades[i] + 0.01) + '"></i> ' +
         grades[i] + (grades[i + 1] ? '&ndash;' + grades[i +1] + '<br>' : '+');
      };
      div.innerHTML += '<br><br><i class="circlepadding"></i> <strong>Point d\'entrée</strong>';
      return div;
      
   };  

  addResultatJoueur (nbPoint, points, index) {

    //On récupère les points du joueur et on les affiche.
    for (let i = 0; i < nbPoint; i++) {
       var latlng = new L.LatLng(points[i][0], points[i][1]);
       console.log(points[i]+' et '+index[i]);
       var marker = L.marker(latlng, {icon : this.getIcon(index[i]+1)}).addTo(this.mymap);
       this.markerPlan.push(marker);
    };
    return this.markerPlan;
  }

  paramParcoursOptimal(nbPoint) {
    //On ajoute dans la variable picaOptimalParcelle les différents parcours optimaux de la parcelle choisie.
    if (this.choixParcelle.name == 'Larzat') {
      this.picaOptimalParcelle = this.picaOptimal.Larzat;
   } else if (this.choixParcelle.name == 'Arnel') {
      this.picaOptimalParcelle = this.picaOptimal.Arnel;
   } else if (this.choixParcelle.name == 'Estagnol') {
      this.picaOptimalParcelle = this.picaOptimal.Estagnol;
   };

   //On extrait des parcours optimaux de la parcelle choisie (picaOptimalParcelle) le parcours optimal correspondant à l'année et au nombre de point du joueur. Ce parcours est stocké dans picaOptimalParcelleMillesime.
   var picaOptimalParcelleMillesime = [];
   if (this.millesime === "pica2017") {
      picaOptimalParcelleMillesime = this.picaOptimalParcelle.find(element => element.year === 2017 && element.N === nbPoint);
   } else if (this.millesime === "pica2018") {
      picaOptimalParcelleMillesime = this.picaOptimalParcelle.find(element => element.year === 2018 && element.N === nbPoint);
   } else if (this.millesime === "pica2019") {
      picaOptimalParcelleMillesime = this.picaOptimalParcelle.find(element => element.year === 2019 && element.N === nbPoint);
   }
   return picaOptimalParcelleMillesime;
  }


  constructor(private ListeparcelleService : ListeparcelleService, private ChoixUtilisateurService : ChoixUtilisateurService,) { }
}
