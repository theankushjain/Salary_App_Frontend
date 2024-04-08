import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit{
  addRoleForm: FormGroup;
  dataSource!: [];

  constructor(private fb: FormBuilder, private rolesService: RolesService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.addRoleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.addRoleForm.patchValue({
      ...this.data
    });
  }

  get f() { return this.addRoleForm.controls; }

  onSubmit() {

    if (this.addRoleForm.invalid) {
      return;
    }

    if (this.data) {
      this.rolesService.updateRole(this.data.id,this.addRoleForm.value).subscribe({
        next: (response: any) => {
          console.log(response)
          alert("Role Updated Successfully");
          this.resetForm();
          location.reload();
        },
        error: (error) => {
          console.error('Error during Role updation:', error);
          alert("Error during Role Updation.")
        }
      })
    } else {

      this.rolesService.addNewRole(this.addRoleForm.value).subscribe({
        next: (response: any) => {
          console.log("Role Added Successfully", response)
          alert("Role " + response.name + " Added Successfully");
          this.resetForm();
        },
        error: (error) => {
          console.error('Error during Adding Role:', error);
          alert("Error during Adding Role.")
        }
      })
    }
  }

  resetForm() {
    let control: AbstractControl;
    this.addRoleForm.markAsUntouched();
    this.addRoleForm.reset();
    Object.keys(this.addRoleForm.controls).forEach((name) => {
      control = this.addRoleForm.controls[name];
      control.setErrors(null);
    });
  }
}
