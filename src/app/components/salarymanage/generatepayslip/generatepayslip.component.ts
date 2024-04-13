import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SalaryService } from 'src/app/services/salary.service';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-generatepayslip',
  templateUrl: './generatepayslip.component.html',
  styleUrls: ['./generatepayslip.component.scss']
})
export class GeneratepayslipComponent {

  @ViewChild('payslipContainer', { static: true }) payslipContainer: ElementRef<HTMLElement>  | null = null;

  user: any;
  salary:any;

  pageWidth: number = 0;
  pageHeight: number = 0;

  dataSource!: MatTableDataSource<any>;

  constructor(
    private _dialog: MatDialog,
    private salaryService: SalaryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {this.salary=data.data;this.user=data.user}

  downloadPdf() {
    if (this.payslipContainer?.nativeElement) {
      const doc = new jsPDF();

      // Get the dimensions of the payslipContainer
      const { width, height } = this.payslipContainer.nativeElement.getBoundingClientRect();
  
      // Calculate the scaling factor to fit the content on a single page
      const scaleFactor = Math.min(
        doc.internal.pageSize.getWidth() / width,
        doc.internal.pageSize.getHeight() / height
      );
  
      // Add the HTML content to the PDF
      doc.html(this.payslipContainer.nativeElement, {
        callback: (doc) => {
          doc.save('payslip.pdf');
        },
        x: 10,
        y: 10,
        width: 190,
        windowWidth: 675
      });
    } else {
      console.error('payslipContainer is null or undefined.');
    }
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    if (this.payslipContainer?.nativeElement) {
      const { width, height } = this.payslipContainer.nativeElement.getBoundingClientRect();
      this.pageWidth = width;
      this.pageHeight = height;
    }
  }
 
}
