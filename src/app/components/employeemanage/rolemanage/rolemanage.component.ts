import { RolesService } from './../../../services/roles.service';

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddRoleComponent } from './add-role/add-role.component';
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'app-rolemanage',
  templateUrl: './rolemanage.component.html',
  styleUrls: ['./rolemanage.component.scss']
})
export class RolemanageComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'id',
    'name',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private rolesService: RolesService,
    private exportService: ExportService
    // private _coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.getRoles();
    
  }

  exportToExcel(): void {
    this.exportService.exportToExcel(this.dataSource.data, 'roles_data', 'Sheet1');
  }

  openAddEditRoleForm() {
    const dialogRef = this._dialog.open(AddRoleComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getRoles();
        }
      },
    });
  }

  openEditRoleForm(data:any){
    const dialogRef = this._dialog.open(AddRoleComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getRoles();
        }
      },
    });
  }

  deleteRole(id:number){
    this.rolesService.deleteRole(id).subscribe({
      next: (response: any) => {
        alert(JSON.stringify(response));
        location.reload();
      },
      error: (error) => {
        alert(JSON.stringify(error));
      }
    })
  }

  getRoles() {
    this.rolesService.getRoles().subscribe(
      (response: any) => {
        console.log("roles:",response)
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log(error);
      }
    );

  }

  ngAfterViewInit() {
  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
