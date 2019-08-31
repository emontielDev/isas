import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

declare function initPlugins();

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styles: []
})
export class NotfoundComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  back() {
    this.location.back();
  }

  ngOnInit() {
  }

}
