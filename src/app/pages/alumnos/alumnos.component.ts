import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// Services
import { AlumnoService } from '../../services/alumno/alumno.service';
import { Alumno } from '../../models/alumno.model';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  alumnos: Alumno[];
  frmBusquedaAlumnos: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alumnoService: AlumnoService
  ) { }

  buscar() {
    this.alumnoService.obtener(this.frmBusquedaAlumnos.controls.criterio.value || '')
      .subscribe(data => this.alumnos = data);
  }

  cambiarAvatar(alumno: Alumno, control: ElementRef) {
    console.log(control);
  }

  ngOnInit() {
    this.frmBusquedaAlumnos = this.formBuilder.group({
      criterio: [''],
    });

    this.buscar();
  }


}
