import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthSuperadminGuard } from './auth/guards/auth-superadmin.guard';
import { AuthUserGuard } from './auth/guards/auth-user.guard';
import { DocumentsComponent } from './documents/documents.component';
import { LoginComponent } from './login/login.component';
import { TypesComponent } from './types/types.component';
import { ProfileComponent } from './users/profile/profile.component';

const routes: Routes = [
  { 
    path: 'login',
    component: LoginComponent 
  },
  {
    path: 'profile',
    canActivate: [AuthUserGuard],
    component: ProfileComponent
  },
  {
    path: 'documents',
    canActivate: [AuthUserGuard],
    component: DocumentsComponent
  },
  {
    path: 'types',
    canActivate: [AuthSuperadminGuard],
    component: TypesComponent
  },
  // Fallback
  {
    path: '**',
    redirectTo: '/documents'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthUserGuard, AuthSuperadminGuard]
})
export class AppRoutingModule { }
