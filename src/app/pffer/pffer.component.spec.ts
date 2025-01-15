import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfferComponent } from './pffer.component';

describe('PfferComponent', () => {
  let component: PfferComponent;
  let fixture: ComponentFixture<PfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PfferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
