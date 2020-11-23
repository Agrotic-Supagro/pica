import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicaaccueilComponent } from './picaaccueil.component';

describe('PicaaccueilComponent', () => {
  let component: PicaaccueilComponent;
  let fixture: ComponentFixture<PicaaccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicaaccueilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicaaccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
