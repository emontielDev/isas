import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import '../../../../node_modules/datatables.net/js/jquery.dataTables.js';

// Modal
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

// Models
import { Materia } from '../../models/material.model';

// Components
import { MateriaComponent } from '../../components/materia/materia.component';

// Sweet Alert
import swal from 'sweetalert';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}


@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  bsModalRef: BsModalRef;
  dtOptions: DataTables.Settings = {};
  materias: any[];
  constructor(
    private http: HttpClient,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      searching: false,
      language: {
        processing: 'Procesando...',
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ registros',
        info: 'Mostrando desde _START_ al _END_ de _TOTAL_ elementos',
        infoEmpty: 'Mostrando ningún elemento.',
        infoFiltered: '(filtrado _MAX_ elementos total)',
        infoPostFix: '',
        loadingRecords: 'Cargando registros...',
        zeroRecords: 'No se encontraron registros.',
        emptyTable: 'No hay datos disponibles en el catalogo.',
        paginate: {
          first: 'Primero',
          previous: 'Anterior',
          next: 'Siguiente',
          last: 'Último'
        },
        aria: {
          sortAscending: ': Activar para ordenar la tabla en orden ascendente',
          sortDescending: ': Activar para ordenar la tabla en orden descendente'
        }
      },
      ajax: (dataTablesParameters: any, callback) => {
        this.http
          .post<DataTablesResponse>(
            '/api/materia', {
              params: dataTablesParameters
            }
          ).subscribe(resp => {
            this.materias = resp.data;

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data
            });
          });
      },
      columns: [{ data: 'id', title: 'ID' }, { data: 'clave', title: 'Clave' }, { data: 'nombre', title: 'Nombre' }]
    };
  }

  add(): void {
    this.bsModalRef = this.modalService.show(MateriaComponent,
      { ignoreBackdropClick: true, keyboard: false });

    this.bsModalRef.content.onSuccess.subscribe((materia: Materia) => {
      swal('Solicitud exitosa', `La materia '${materia.nombre}' fue registrada con exito.`, 'success');
    });
  }

}
