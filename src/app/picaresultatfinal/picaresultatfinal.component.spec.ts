import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicaresultatfinalComponent } from './picaresultatfinal.component';

describe('PicaresultatfinalComponent', () => {
  let component: PicaresultatfinalComponent;
  let fixture: ComponentFixture<PicaresultatfinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicaresultatfinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicaresultatfinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
