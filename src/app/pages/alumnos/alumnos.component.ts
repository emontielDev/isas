import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  frmBusquedaAlumnos: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  buscar() {

  }

  ngOnInit() {
    this.frmBusquedaAlumnos = this.formBuilder.group({
      nombre: ['', [Validators.required]],
    });
  }

}
