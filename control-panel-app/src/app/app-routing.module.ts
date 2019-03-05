import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./common/login-module/login.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    loadChildren: './admin-module/admin.module#AdminModule'
  }
];


export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
