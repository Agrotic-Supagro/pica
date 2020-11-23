import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicaechantillonnerComponent } from './picaechantillonner.component';

describe('PicaechantillonnerComponent', () => {
  let component: PicaechantillonnerComponent;
  let fixture: ComponentFixture<PicaechantillonnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicaechantillonnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicaechantillonnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
