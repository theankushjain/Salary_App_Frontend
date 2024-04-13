import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarymanageComponent } from './salarymanage.component';

describe('SalarymanageComponent', () => {
  let component: SalarymanageComponent;
  let fixture: ComponentFixture<SalarymanageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalarymanageComponent]
    });
    fixture = TestBed.createComponent(SalarymanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
