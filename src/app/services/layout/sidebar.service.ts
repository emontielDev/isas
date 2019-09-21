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
        titulo: 'Alumno',
        icono: 'mdi mdi-account-card-details',
        submenu: [
          { titulo: 'Mis calificaciones', url: '/mis-calificaciones' }
        ]
      },
      {
        titulo: 'Control Escolar',
        header: true
      },
      {
        titulo: 'Catalogos',
        icono: 'mdi mdi-layers',
        submenu: [
          { titulo: 'Alumnos', url: '/alumnos' },
          { titulo: 'Materias', url: '/materias' },
          { titulo: 'Niveles', url: '/niveles' },
          { titulo: 'Profesores', url: '/profesores' },
        ]
      },
      {
        titulo: 'Administrador',
        header: true
      },
      {
        titulo: 'Configuración',
        icono: 'mdi mdi-settings',
        submenu: [
          { titulo: 'Ciclo Escolar', url: '/ciclo-escolar' },
          // { titulo: 'Gráficas', url: '/graficas1' },
          // { titulo: 'Progress Bar', url: '/progress' },
          // { titulo: 'Promesas', url: '/promesas' },
          // { titulo: 'Rxjs', url: '/rxjs' },
        ]
      }
    ];
  }
}
