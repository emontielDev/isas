import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    {
        loadChildren: './authentication/authentication.module#AuthenticationModule',
        path: 'authentication'
    },
    {
        loadChildren: './pages/pages.module#PagesModule',
        path: ''
    }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
