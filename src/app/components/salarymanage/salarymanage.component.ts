import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExportService } from 'src/app/services/export.service';
import { UsersService } from 'src/app/services/users.service';
import { RegisterComponent } from '../register/register.component';
import {} from '@angular/material';
import { AddSalaryComponent } from './add-salary/add-salary.component';
import { SingleusersalaryComponent } from './singleusersalary/singleusersalary.component';
@Component({
  selector: 'app-salarymanage',
  templateUrl: './salarymanage.component.html',
  styleUrls: ['./salarymanage.component.scss']
})
export class SalarymanageComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'role',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

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
    this.exportService.exportToExcel(this.dataSource.data, 'Users_Data', 'Sheet1');
  }

  addNewSalary(data:any ) {
    const dialogRef = this._dialog.open(AddSalaryComponent,{
      data
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUsers();
        }
      },
    });
  }

  allSalaries(data:any) {
    const dialogRef = this._dialog.open(SingleusersalaryComponent,{
      data
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUsers();
        }
      },
    });
  }


  getUsers() {
    this.usersService.getUser().subscribe(
      (response: any) => {
        console.log("user's data:",response)
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
  }
}
