import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicaresultatjoueurComponent } from './picaresultatjoueur.component';

describe('PicaresultatjoueurComponent', () => {
  let component: PicaresultatjoueurComponent;
  let fixture: ComponentFixture<PicaresultatjoueurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicaresultatjoueurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicaresultatjoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
