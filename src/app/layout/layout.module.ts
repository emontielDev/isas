import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HeaderComponent } from './header/header.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SidebarComponent } from './sidebar/sidebar.component';

// Services
import { SidebarService } from '../services/services.index';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    BreadcrumbsComponent,
    ForbiddenComponent,
    HeaderComponent,
    NotfoundComponent,
    SidebarComponent
  ],
  exports: [
    BreadcrumbsComponent,
    ForbiddenComponent,
    HeaderComponent,
    NotfoundComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    SidebarService
  ]
})
export class LayoutModule { }
