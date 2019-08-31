import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal';

// Sweet Alert
import swal from 'sweetalert';

@Component({
  selector: 'app-nuevo-grupo',
  templateUrl: './nuevo-grupo.component.html',
  styleUrls: ['./nuevo-grupo.component.css']
})
export class NuevoGrupoComponent implements OnInit {

  protected submitted = false;
  frmGrupo: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bsModalRef: BsModalRef,
  ) { }

  hide(): void {
    if (this.frmGrupo.dirty) {
      swal({
        title: '¿Está seguro?',
        text: 'Esta a punto de perder la información del grupo ingresada.',
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
    this.frmGrupo = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      grado: ['', [Validators.required]],
    });
  }

  submit() {
    this.submitted = true;
    if (this.frmGrupo.valid) {
      console.log('listo');
    }
  }

  esValido(name: string): boolean {
    const input = this.frmGrupo.controls[name];
    return ((input.touched || input.dirty) || this.submitted) && input.invalid;
  }

}
