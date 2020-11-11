import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallecompletoComponent } from './detallecompleto.component';

describe('DetallecompletoComponent', () => {
  let component: DetallecompletoComponent;
  let fixture: ComponentFixture<DetallecompletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallecompletoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallecompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
