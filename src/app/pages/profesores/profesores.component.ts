import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Component
import { AvatarComponent } from '../../components/avatar/avatar.component';
import { ProfesorComponent } from '../../components/profesor/profesor.component';

// Models
import { Usuario } from '../../models/usuario.model';

// Sweet Alert
import swal from 'sweetalert';

// Service
import { ProfesorService } from '../../services/services.index';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})

export class ProfesoresComponent implements OnInit {

  bsModalRef: BsModalRef;
  frmBusquedaProfesores: FormGroup;
  profesores: Usuario[];

  constructor(
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private profesorService: ProfesorService
  ) { }

  actualizarAvatar(data: any, profesor: Usuario) {
    const nombreCompleto = `${profesor.nombre} ${profesor.apaterno} ${profesor.amaterno || ''}`.trim();
    swal({
      title: '¿Está seguro?',
      text: `Esta a punto de actualizar la imagen de: ${nombreCompleto}`,
      icon: 'info',
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true,
    })
      .then(actualizar => {
        if (actualizar) {
          this.profesorService.actualizarAvatar(profesor.id, data.avatar)
            .subscribe((res: Usuario) => {
              swal('Actualización exitosa', `La imagen del profesor fue actualizada.`, 'success');
              this.buscar();
            });
        } else {
          data.instancia.limpiarTemporal();
        }
      });
    return;
  }

  agregar(): void {
    this.bsModalRef = this.modalService.show(ProfesorComponent,
      { ignoreBackdropClick: true, keyboard: false, class: 'modal-lg' });

    this.bsModalRef.content.exitoso.subscribe((profesor: Usuario) => {
      const nombreCompleto = `${profesor.nombre} ${profesor.apaterno} ${profesor.amaterno || ''}`.trim();
      swal('Alta exitosa', `El profesor '${nombreCompleto}' fue registrado con exito.`, 'success');
      this.frmBusquedaProfesores.controls.criterio.setValue('');
      this.buscar();
    });
  }

  buscar() {
    this.profesorService.obtener(this.frmBusquedaProfesores.controls.criterio.value || '')
      .subscribe(data => this.profesores = data);
  }

  editarProfesor(profesor: Usuario) {
    console.log(profesor);
    this.bsModalRef = this.modalService.show(ProfesorComponent,
      { ignoreBackdropClick: true, initialState: { profesor }, keyboard: false, class: 'modal-lg' });

    this.bsModalRef.content.exitoso.subscribe((profesorEditado: Usuario) => {
      const nombreCompleto = `${profesorEditado.nombre} ${profesorEditado.apaterno} ${profesorEditado.amaterno || ''}`.trim();
      swal('Actualización exitosa', `El profesor '${nombreCompleto}' fue actualizado con exito.`, 'success');
      this.buscar();
    });
  }

  ngOnInit() {
    this.frmBusquedaProfesores = this.formBuilder.group({
      criterio: ['']
    });

    this.buscar();
  }
}
