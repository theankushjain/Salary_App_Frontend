import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExportService } from 'src/app/services/export.service';
import { SalaryService } from 'src/app/services/salary.service';
import { GeneratepayslipComponent } from '../generatepayslip/generatepayslip.component';


@Component({
  selector: 'app-singleusersalary',
  templateUrl: './singleusersalary.component.html',
  styleUrls: ['./singleusersalary.component.scss']
})
export class SingleusersalaryComponent {
  user: any='';
  displayedColumns: string[] = [
    'id',
    'month',
    'year',
    'grossSalary',
    'netSalary',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private salaryService: SalaryService,
    private exportService: ExportService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    
    if(data && data.id){
      this.getIndividualSalaries(data.id); 
      this.user=data;
    }else{
      this.getCurrentUserSalaries();
    }
    
  
  }

  ngOnInit(): void {
    
  }

  exportToExcel(): void {
    this.exportService.exportToExcel(this.dataSource.data, 'Users_Data', 'Sheet1');
  }

  getIndividualSalaries(userId:number){
    this.salaryService.getIndividualSalaries(userId).subscribe(
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

  getCurrentUserSalaries(){
    this.salaryService.getCurrentUserSalaries().subscribe(
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

  generateSlip(data:any, user:any){
    console.log("generate slip called")
    const dialogRef = this._dialog.open(GeneratepayslipComponent,{
      data: {
        data,user
      },
      width: '800px'
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getIndividualSalaries(data.id);
        }
      },
    });
  }

  // addNewSalary(data:any ) {
  //   const dialogRef = this._dialog.open(AddSalaryComponent,{
  //     width: '600px',
  //     data
  //   });
  //   dialogRef.afterClosed().subscribe({
  //     next: (val) => {
  //       if (val) {
  //         this.getUsers();
  //       }
  //     },
  //   });
  // }

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
