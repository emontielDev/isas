import { ArchwizardModule } from 'angular-archwizard';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { WebcamModule } from 'ngx-webcam';



// Bootstrap
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

// Components
import { AlumnoComponent } from './alumno/alumno.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { AvatarComponent } from '../components/avatar/avatar.component';
import { HomeComponent } from './home/home.component';
import { MateriaComponent } from '../components/materia/materia.component'; // Entry components
import { MateriasComponent } from './materias/materias.component';
import { NuevoCicloescolarComponent } from '../components/nuevo-cicloescolar/nuevo-cicloescolar.component'; // Entry components
import { NuevoGrupoComponent } from '../components/nuevo-grupo/nuevo-grupo.component'; // Entry components
import { PagesComponent } from './pages.component';
import { ProfesorComponent } from '../components/profesor/profesor.component'; // Entry components
import { ProfesoresComponent } from './profesores/profesores.component';

// Modules
import { LayoutModule } from '../layout/layout.module';
import { PipesModule } from '../pipes/pipes.module';
import { RouterModule } from '@angular/router';

// Routes
import { routes } from './pages.routes';


@NgModule({
  declarations: [
    AlumnoComponent,
    AlumnosComponent,
    AvatarComponent,
    HomeComponent,
    MateriaComponent,
    MateriasComponent,
    NuevoCicloescolarComponent,
    NuevoGrupoComponent,
    PagesComponent,
    ProfesorComponent,
    ProfesoresComponent
  ],
  entryComponents: [
    MateriaComponent,
    NuevoCicloescolarComponent,
    NuevoGrupoComponent,
    ProfesorComponent
  ],
  imports: [
    AccordionModule.forRoot(),
    ArchwizardModule,
    BsDatepickerModule.forRoot(),
    CommonModule,
    DataTablesModule,
    LayoutModule,
    ModalModule.forRoot(),
    PipesModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TooltipModule.forRoot(),
    WebcamModule
  ]
})
export class PagesModule { }
