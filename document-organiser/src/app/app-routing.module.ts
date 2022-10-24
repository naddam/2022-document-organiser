import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthUserGuard } from './auth/guards/auth-user.guard';
import { DocumentsComponent } from './documents/documents.component';
import { LoginComponent } from './login/login.component';
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
  // Fallback
  {
    path: '**',
    redirectTo: '/documents'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthUserGuard]
})
export class AppRoutingModule { }
