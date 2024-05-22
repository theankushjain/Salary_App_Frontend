import { Component, Inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalaryService } from 'src/app/services/salary.service';

interface AllowanceData {
  nameOfAllowance: string;
  amountOfAllowance: number;
}

interface DeductionData {
  nameOfDeduction: string;
  amountOfDeduction: number;
}

@Component({
  selector: 'app-add-salary',
  templateUrl: './add-salary.component.html',
  styleUrls: ['./add-salary.component.scss']
})

export class AddSalaryComponent {
  addSalaryForm: FormGroup;
  dataSource!: [];

  constructor(private fb: FormBuilder, private salaryService: SalaryService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.addSalaryForm = this.fb.group({
      userId: [data.name, Validators.required],
      payLevel: ['', Validators.required],
      year: ['', Validators.required],
      month: ['', Validators.required],
      daysPresent: ['', Validators.required],
      basicPay: ['', Validators.required],
      allowances: fb.array([this.createAllowanceFormGroup()]),
      deductions: fb.array([this.createDeductionFormGroup()])
    });
    this.fetchPreviousMonthSalary(data.id);
  }

  createAllowanceFormGroup(allowanceData?: AllowanceData): FormGroup {
    return this.fb.group({
      nameOfAllowance: [allowanceData ? allowanceData.nameOfAllowance : '', Validators.required],
      amountOfAllowance: [allowanceData ? allowanceData.amountOfAllowance : '', Validators.required]
    });
  }
  
  createDeductionFormGroup(deductionData?: DeductionData): FormGroup {
    return this.fb.group({
      nameOfDeduction: [deductionData ? deductionData.nameOfDeduction : '', Validators.required],
      amountOfDeduction: [deductionData ? deductionData.amountOfDeduction : '', Validators.required]
    });
  }

  get allowances(): FormArray {
    return this.addSalaryForm.get('allowances') as FormArray;
  }

  get deductions(): FormArray {
    return this.addSalaryForm.get('deductions') as FormArray;
  }

  addAllowance(): void {
    this.allowances.push(this.createAllowanceFormGroup());
  }

  removeAllowance(index: number): void {
    this.allowances.removeAt(index);
  }

  addDeduction(): void {
    this.deductions.push(this.createDeductionFormGroup());
  }

  removeDeduction(index: number): void {
    this.deductions.removeAt(index);
  }

  ngOnInit(): void {
    this.addSalaryForm.patchValue({
      year: new Date().getFullYear().toString(),
      month: new Date().getMonth().toString(),
    });
    console.log("data received",this.data)

    // this.addSalaryForm.patchValue({
    //   ...this.data,
    //   menus: menuNames
    // });
  }

  fetchPreviousMonthSalary(userId: any) {
    // Implement the logic to fetch previous month's salary for the user
    // You can use the SalaryService to make the API call
    // Example:
    this.salaryService.getIndividualSalaries(userId).subscribe(
      (response: any) => {
        // Assuming the response contains an array of salary details
        const latestSalaryDetails = response[0];
  
        // Update the form fields with the previous salary data if needed
        this.addSalaryForm.patchValue({
          payLevel: latestSalaryDetails.payLevel,
          year: latestSalaryDetails.year,
          month: latestSalaryDetails.month,
          daysPresent: latestSalaryDetails.noOfDaysPresent,
          basicPay: latestSalaryDetails.basicPay,
          // Update other form fields as needed
        });
  
        // Update the allowances form array
        this.allowances.clear();
        latestSalaryDetails.otherAllowances.forEach((allowance: AllowanceData) => {
          this.allowances.push(this.createAllowanceFormGroup(allowance));
        });
  
        // Update the deductions form array
        this.deductions.clear();
        latestSalaryDetails.otherDeductions.forEach((deduction: DeductionData) => {
          this.deductions.push(this.createDeductionFormGroup(deduction));
        });
      },
      (error: any) => {
        console.error('Error fetching previous month salary:', error);
      }
    );
  }

  get f() { return this.addSalaryForm.controls; }

  onSubmit() {
    if (this.addSalaryForm.invalid) {
      console.log("Invalid Form Data");
      return;
    }
    this.addSalaryForm.patchValue({
      userId:this.data.id
    });
    console.log("sent data:", this.addSalaryForm.value);

    // if (this.data) {
    //   this.salaryService.updateMenu(this.data.id,this.addSalaryForm.value).subscribe({
    //     next: (response: any) => {
    //       alert("Menu Updated Successfully");
    //       this.resetForm();
    //       location.reload();
    //     },
    //     error: (error) => {
    //       console.error('Error during Menu updation:', error);
    //       alert("Error during Menu Updation.")
    //     }
    //   })
    // } else {

      this.salaryService.addNewSalary(this.addSalaryForm.value).subscribe({
        next: (response: any) => {
          console.log("Salary Added Successfully", response)
          alert("Salary Added Successfully");
          this.resetForm();
          location.reload();
        },
        error: (error) => {
          console.error('Error during Adding Salary:', error);
          alert("Error during Adding Salary.")
        }
      })
    }


  resetForm() {
    let control: AbstractControl;
    this.addSalaryForm.markAsUntouched();
    this.addSalaryForm.reset();
    Object.keys(this.addSalaryForm.controls).forEach((name) => {
      control = this.addSalaryForm.controls[name];
      control.setErrors(null);
    });
  }
  // getMenus() {
  //   this.salaryService.getMenus().subscribe(
  //     (response: any) => {
  //       this.dataSource = response;
  //       this.parentMenus = response.filter((menu: { parentMenu: null; })=>menu.parentMenu===null)
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }
}
