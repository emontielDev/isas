import { Route } from '@angular/router';


import { AlumnoComponent } from './alumno/alumno.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { MateriasComponent } from './materias/materias.component';
import { NivelesComponent } from './niveles/niveles.component';
import { NivelGradosComponent } from './niveles/nivel-grados/nivel-grados.component';
import { HomeComponent } from './home/home.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { PagesComponent } from './pages.component';

export const routes: Route[] = [

    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'home'
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'materias',
                component: MateriasComponent,
                data: {
                    title: 'Catalogo de Materias'
                }
            },
            {
                path: 'alumnos',
                component: AlumnosComponent,
                data: {
                    title: 'Listado de Alumnos'
                }
            },
            {
                path: 'alumnos/ficha-inscripcion',
                component: AlumnoComponent,
                data: {
                    title: 'Ficha de inscripción nuevo aspirante'
                }
            },
            {
                path: 'profesores',
                component: ProfesoresComponent,
                data: {
                    title: 'Listado de Profesores'
                }
            },
            {
                path: 'niveles',
                component: NivelesComponent,
                data: {
                    title: 'Listado de Niveles'
                }
            },
            {
                path: 'niveles/:id',
                component: NivelGradosComponent,
                data: {
                    title: 'Grados del Nivel'
                }
            }
        ]
    },

    // Not found
    { path: '**', redirectTo: 'home' }

];
