import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Sweet Alert
import swal from 'sweetalert';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {

  frmMateria: FormGroup;

  constructor(
    private bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
  ) { }

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
    this.frmMateria = this.formBuilder.group({
      clave: [''],
      nombre: ['', [Validators.required]]
    });
  }

}
