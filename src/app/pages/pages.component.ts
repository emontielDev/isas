import { Component, OnInit } from '@angular/core';

/* La siguiente linea es una solución para que el menu se configure cuando se cargue cada plugin por fuera
   de angular.
*/
declare function initPlugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    initPlugins(); // Mandamos a llamar la funcion de assets/js/custom.js
  }

}
