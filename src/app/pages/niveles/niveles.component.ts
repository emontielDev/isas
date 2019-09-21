import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

// Modelos
import { Nivel } from '../../models/nivel.model';

// Servicios
import { NivelService } from '../../services/nivel/nivel.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NivelComponent } from 'src/app/components/nivel/nivel.component';

// Sweet Alert
import swal from 'sweetalert';

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.component.html',
  styleUrls: ['./niveles.component.css']
})
export class NivelesComponent implements OnInit {
  bsModalRef: BsModalRef;
  frmBusquedaNivel: FormGroup;
  niveles: Nivel[];

  constructor(
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private nivelService: NivelService
  ) { }

  agregar(): void {
    this.bsModalRef = this.modalService.show(NivelComponent,
      { ignoreBackdropClick: true, keyboard: false });

    this.bsModalRef.content.exitoso.subscribe((nivel: Nivel) => {
      swal('Solicitud exitosa', `El nivel '${nivel.nombre}' fue registrado con exito.`, 'success');
      this.buscar();
    });
  }

  buscar() {
    this.nivelService.obtener(this.frmBusquedaNivel.controls.criterio.value || '')
      .subscribe(data => this.niveles = data);
  }

  editar(nivel: Nivel) {
    this.bsModalRef = this.modalService.show(NivelComponent,
      { ignoreBackdropClick: true, initialState: { nivel }, keyboard: false });

    this.bsModalRef.content.exitoso.subscribe((nivelEditado: Nivel) => {
      swal('Actualización exitosa', `El nivel '${nivelEditado.nombre}' fue actualizado con exito.`, 'success');
      this.buscar();
    });
  }

  ngOnInit() {
    this.frmBusquedaNivel = this.formBuilder.group({
      criterio: ['']
    });
    this.buscar();
  }


}
