import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any = [];
  constructor() { }

  cargarMenu() {
    this.menu = [
      {
        titulo: 'Principal',
        icono: 'mdi mdi-gauge',
        submenu: [
          { titulo: 'Inicio', url: '/home' },
          // { titulo: 'Gráficas', url: '/graficas1' },
          // { titulo: 'Progress Bar', url: '/progress' },
          // { titulo: 'Promesas', url: '/promesas' },
          // { titulo: 'Rxjs', url: '/rxjs' },
        ]
      },
      {
        titulo: 'Mantenimientos',
        icono: 'mdi mdi-folder-lock-open',
        submenu: [
          { titulo: 'Usuarios', url: '/usuarios' },
          { titulo: 'Medicos', url: '/medicos' },
          { titulo: 'Hospitales', url: '/hospitales' },
        ]
      },
      {
        titulo: 'Materias',
        icono: 'mdi mdi-library-books',
        url: '/materias'
      }
    ];
  }
}
