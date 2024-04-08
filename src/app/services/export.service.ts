import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

   exportToExcel(data: any[], fileName: string, sheetName: string): void {
    // const transformedData = this.transformDataForExport(data);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  // private transformDataForExport(data: any[]): any[] {
  //   // Customize this method to handle many-to-many relationships
  //   return data.map(item => ({
  //     id: item.id,
  //     name: item.name,
  //     email: item.email,
  //     // ... other properties
  //     roles: item.roles.map((role: { name: any; }) => role.name).join(', ') // Example: Join roles into a string
  //   }));
  // }
}
