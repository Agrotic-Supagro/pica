import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicaChoixparametreComponent } from './pica-choixparametre.component';

describe('PicaChoixparametreComponent', () => {
  let component: PicaChoixparametreComponent;
  let fixture: ComponentFixture<PicaChoixparametreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicaChoixparametreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicaChoixparametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
