import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratepayslipComponent } from './generatepayslip.component';

describe('GeneratepayslipComponent', () => {
  let component: GeneratepayslipComponent;
  let fixture: ComponentFixture<GeneratepayslipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneratepayslipComponent]
    });
    fixture = TestBed.createComponent(GeneratepayslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
