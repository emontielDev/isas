import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Componentes
import { Nivel } from '../../models/nivel.model';

// Sweet Alert
import swal from 'sweetalert';

// Services
import { NivelService } from '../../services/nivel/nivel.service';

@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.component.html',
  styleUrls: ['./nivel.component.css']
})
export class NivelComponent implements OnInit {
  public exitoso: EventEmitter<Nivel> = new EventEmitter();

  nivel: Nivel;
  frmNivel: FormGroup;
  submitted = false;

  constructor(
    private bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private nivelService: NivelService
  ) {
    this.frmNivel = this.formBuilder.group({
      nombre: [''],
      evaluaciones: [0, [Validators.compose([Validators.required, Validators.min(1), Validators.max(9)])]]
    });
  }

  guardar() {
    this.submitted = true;
    if (this.frmNivel.invalid) {
      return;
    }

    let o = Object.assign({});
    o = Object.assign(o, this.frmNivel.value);

    if (this.nivel) {
      o = o as Nivel;
      o.id = this.nivel.id;

      this.nivelService.actualizar(o)
        .subscribe((nivel: Nivel) => {
          console.log(nivel);
          this.bsModalRef.hide();
          this.exitoso.emit(nivel);
        }, (e) => {
          swal('Error', e.error.mensaje, 'error');
        });
    } else {
      this.nivelService.guardar(o as Nivel)
        .subscribe((nivel: Nivel) => {
          console.log(nivel);
          this.bsModalRef.hide();
          this.exitoso.emit(nivel);
        }, (e) => {
          swal('Error', e.error.mensaje, 'error');
        });
    }


  }

  hide(): void {
    if (this.frmNivel.dirty) {
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
    if (this.nivel) {
      this.frmNivel.controls.nombre.setValue(this.nivel.nombre);
      this.frmNivel.controls.evaluaciones.setValue(this.nivel.evaluaciones);
      this.frmNivel.controls.evaluaciones.updateValueAndValidity();
      this.frmNivel.markAsPristine();
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
