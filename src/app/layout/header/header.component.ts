import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Modal Component
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

// Component's
import { NuevoCicloescolarComponent } from '../../components/nuevo-cicloescolar/nuevo-cicloescolar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    protected router: Router
  ) { }

  add(): void {
    this.bsModalRef = this.modalService.show(NuevoCicloescolarComponent,
      { ignoreBackdropClick: true, keyboard: false, class: 'modal-lg' });
  }

  ngOnInit() {
  }

  logout() {
    console.log('logout');
    this.router.navigate(['/login']);
  }

  search(q: string) {
    this.router.navigate(['/busqueda', q]);
  }

}
