import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {
  addLocationForm: FormGroup;
  dataSource!: [];
  parentLocations!:[];

  constructor(private fb: FormBuilder, private locationService: LocationService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.addLocationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      state: ['', [Validators.required, Validators.minLength(3)]],
      district: ['', [Validators.required, Validators.minLength(3)]],
      type:['',[Validators.required]],
      parentLocation: [''],
    });
  }

  ngOnInit(): void {
    this.addLocationForm.patchValue({
      ...this.data
    });
    this.getLocations();

   
    const locationData = this.data?.parent || [];

    
    const locationNames = locationData;


    this.addLocationForm.patchValue({
      ...this.data,
      parentLocation: locationData.name
    });
  }

  get f() { return this.addLocationForm.controls; }

  onSubmit() {
    if (this.addLocationForm.invalid) {
      console.log("Invalid Form Data");
      return;
    }
    console.log("sent data:",this.addLocationForm.value);

    if (this.data) {
      this.locationService.updateLocation(this.data.id,this.addLocationForm.value).subscribe({
        next: (response: any) => {
          alert("Location Updated Successfully");
          this.resetForm();
          location.reload();
        },
        error: (error) => {
          console.error('Error during Location updation:', error);
          alert("Error during Location Updation.")
        }
      })
    } else {

      this.locationService.addNewLocation(this.addLocationForm.value).subscribe({
        next: (response: any) => {
          console.log("Location Added Successfully", response)
          alert("Location Added Successfully");
          this.resetForm();
          location.reload();
        },
        error: (error) => {
          console.error('Error during Adding Location:', error);
          alert("Error during Adding Location.")
        }
      })
    }
  }

  resetForm() {
    let control: AbstractControl;
    this.addLocationForm.markAsUntouched();
    this.addLocationForm.reset();
    Object.keys(this.addLocationForm.controls).forEach((name) => {
      control = this.addLocationForm.controls[name];
      control.setErrors(null);
    });
  }
  getLocations() {
    this.locationService.getLocations().subscribe(
      (response: any) => {
        this.dataSource = response;
        this.parentLocations = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
