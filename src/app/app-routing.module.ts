import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { NewsComponent } from './pages/news/news.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'news', component: NewsComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' }, // По умолчанию перенаправляем на 'main'
  // Добавляем динамический маршрут для новостей
  { path: 'news/:id', component: NewsDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


