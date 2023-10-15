import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { NewsComponent } from './pages/news/news.component';
import { StoriesComponent } from './pages/stories/stories.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';
import { StoriesDetailComponent } from './pages/stories-detail/stories-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ArtComponent } from './pages/art/art.component';
import { TellComponent } from './pages/tell/tell.component';
import { ArtsDetailComponent } from './pages/arts-detail/arts-detail.component';
import { AdminMainPageComponent } from './admin/admin-main-page/admin-main-page.component';
import { AdminAuthPageComponent } from './admin/admin-auth-page/admin-auth-page.component';
import { adminAuthGuard } from './guards/admin-auth.guard';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'news', component: NewsComponent },
  { path: 'stories', component: StoriesComponent },
  { path: 'arts', component: ArtComponent },
  { path: 'tell', component: TellComponent },
  {
    path: 'admin',
    component: AdminMainPageComponent,
    canActivate: [adminAuthGuard],
  },
  { path: 'auth', component: AdminAuthPageComponent },
  { path: 'news/:id', component: NewsDetailComponent },
  { path: 'stories/:id', component: StoriesDetailComponent },
  { path: 'arts/:id', component: ArtsDetailComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
