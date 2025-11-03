import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionVehiculoPage } from './gestion-vehiculo-page';

describe('GestionVehiculoPage', () => {
  let component: GestionVehiculoPage;
  let fixture: ComponentFixture<GestionVehiculoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionVehiculoPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionVehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
