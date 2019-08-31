import { Component, OnInit } from '@angular/core';

/* La siguiente linea es una solución para que el menu se configure cuando se cargue cada plugin por fuera
   de angular.
*/
declare function initPlugins();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'isas';

  ngOnInit() {
    initPlugins();
  }
}
