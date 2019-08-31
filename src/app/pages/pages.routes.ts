import { Route } from '@angular/router';


import { AlumnoComponent } from './alumno/alumno.component';
import { HomeComponent } from './home/home.component';
import { MateriasComponent } from './materias/materias.component';
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
                path: 'alumno',
                component: AlumnoComponent,
                data: {
                    title: 'Ficha de inscripción nuevo aspirante'
                }
            },
            {
                path: 'profesores',
                component: ProfesoresComponent,
                data: {
                    title: 'Profesores'
                }
            }
        ]
    },

    // Not found
    { path: '**', redirectTo: 'home' }

];
