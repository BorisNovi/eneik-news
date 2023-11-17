import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main/main.component';
import { NewsComponent } from './news/news/news.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { Square1Component } from './shared/news-squares/square1/square1.component';
import { Square05Component } from './shared/news-squares/square05/square05.component';
import { Square025Component } from './shared/news-squares/square025/square025.component';
import { NewsMainBlockComponent } from './main/main/news-main-block/news-main-block.component';
import { StoriesMainBlockComponent } from './main/main/stories-main-block/stories-main-block.component';
import { StoriesDetailComponent } from './stories/stories-detail/stories-detail.component';
import { StoriesComponent } from './stories/stories/stories.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ThingComponent } from './shared/things/thing.component';
import { ArtComponent } from './art/pages/art/art.component';
import { TellComponent } from './tell/tell/tell.component';
import { ArtMainComponentComponent } from './main/main/art-main-component/art-main-component.component';
import { ArtsDetailComponent } from './art/pages/arts-detail/arts-detail.component';
import { SliderComponent } from './shared/slider/slider.component';
import { AdminModule } from './admin/admin.module';

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
    StoriesDetailComponent,
    StoriesComponent,
    NotFoundComponent,
    ThingComponent,
    ArtComponent,
    TellComponent,
    ArtMainComponentComponent,
    ArtsDetailComponent,
    SliderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AdminModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
