import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss']
})
export class AddMenuComponent implements OnInit {
  addMenuForm: FormGroup;
  dataSource!: [];
  parentMenus!:[];

  constructor(private fb: FormBuilder, private menuService: MenuService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.addMenuForm = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(3)]],
      icon: ['', [Validators.required, Validators.minLength(3)]],
      parentMenu: [null],
      ordering: ['', [Validators.required, Validators.minLength(3)]],
      routeLink: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.addMenuForm.patchValue({
      ...this.data
    });
    this.getMenus();

    const menusData = this.data?.menus || [];

    // Map the roles array to an array of role names (strings)
    const menuNames = menusData.map((menu: { label: any; }) => menu.label)

    this.addMenuForm.patchValue({
      ...this.data,
      menus: menuNames
    });
  }

  get f() { return this.addMenuForm.controls; }

  onSubmit() {
    if (this.addMenuForm.invalid) {
      console.log("Invalid Form Data");
      return;
    }

    if (this.data) {
      this.menuService.updateMenu(this.data.id,this.addMenuForm.value).subscribe({
        next: (response: any) => {
          alert("Menu Updated Successfully");
          this.resetForm();
          location.reload();
        },
        error: (error) => {
          console.error('Error during Menu updation:', error);
          alert("Error during Menu Updation.")
        }
      })
    } else {

      this.menuService.addNewMenu(this.addMenuForm.value).subscribe({
        next: (response: any) => {
          console.log("Menu Added Successfully", response)
          alert("Menu Added Successfully");
          this.resetForm();
          location.reload();
        },
        error: (error) => {
          console.error('Error during Adding Menu:', error);
          alert("Error during Adding Menu.")
        }
      })
    }
  }

  resetForm() {
    let control: AbstractControl;
    this.addMenuForm.markAsUntouched();
    this.addMenuForm.reset();
    Object.keys(this.addMenuForm.controls).forEach((name) => {
      control = this.addMenuForm.controls[name];
      control.setErrors(null);
    });
  }
  getMenus() {
    this.menuService.getMenus().subscribe(
      (response: any) => {
        this.dataSource = response;
        this.parentMenus = response.filter((menu: { parentMenu: null; })=>menu.parentMenu===null)
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
