import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExportService } from 'src/app/services/export.service';
import {MatToolbarModule} from '@angular/material/toolbar';
// import { CoreService } from './core/core.service';


@Component({
  selector: 'app-employeemanage',
  templateUrl: './employeemanage.component.html',
  styleUrls: ['./employeemanage.component.scss']
})
export class EmployeemanageComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'location',
    'role',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;
  exportData: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private usersService: UsersService,
    private exportService: ExportService
    // private _coreService: CoreService
  ) { this.getUsers(); }

  ngOnInit(): void {
    
  }

  exportToExcel(): void {
    const exportData = this.dataSource.data.map((user) => ({
      ID: user.id,
      NAME: user.name,
      EMAIL: user.email,
      CURRENT_POSTING: user.currentPostingLocation?.name || ''
    }));
    this.exportService.exportToExcel(exportData, 'Users_Data', 'Sheet1');
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(RegisterComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUsers();
        }
      },
    });
  }

  openEditEmpForm(data: any) {
    const dialogRef = this._dialog.open(RegisterComponent, {
      data,
    })
  }

  deleteEmployee(id: number) {
    this.usersService.deleteUser(id).subscribe({
      next: (response: any) => {
        alert("User "+response.name+" deleted successfully.");
        location.reload();
      },
      error: (error) => {
        console.error('Error during user deletion:', error);
        alert("Error during user Deletion.")
      }
    })
  }

  getUsers() {
    this.usersService.getUser().subscribe(
      (response: any) => {
        console.log(response);
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = this.customFilterPredicate;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngAfterViewInit() {
    
  }

  customFilterPredicate(data: any, filter: string): boolean {
    const searchString = filter.toLowerCase();
    return (
      data.name.toLowerCase().includes(searchString) ||
      data.email.toLowerCase().includes(searchString) ||
      JSON.stringify(data.roles.map((role: { name: string }) => role.name.toLowerCase())).includes(searchString)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    // // Custom filter for the 'role' column that maps roles and converts it to string
    // this.dataSource.filterPredicate = (data: any, filter: string) => {
    //   const roles = JSON.stringify(data.roles.map((role: { name: string; }) => role.name.toLowerCase()));
    //   return roles.includes(filter);
    // };
  }
}