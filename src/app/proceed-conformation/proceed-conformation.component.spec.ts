import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedConformationComponent } from './proceed-conformation.component';

describe('ProceedConformationComponent', () => {
  let component: ProceedConformationComponent;
  let fixture: ComponentFixture<ProceedConformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProceedConformationComponent]
    });
    fixture = TestBed.createComponent(ProceedConformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
