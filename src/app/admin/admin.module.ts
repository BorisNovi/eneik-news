import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthPageComponent } from './pages/admin-auth-page/admin-auth-page.component';
import { AdminMainPageComponent } from './pages/admin-main-page/admin-main-page.component';
import { adminAuthGuard } from './guards/admin-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    component: AdminAuthPageComponent,
  },
  {
    path: 'secret',
    component: AdminMainPageComponent,
    canActivate: [adminAuthGuard],
  },
];

@NgModule({
  declarations: [AdminAuthPageComponent, AdminMainPageComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
