import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleusersalaryComponent } from './singleusersalary.component';

describe('SingleusersalaryComponent', () => {
  let component: SingleusersalaryComponent;
  let fixture: ComponentFixture<SingleusersalaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleusersalaryComponent]
    });
    fixture = TestBed.createComponent(SingleusersalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
