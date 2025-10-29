import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParqueaderoPage } from './parqueadero-page';

describe('ParqueaderoPage', () => {
  let component: ParqueaderoPage;
  let fixture: ComponentFixture<ParqueaderoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParqueaderoPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParqueaderoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
