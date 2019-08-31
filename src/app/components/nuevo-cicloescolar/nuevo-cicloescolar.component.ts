import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Modal Services's
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

// Component's
import { NuevoGrupoComponent } from '../nuevo-grupo/nuevo-grupo.component';

@Component({
  selector: 'app-nuevo-cicloescolar',
  templateUrl: './nuevo-cicloescolar.component.html',
  styleUrls: ['./nuevo-cicloescolar.component.css']
})
export class NuevoCicloescolarComponent implements OnInit {

  frmCicloEscolar: FormGroup;
  frmGrupos: FormGroup;

  constructor(
    private bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
  ) { }

  agregraGrupo(): void {
    this.bsModalRef = this.modalService.show(NuevoGrupoComponent,
      { ignoreBackdropClick: true, keyboard: false });
  }

  hide(): void {
    // if (this.frmMateria.dirty) {
    //   swal({
    //     title: '¿Está seguro?',
    //     text: 'Estas a punto de perder la información ingresada.',
    //     icon: 'info',
    //     buttons: ['Cancelar', 'Aceptar'],
    //     dangerMode: true,
    //   })
    //     .then(willDelete => {
    //       if (willDelete) {
    //         this.bsModalRef.hide();
    //       }
    //     });

    //   return;
    // } else {
    this.bsModalRef.hide();
    // }
  }

  ngOnInit() {
    this.frmCicloEscolar = this.formBuilder.group({
      nombre: ['', [Validators.required]]
    });
  }

}
