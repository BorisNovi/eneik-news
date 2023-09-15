import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesMainBlockComponent } from './stories-main-block.component';

describe('StoriesMainBlockComponent', () => {
  let component: StoriesMainBlockComponent;
  let fixture: ComponentFixture<StoriesMainBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoriesMainBlockComponent]
    });
    fixture = TestBed.createComponent(StoriesMainBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
