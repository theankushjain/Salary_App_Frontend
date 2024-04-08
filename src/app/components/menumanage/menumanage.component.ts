import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExportService } from 'src/app/services/export.service';
import { MenuService } from 'src/app/services/menu.service';
import { AddMenuComponent } from './add-menu/add-menu.component';

@Component({
  selector: 'app-menumanage',
  templateUrl: './menumanage.component.html',
  styleUrls: ['./menumanage.component.scss']
})
export class MenumanageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'label',
    'parentMenu',
    'order',
    'routeLink',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private menuService: MenuService,
    private exportService: ExportService
    // private _coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.getMenus();
  }

  exportToExcel(): void {
    this.exportService.exportToExcel(this.dataSource.data, 'menus_data', 'Sheet1');
  }

  openAddEditMenuForm() {
    const dialogRef = this._dialog.open(AddMenuComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getMenus();
        }
      },
    });
  }

  openEditMenuForm(data:any){
    const dialogRef = this._dialog.open(AddMenuComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getMenus();
        }
      },
    });
  }

  deleteMenu(id:number){
    this.menuService.deleteMenu(id).subscribe({
      next: (response: any) => {
        alert("Menu "+response.label+" deleted successfully.")
        location.reload();
      },
      error: (error) => {
        alert(JSON.stringify(error));
      }
    })
  }

  getMenus() {
    this.menuService.getMenus().subscribe(
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
