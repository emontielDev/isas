import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

// Sweet Alert
import swal from 'sweetalert';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {

  frmProfesor: FormGroup;

  constructor(
    private bsModalRef: BsModalRef,
    private formBuilder: FormBuilder
  ) { }

  hide(): void {
    if (this.frmProfesor.dirty) {
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
    this.frmProfesor = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apaterno: ['', [Validators.required]],
      amaterno: ['', [Validators.required]],
      correoelectronico: ['', [Validators.required, CustomValidators.email]],
      fechanacimiento: ['', [Validators.required]],
      sexo: [null, [Validators.required]]
    });
  }

}
