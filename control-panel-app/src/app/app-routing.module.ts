import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './common/auth-module/auth.component';
import { AuthGuard } from './common/auth-module/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-module/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  }
];


export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
