import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TVModalComponent } from './tvmodal.component';

describe('TVModalComponent', () => {
  let component: TVModalComponent;
  let fixture: ComponentFixture<TVModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TVModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TVModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
