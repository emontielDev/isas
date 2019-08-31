import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { SidebarService } from 'src/app/services/services.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
    private router: Router,
    protected sidebarService: SidebarService,
  ) { }

  logout() {
    console.log('logout');
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.sidebarService.cargarMenu();
  }

}
