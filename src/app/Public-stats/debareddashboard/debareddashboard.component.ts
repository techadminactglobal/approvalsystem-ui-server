import { Component, ViewChild } from '@angular/core';
import { API_PATH } from 'src/environments/api-constant';
import * as XLSX from 'xlsx';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { commonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-debareddashboard',
  templateUrl: './debareddashboard.component.html',
  styleUrls: ['./debareddashboard.component.scss']
})
export class DebareddashboardComponent {
  displayedColumns: string[] = ['userId', 'debardByDept', 'debardDocName', 'debardDate', 'debardTo', 'debardReason'];

  paginatedDataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  apiConstant = API_PATH;


  constructor(private service: commonService, private route: Router) {
  }
  ngOnInit(): void {
    this.getAllDebard();
    setTimeout(() => {
      console.log(this.debardList,"debard list");
    this.updateDataSource(this.debardList);
    }, 1000);
    
  }

  updateDataSource(data: any[]) {
    this.paginatedDataSource = new MatTableDataSource(data);
    this.paginatedDataSource.paginator = this.paginator;
  }

  onPaginateChange(event: PageEvent) {
    // Optional: Any additional logic on pagination change
    this.paginatedDataSource.paginator = this.paginator;
  }

  openPaymentPdf(docUniqueId: string): void {
    let request: any = {
      "docUUID": docUniqueId
     
    }
    this.service.getHierarchyService(this.apiConstant.viewUUID, request).subscribe((data: any) => {
      console.log(docUniqueId,"asgjho");
      console.log(data);
      const byteString = atob(data.docByteStream);
      const byteArray = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
  
  
      window.open(url, '_blank');
      
    });
  }

  /*   debardList: any; */
  debard:boolean = false;
  getAllDebard() {
    this.service.getDeptDashboard(
      this.apiConstant.GetAllDebardList, "").subscribe((res: any) => {
        console.log(res);
        if (res.httpStatus == "OK") {
          this.debard = true;
          this.debardList = res.data;
        } else {
          this.debard = false;
        }
      });

  }
  debardList: any[] = [];
  exportToExcel(): void {
    if (!this.debardList || this.debardList.length === 0) {
      console.error('No data to export');
      return;
    }
  
    console.log('Debard list data:', this.debardList);
  
    const data = this.debardList.map(item => {
      return {
        "User Id": item.userId,
        "Debarred By Dept": item.debardByDept,
        "Debarred Date": item.debardDate,
        "Debarred Upto": item.debardTo,
        "Debarred Reason": item.debardReason,
      };
    });
  
    console.log('Export data:', data);
  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Debard List');
  
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    console.log('Excel buffer:', excelBuffer);
  
    this.saveAsExcelFile(excelBuffer, 'DebardList');
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    console.log('Saving file...');
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const url: string = window.URL.createObjectURL(data);
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = url;
    a.download = fileName + '_export_' + new Date().toISOString() + '.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
    console.log('File saved.');
  }


  back(){
    this.route.navigate(['/login']);
  }
  
}

