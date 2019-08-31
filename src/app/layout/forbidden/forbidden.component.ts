import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styles: []
})
export class ForbiddenComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  back() {
    this.location.back();
  }

  ngOnInit() {
  }

}
