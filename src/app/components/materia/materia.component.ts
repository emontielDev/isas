import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Sweet Alert
import swal from 'sweetalert';

// Models
import { Materia } from '../../models/material.model';

// Services
import { MateriaService } from 'src/app/services/services.index';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {

  public onSuccess: EventEmitter<Materia> = new EventEmitter();


  frmMateria: FormGroup;
  submitted = false;

  constructor(
    private materiaService: MateriaService,
    private bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
  ) {
    this.frmMateria = this.formBuilder.group({
      clave: [''],
      nombre: ['', [Validators.required]],
      curricular: [null, [Validators.required]]
    });
  }

  hide(): void {
    if (this.frmMateria.dirty) {
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
  }

  guardar() {
    if (this.frmMateria.invalid) {
      return;
    }

    let o = Object.assign({});
    o = Object.assign(o, this.frmMateria.value);

    this.materiaService.guardar(o as Materia)
      .subscribe((materia: Materia) => {
        console.log(materia);
        this.bsModalRef.hide();
        this.onSuccess.emit(materia);
      });

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
