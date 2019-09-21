import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

// Components
import { GradoComponent } from '../../../components/grado/grado.component';

// Modelos
import { Grado } from '../../../models/grado.model';
import { Nivel } from '../../../models/nivel.model';

// Servicios
import { NivelService } from '../../../services/nivel/nivel.service';

// Sweet Alert
import swal from 'sweetalert';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nivel-grados',
  templateUrl: './nivel-grados.component.html',
  styleUrls: ['./nivel-grados.component.css']
})
export class NivelGradosComponent implements OnInit {
  bsModalRef: BsModalRef;
  nivel: Nivel = null;
  grados: Grado[];
  frmBusquedaGrado: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private nivelService: NivelService,
    private route: ActivatedRoute
  ) { }

  agregar(): void {
    this.bsModalRef = this.modalService.show(GradoComponent,
      { ignoreBackdropClick: true, initialState: { nivel: this.nivel }, keyboard: false });

    this.bsModalRef.content.exitoso.subscribe((grado: Grado) => {
      swal('Solicitud exitosa', `El grado '${grado.nombre}' fue registrado con exito.`, 'success');
      this.buscar();
    });
  }

  buscar() {
    if (!this.nivel) {
      this.nivelService.obtenerPorId(parseInt(this.route.snapshot.paramMap.get('id'), 0))
        .subscribe((nivel: Nivel) => {
          this.nivel = nivel;
          this.nivelService.obtenerGrados(this.nivel, this.frmBusquedaGrado.controls.criterio.value || '')
            .subscribe(data => this.grados = data);
        });
    } else {
      this.nivelService.obtenerGrados(this.nivel, this.frmBusquedaGrado.controls.criterio.value || '')
        .subscribe(data => this.grados = data);
    }
  }

  editar(grado: Grado) {
    this.bsModalRef = this.modalService.show(GradoComponent,
      { ignoreBackdropClick: true, initialState: { nivel: this.nivel, grado }, keyboard: false });

    this.bsModalRef.content.exitoso.subscribe((gradoEditado: Grado) => {
      swal('Actualización exitosa', `El nivel '${gradoEditado.nombre}' fue actualizado con exito.`, 'success');
      this.buscar();
    });
  }

  ngOnInit() {
    this.frmBusquedaGrado = this.formBuilder.group({
      criterio: ['']
    });
    this.buscar();
  }

}
