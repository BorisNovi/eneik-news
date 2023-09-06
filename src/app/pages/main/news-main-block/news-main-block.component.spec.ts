import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsMainBlockComponent } from './news-main-block.component';

describe('NewsMainBlockComponent', () => {
  let component: NewsMainBlockComponent;
  let fixture: ComponentFixture<NewsMainBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsMainBlockComponent]
    });
    fixture = TestBed.createComponent(NewsMainBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
