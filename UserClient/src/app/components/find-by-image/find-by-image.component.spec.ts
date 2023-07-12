import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindByImageComponent } from './find-by-image.component';

describe('FindByImageComponent', () => {
  let component: FindByImageComponent;
  let fixture: ComponentFixture<FindByImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindByImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindByImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
