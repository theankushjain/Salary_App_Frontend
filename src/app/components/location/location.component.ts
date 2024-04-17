import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExportService } from 'src/app/services/export.service';
import { LocationService } from 'src/app/services/location.service';
import { MenuService } from 'src/app/services/menu.service';
import { AddLocationComponent } from './add-location/add-location.component';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit,AfterViewInit{
  displayedColumns: string[] = [
    'id',
    'name',
    'state',
    'district',
    'type',
    'parentLocation',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private locationService: LocationService,
    private exportService: ExportService
    // private _coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.getLocations();
  }

  exportToExcel(): void {
    console.log(this.dataSource.data)
    const exportData = this.dataSource.data.map((location) => ({
      ID: location.id,
      NAME: location.name,
      STATE: location.state,
      DISTRICT: location.district,
      TYPE: location.type,
      PARENT_LOCATION: location.parent?.name || ''
    }));
    this.exportService.exportToExcel(exportData, 'Locations_Data', 'Sheet1');
  }

  openAddEditMenuForm() {
    const dialogRef = this._dialog.open(AddLocationComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getLocations();
        }
      },
    });
  }

  openEditLocationForm(data:any){
    const dialogRef = this._dialog.open(AddLocationComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getLocations();
        }
      },
    });
  }

  deleteLocation(id:number){
    this.locationService.deleteLocation(id).subscribe({
      next: (response: any) => {
        alert("Location "+response.name+" deleted successfully.")
        location.reload();
      },
      error: (error) => {
        alert(JSON.stringify(error));
      }
    })
  }

  getLocations() {
    this.locationService.getLocations().subscribe(
      (response: any) => {
        console.log(response);
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator,
        this.dataSource.sort = this.sort;
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
