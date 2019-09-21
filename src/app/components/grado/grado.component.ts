import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

// Modelos
import { Grado } from '../../models/grado.model';
import { Nivel } from '../../models/nivel.model';

// Sweet Alert
import swal from 'sweetalert';
import { GradoService } from '../../services/grado/grado.service';

@Component({
  selector: 'app-grado',
  templateUrl: './grado.component.html',
  styleUrls: ['./grado.component.css']
})
export class GradoComponent implements OnInit {
  public exitoso: EventEmitter<Grado> = new EventEmitter();

  nivel: Nivel;
  grado: Grado;
  frmGrado: FormGroup;
  submitted = false;

  constructor(
    private bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private gradoService: GradoService
  ) {
    this.frmGrado = this.formBuilder.group({
      nombre: ['']
    });
  }

  guardar() {
    this.submitted = true;

    let o = Object.assign({});
    o = (Object.assign(o, this.frmGrado.value) as Grado);

    if (this.grado) {
      o.id = this.grado.id;

      this.gradoService.actualizar(o)
        .subscribe((grado: Grado) => {
          this.bsModalRef.hide();
          this.exitoso.emit(grado);
        }, (e) => {
          swal('Error', e.error.mensaje, 'error');
        });
    } else {
      o.nivel = this.nivel;

      this.gradoService.guardar(o)
        .subscribe((grado: Grado) => {
          this.bsModalRef.hide();
          this.exitoso.emit(grado);
        }, (e) => {
          swal('Error', e.error.mensaje, 'error');
        });
    }
  }

  hide(): void {
    if (this.frmGrado.dirty) {
      swal({
        title: '¿Está seguro?',
        text: 'Estas a punto de perder la información ingresada.',
        icon: 'info',
        buttons: ['Cancelar', 'Aceptar'],
        dangerMode: true,
      })
        .then(willDelete => {
          if (willDelete) {
            this.bsModalRef.hide();
          }
        });

      return;
    } else {
      this.bsModalRef.hide();
    }
  }

  ngOnInit() {
    if (this.grado) {
      this.frmGrado.controls.nombre.setValue(this.grado.nombre);
      this.frmGrado.markAsPristine();
    }
  }

  mostrarMensajeError(form: FormGroup, name: string, type: string) {
    const input = form.controls[name];
    return ((input.touched || input.dirty) || this.submitted) && input.hasError(type);
  }

  validarControl(form: FormGroup, name: string): string {
    const input = form.controls[name];
    if (input.invalid && ((input.touched || input.dirty) || this.submitted)) {
      return '1'; // is invalid
    } else if (input.valid && input.validator != null) {
      return '0'; // is valid
    } else {
      return '2'; // not is required
    }
  }
}
