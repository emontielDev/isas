import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Services
import { AlumnoService } from '../../services/alumno/alumno.service';
import { Usuario } from '../../models/usuario.model';

// Sweet Alert
import swal from 'sweetalert';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  alumnos: Usuario[];
  frmBusquedaAlumnos: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alumnoService: AlumnoService
  ) { }

  actualizarAvatar(data: any, alumno: Usuario) {
    const nombreCompleto = `${alumno.nombre} ${alumno.apaterno} ${alumno.amaterno || ''}`.trim();
    swal({
      title: '¿Está seguro?',
      text: `Esta a punto de actualizar la imagen de: ${nombreCompleto}`,
      icon: 'info',
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true,
    })
      .then(actualizar => {
        if (actualizar) {
          this.alumnoService.actualizarAvatar(alumno.id, data.avatar)
            .subscribe((res: Usuario) => {
              swal('Actualización exitosa', `La imagen del alumno fue actualizada.`, 'success');
              this.buscar();
            });
        } else {
          data.instancia.limpiarTemporal();
        }
      });
    return;
  }

  buscar() {
    this.alumnoService.obtener(this.frmBusquedaAlumnos.controls.criterio.value || '')
      .subscribe(data => this.alumnos = data);
  }

  cambiarAvatar(alumno: Usuario, control: ElementRef) {
    console.log(control);
  }

  ngOnInit() {
    this.frmBusquedaAlumnos = this.formBuilder.group({
      criterio: [''],
    });

    this.buscar();
  }


}
