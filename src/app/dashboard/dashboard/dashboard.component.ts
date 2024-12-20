// import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { Component, OnInit, ViewChild } from '@angular/core';
import { commonService } from 'src/app/services/common.service';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { API_PATH } from 'src/environments/api-constant';
import * as XLSX from 'xlsx';
import { SendData } from 'src/app/SendData';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { COMMONCONSTANTS } from 'src/app/CONSTANTS/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  page = 1;
  pageSize = 0;
  dashboard_array: any = []
  full_dashboard_array: any = []
  collectionSize = this.dashboard_array.length;
  loading = -1;

  TOTAL_REQUESTS = 0;
  PENDING_REQUESTS = 0;
  FINISHED_REQUESTS = 0;

  apiConstant = API_PATH;
  encodeValues: any = new HttpUrlEncodingCodec
  constructor(private service: commonService, private dialogRef: MatDialog, private senddata: SendData, private router: Router) {
  }

  activeUser: any;
  reports = [];
  hierarchyId:any;
  userNames:any;
  architectViews:any;
  
  ngOnInit() {
    this.hierarchyId = localStorage.getItem('hierarchyId');
    this.userNames = localStorage.getItem('hierarchyUserName');
    this.architectViews = localStorage.getItem('architectView');
    this.saralTableData();
    this.refreshCountries();
  }

  saralTableData() {
    let request = this.userNames;

    this.service.getDeptDashboard(this.apiConstant.DASHBOARD, request).subscribe((res: any) => {
      console.log("**************", res);
      this.reports = res;
      this.updateVariables(res)
      this.dataSource = new MatTableDataSource(res);
      this.pageSize = this.totalArray.length;
      this.full_dashboard_array = this.totalArray

      this.refreshCountries()
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.loading = this.reports.length;
      console.log("length : " + this.loading);
      this.collectionSize = this.dashboard_array.length;
    })
  }
  sortChange(event: any) {
    console.log(event);
    this.dataSource.data = this.dataSource.data.reverse()
  }

  pendingSize = 0;
  approvedSize = 0;
  rejectedSize = 0;
  totalSize: number = 0;
  pendingArray: any[] = [];
  approveArray: any[] = [];
  rejectArray: any[] = [];
  totalArray: any[] = [];

  reject: boolean = false;

  updateVariables(data: any) {

    let pendingStatus = [COMMONCONSTANTS.Status_OwnerAssigned, COMMONCONSTANTS.Status_AcceptByArchitect, COMMONCONSTANTS.Status_FileProcess, COMMONCONSTANTS.Status_FileRe_Upoload, COMMONCONSTANTS.Status_Documents_Uploaded, COMMONCONSTANTS.Status_InitialDepositedAssigned1hierarchy,

      COMMONCONSTANTS.Status_Approval_Hierarchy2nd,
  
      COMMONCONSTANTS.Status_Approval_Hierarchy3rd,
  COMMONCONSTANTS.Status_Refer_Back_to_Architect,
      COMMONCONSTANTS.RegNew_ROLE_ID_AA,
  
      COMMONCONSTANTS.Status_Rejection_Hierarchy2nd,
  
      COMMONCONSTANTS.Status_Rejection_Hierarchy3rd,
  
      COMMONCONSTANTS.Status_Rejection_Hierarchy4th, COMMONCONSTANTS.Status_Final_Form_Submit,
  
      COMMONCONSTANTS.Status_Rule_Violation_Error, COMMONCONSTANTS.Status_State_Laws_Error, COMMONCONSTANTS.Status_PendingPayment,
  
      COMMONCONSTANTS.Status_PaymentCompleted, COMMONCONSTANTS.Status_NocFilled, COMMONCONSTANTS.Status_InitialDepositedAssignedNOCDept,
  
      COMMONCONSTANTS.Status_DSPending,COMMONCONSTANTS.Status_Form_Submitted_GIS_Pending,];
  
      let approvedStatus = [COMMONCONSTANTS.Status_FileProcessed, COMMONCONSTANTS.Status_DSAppliedRequestApproved, 
  
        COMMONCONSTANTS.Status_Request_Released, 'Occupancy Ds Applied - Occupancy Approved','Occupancy Released'
  
      ,'Plinth Ds Applied - Plinth Approved','Plinth Released'];
  
      let rejectStatus = ['Rejected','Plinth Rejected','Occupancy Rejected','Rejected by Architect'];

    // Iterate through the data
    data.forEach((item: any) => {
      this.totalArray.push(item);
      if (pendingStatus.includes(item.status)) {
        this.pendingSize++;
        this.pendingArray.push(item);
      } else if (approvedStatus.includes(item.status)) {
        this.approvedSize++;
        this.approveArray.push(item);
      } else if (rejectStatus.includes(item.status)) {
        this.rejectedSize++;
        this.rejectArray.push(item);
      // }else {
      //   this.approvedSize++;
      //   this.approveArray.push(item);
      }
    });

    this.senddata.pendingSize = this.pendingSize;
    this.senddata.approveSize = this.approvedSize;
    this.senddata.rejectSize = this.rejectedSize;
    this.senddata.totalSize = this.pendingSize + this.approvedSize + this.rejectedSize;
    this.totalSize = this.totalArray.length;
  }

  totalPending() {
    this.reject = false;
    console.log(this.pendingArray);
    this.full_dashboard_array = this.pendingArray;
    this.refreshCountries();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loading = this.reports.length;
    console.log("length : " + this.loading);
    this.collectionSize = this.dashboard_array.length;

  }

  totalApprove() {
    this.reject = false;
    console.log(this.approveArray);
    this.full_dashboard_array = this.approveArray;
    this.refreshCountries();
    this.dataSource.sort = this.sort;

    this.dataSource.paginator = this.paginator;
    this.loading = this.reports.length;
    console.log("length : " + this.loading);
    this.collectionSize = this.dashboard_array.length;
  }

  totalReject() {
    this.reject = true;
    console.log(this.rejectArray);
    this.full_dashboard_array = this.rejectArray;
    this.refreshCountries();
    this.dataSource.sort = this.sort;

    this.dataSource.paginator = this.paginator;
    this.loading = this.reports.length;
    console.log("length : " + this.loading);
    this.collectionSize = this.dashboard_array.length;
  }

  total(){
    this.reject = true;
    console.log(this.totalArray);
    this.full_dashboard_array = this.totalArray;
    this.refreshCountries();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loading = this.reports.length;
    console.log("length : " + this.loading);
    this.collectionSize = this.dashboard_array.length;
    
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource.paginator = this.paginator;
  }


  viewDetail(consultantName: string, status: string, frId: string) {
    console.log(consultantName);
    // Remove the 'frid' key from localStorage
localStorage.removeItem('requestid');
localStorage.removeItem('frid');
localStorage.removeItem('paymentType');


    // this.senddata.requestid = consultantName;
  localStorage.setItem('requestid',consultantName);
    // this.senddata.frid = frId;
    localStorage.setItem('frid',frId)
    // this.senddata.paymentType = "fileNew"
    localStorage.setItem('paymentType', "fileNew")

    
    if (status == COMMONCONSTANTS.Status_Documents_Uploaded) {
      this.router.navigate(['/supportView']);
    } else if (status === COMMONCONSTANTS.Status_InitialDepositedAssigned1hierarchy || status ===
      COMMONCONSTANTS.Status_Approval_Hierarchy2nd || status ===
      COMMONCONSTANTS.Status_Approval_Hierarchy3rd || status ===
      COMMONCONSTANTS.Status_Approval_Hierarchy4th || status ===
      COMMONCONSTANTS.Status_Rejection_Hierarchy2nd || status ===
      COMMONCONSTANTS.Status_Rejection_Hierarchy3rd || status ===
      COMMONCONSTANTS.Status_Rejection_Hierarchy4th || status == COMMONCONSTANTS.Status_PendingPayment || status == COMMONCONSTANTS.Status_PaymentCompleted || status == COMMONCONSTANTS.Status_DSAppliedRequestApproved
      || status == COMMONCONSTANTS.Status_Request_Released || status == COMMONCONSTANTS.Status_NocFilled || status == COMMONCONSTANTS.Status_InitialDepositedAssignedNOCDept || status == COMMONCONSTANTS.Status_Rejected || status == COMMONCONSTANTS.Status_DSPending
      || status == COMMONCONSTANTS.Status_Refer_Back_to_Architect || status== COMMONCONSTANTS.Status_DS_Pending_Architect) {
      this.router.navigate(['/viewNocPage']);
    } else if (status == COMMONCONSTANTS.Status_Final_Form_Submit || status == COMMONCONSTANTS.Status_Form_Submitted_GIS_Pending) {
      this.router.navigate(['/secondView']);
    } else if (status == COMMONCONSTANTS.Status_OwnerAssigned) {
      this.architectViews = true;
      this.router.navigate(['/OwnerApplicantDetials']);
    } else if(status == COMMONCONSTANTS.Status_AcceptByArchitect){
      this.router.navigate(['/form/new-first-component']);
    }else if (status == 'Request Released') {
      this.router.navigate(['/plinthComponent']);
    } else if (status == 'Plinth Applied' || status == 'Plinth Payment Completed & Inspection Schedule' || status == 'Plinth Approval Hierachy - 2nd' || status == 'Plinth Rejection Hierachy - 2nd' || status == 'Plinth Ds Pending' || status == 'Plinth Ds Applied - Plinth Approved' || status == 'Plinth Released' || status == 'Plinth Initial Deposite' || status == 'Plinth Rejected' || status =='Plinth Refer Back to Architect'|| status =='Plinth Inspection Completed') {
      this.router.navigate(['/plintComponentView']);
    } else if (status == "Plinth Released") {
      this.router.navigate(['/OccupancyComponent']);
    } else if (status == 'Occupancy Applied' || status == 'Occupancy Noc Submit' || status == 'Occupancy Payment Completed & Assigned to Noc Dept' || status == 'Occupany Initial Deposite' || status == 'Occupancy Payment Completed & Inspection Schedule' || status == 'Occupancy Approval Hierachy - 2nd' || status == 'Occupancy Approval Hierachy - 3nd' || status == 'Occupancy Rejection Hierachy - 2nd' || status == 'Occupancy Rejection Hierachy - 3nd' || 
      status == 'Occupancy Pending For payment' || status == 'Occupancy Payment Completed' || status == 'Occupancy Ds Pending' || status == 'Occupancy Ds Applied - Occupancy Approved' || status == 'Occupancy Released' || status == 'Occupancy Rejected' || status == 'Occupancy Refer Back to Architect' || status == 'Occupancy Inspection Completed') {
      this.router.navigate(['/OccupancyComponentView']);
    } else{
      this.router.navigate(['/NewFormView']);
    }
  }

  tableHeaders = [
    'File No',
    'File Name',
    'Created Time',
    'Nature of Project',
    'Plot Area',
    'Assigned Auth Role',
    'Current Status',
    'Building Category',
    'Building Sub Category',
  ];

  exportToExcel(): void {
    const exportData = [
      this.tableHeaders,
      ...this.full_dashboard_array.map((country: any) => [
        country.fileNo,
        country.frId,
        country.fcreatedTime,
        country.natureOfProject,
        country.pArea,
        country.assignedAuthRole,
        country.status,
        country.bCategory,
        country.bSubCategory
      ]),
    ];
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(exportData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'table_data.xlsx');
  }

  tableHeadersRejected = [
    'File No',
    'File Name',
    'Created Time',
    'Building Category',
    'Building Sub Category',
    'Current Status',
    'File Rejected By',
    'File Rejection'
    // 'File Rejection Reseaon'
  ];

  exportToExcelReject() {
    const exportData = [
      this.tableHeadersRejected,
      ...this.full_dashboard_array.map((country: any) => [
        country.fileNo,
        country.frId,
        country.fcreatedTime,
        country.bCategory,
        country.bSubCategory,
        country.status,
        country.fileRejectedBy,
        country.fileRejectionDate
        // country.fileRejectionReseaon
      ]),
    ];
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(exportData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'table_data.xlsx');
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.dataSource = new MatTableDataSource(this.full_dashboard_array.slice(startIndex, endIndex));
    this.dataSource.sort = this.sort;
  }


  refreshCountries() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dashboard_array = this.full_dashboard_array.slice(startIndex, endIndex);
    this.collectionSize = this.full_dashboard_array.length;
  }



}




