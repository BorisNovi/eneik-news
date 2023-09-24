import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { NewsComponent } from './pages/news/news.component';
import { StoriesComponent } from './pages/stories/stories.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';
import { StoriesDetailComponent } from './pages/stories-detail/stories-detail.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'news', component: NewsComponent },
  { path: 'stories', component: StoriesComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' }, // По умолчанию перенаправляем на 'main'
  // Добавляем динамический маршрут для новостей
  { path: 'news/:id', component: NewsDetailComponent },
  { path: 'stories/:id', component: StoriesDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


