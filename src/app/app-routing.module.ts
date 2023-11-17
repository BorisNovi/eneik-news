import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main/main.component';
import { NewsComponent } from './news/news/news.component';
import { StoriesComponent } from './stories/stories/stories.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { StoriesDetailComponent } from './stories/stories-detail/stories-detail.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ArtComponent } from './art/pages/art/art.component';
import { TellComponent } from './tell/tell/tell.component';
import { ArtsDetailComponent } from './art/pages/arts-detail/arts-detail.component';
import { AdminMainPageComponent } from './admin/pages/admin-main-page/admin-main-page.component';
import { AdminAuthPageComponent } from './admin/pages/admin-auth-page/admin-auth-page.component';
import { adminAuthGuard } from './admin/guards/admin-auth.guard';

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
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
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
