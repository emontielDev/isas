import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';

// Component
import { ProfesorComponent } from '../../components/profesor/profesor.component';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  add(): void {
    this.bsModalRef = this.modalService.show(ProfesorComponent,
      { ignoreBackdropClick: true, keyboard: false, class: 'modal-lg' });
  }

}
