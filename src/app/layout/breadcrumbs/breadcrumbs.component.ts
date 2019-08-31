import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  // Propiedades
  label = '';

  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {
    this.getDataRoute()
      .subscribe(data => {
        this.label = data.title;
        this.title.setTitle(data.title);

        const metaTag: MetaDefinition = {
          name: 'description',
          content: this.label
        };

        this.meta.updateTag(metaTag);
        // console.log(data);
      });
  }

  getDataRoute() {
    return this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd), // Solo nos interesa los eventos de el tipo ActivationEnd
        filter((event: ActivationEnd) => event.snapshot.firstChild === null), // Solo los routes que tienen el firtschild nulo
        map((event: ActivationEnd) => event.snapshot.data) // Regresamos unicamente el dato
      );
  }

  ngOnInit() {
  }

}
