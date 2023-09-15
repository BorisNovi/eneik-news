import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { NewsComponent } from './pages/news/news.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';
import { Square1Component } from './components/news-squares/square1/square1.component';
import { Square05Component } from './components/news-squares/square05/square05.component';
import { Square025Component } from './components/news-squares/square025/square025.component';
import { NewsMainBlockComponent } from './pages/main/news-main-block/news-main-block.component';
import { StoriesMainBlockComponent } from './pages/main/stories-main-block/stories-main-block.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NewsComponent,
    NewsDetailComponent,
    Square1Component,
    Square05Component,
    Square025Component,
    NewsMainBlockComponent,
    StoriesMainBlockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
