import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import '../../../../node_modules/datatables.net/js/jquery.dataTables.js';

// Components
import { MateriaComponent } from '../../components/materia/materia.component';

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
      ajax: (dataTablesParameters: any, callback) => {
        this.http
          .post<DataTablesResponse>(
            'http://localhost:3000/materia', {
              params: dataTablesParameters
            }
          ).subscribe(resp => {
            this.materias = resp.data;

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [{ data: 'id' }, { data: 'firstName' }, { data: 'lastName' }]
    };
  }

  add(): void {
    this.bsModalRef = this.modalService.show(MateriaComponent,
      { ignoreBackdropClick: true, keyboard: false });
  }

}
