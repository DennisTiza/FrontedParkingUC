import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitantePage } from './visitante-page';

describe('VisitantePage', () => {
  let component: VisitantePage;
  let fixture: ComponentFixture<VisitantePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitantePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
