import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SendData } from 'src/app/SendData';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';

@Component({
  selector: 'app-plinth-dashboard',
  templateUrl: './plinth-dashboard.component.html',
  styleUrls: ['./plinth-dashboard.component.scss'],
})
export class PlinthDashboardComponent {
  // displayedColumns: string[] = ['SNo', 'RequestID', 'PlanType', 'BuildingType', 'BuildingSubtype', 'Zone', 'PlotArea', 'RiskCategory', 'RequestType', 'Status', 'Created Date'];
  constructor(
    private service: commonService,
    private dialogRef: MatDialog,
    private senddata: SendData,
    private router: Router
  ) { }

  pendingSize = 0;
  approvedSize = 0;
  rejectedSize = 0;
  totalSize: number = 0;
  totalArray: any[] = [];
  pendingArray: any[] = [];
  approveArray: any[] = [];
  rejectArray: any[] = [];
  pendArr: any[] = [];
  apiConstant = API_PATH;
  reject: boolean = false;
  approve: boolean = false;
  pending: boolean = false;
  total: boolean = false;
  totalPendingArray: any[] = [];
  totalPendingSize=0;
  hierarchyUserName:any;

  ngOnInit() {
    this.hierarchyUserName = localStorage.getItem('hierarchyUserName'); 
    this.plinthDashboardData();
    this.pending = true;
    // setTimeout(() => {
    //   // Initialize the totalData array
    //   this.totalArray = [];

    //   // Combine all the data into one array
    //   const combinedData = [
    //     ...this.approveArray.length > 0 ? this.approveArray : [],
    //     ...this.totalPendingArray.length > 0 ? this.totalPendingArray : [],
    //     ...this.pendingArray.length > 0 ? this.pendingArray : [],
    //     ...this.rejectArray.length > 0 ? this.rejectArray : []
    //   ].filter(item => item && Object.keys(item).length > 0); // Removes empty arrays or falsy items      
      

    //   // Push the combined data into the 0th index of totalData
    //   this.totalArray.push(combinedData);

    //   console.log(this.totalArray, "total array for plinth dashboard");

    //   this.totalSize = this.totalArray[0].length;
    //   this.pending = true;
    // }, 1000);
  }

  plinthDashboardData() {
    this.service
      .getDeptDashboard(
        this.apiConstant.PlinthDashboardDetails,
        this.hierarchyUserName
      )
      .subscribe((res: any) => {
        console.log('**************', res);
        if (res.data == null) {
          return;
        }
        this.pending = true;
        this.reject = false;
        this.pendingArray.push(res.data);
        this.totalPendingSize = this.pendingArray[0].length;
        console.log(this.pendingSize, 'size pending plinth');
        this.senddata.pendingSize = this.pendingSize;
        console.log(this.pendingArray, 'data plint array...');
      });

    //Approve
    let request = this.hierarchyUserName;
    this.service
      .getDeptDashboard(this.apiConstant.PlintApprovedDashboard, request)
      .subscribe((res: any) => {
        console.log('**************', res);
        if (res.data == null) {
          return;
        }
        this.approveArray.push(res.data);
        this.approvedSize = this.approveArray[0].length;
        console.log(this.approveArray, 'size pending plinth');
        this.senddata.approveSize = this.approvedSize;
        console.log(this.approveArray, 'data plint array...');
      });
    //pending
    // this.service
    //   .getDeptDashboard(this.apiConstant.PlintPendingDashboard, request)
    //   .subscribe((res: any) => {
    //     console.log('**************', res);
    //     // Ensure `res.data` is an array and not null or undefined
    //     if (Array.isArray(res.data) && res.data.length > 0) {
    //       // Assuming res.data is an array of elements
    //       this.pendArr = res.data;

    //       // Concatenate new data to totalPendingArray
    //       this.totalPendingArray = this.totalPendingArray.concat(this.pendArr);
    //       console.log(
    //         this.totalPendingArray,
    //         'total pending array after API response'
    //       );
    //     }

      //   // If `this.pendingArray` has data, merge it as well
      //   // if (Array.isArray(this.pendingArray) && this.pendingArray.length > 0) {
      //   //   this.totalPendingArray = this.totalPendingArray.concat(this.pendingArray);
      //   //   console.log(this.totalPendingArray, "total pend array after local array merge");
      //   // }

      //   console.log(this.totalPendingArray, 'total pending array final');
      //   this.totalPendingArray = this.totalPendingArray;
      //   this.totalPendingSize = this.totalPendingArray.length + this.pendingSize;
      //   // this.senddata.pendingSize = this.pendingSize;

      //   this.senddata.pendingSize = this.totalPendingSize;

      //   // this.pendingArray[0].push(res.data);
      //   // this.pendingSize = this.pendingArray[0].length;
      //   // console.log(this.pendingSize,"size pending plinth");
      //   // this.senddata.pendingSize = this.pendingSize;
      //   // console.log(this.pendingArray,"data plint array...");
      // });

    //rejected
    this.service
      .getDeptDashboard(this.apiConstant.PlintRejectedDashboard, request)
      .subscribe((res: any) => {
        console.log('**************', res);
        if (res.data == null) {
          return;
        }
        this.rejectArray.push(res.data);
        this.rejectedSize = this.rejectArray[0].length;
        console.log(this.rejectedSize, 'size pending plinth');
        this.senddata.rejectSize = this.rejectedSize;
        console.log(this.rejectArray, 'data plint array...');
      });

  }

  totalPending() {
    this.reject = false;
    this.approve = false;
    this.pending = true;
    this.total = false;
    console.log(this.totalPendingArray);
  }

  totalApprove() {
    this.reject = false;
    this.pending = false;
    this.approve = true;
    this.total = false;
    console.log(this.approveArray);
  }

  totalReject() {
    this.reject = true;
    this.pending = false;
    this.approve = false;
    this.total = false;
    console.log(this.rejectArray);
  }

  totalReqeust() {
    this.reject = false;
    this.pending = false;
    this.approve = false;
    this.total = true;
  }

  viewDetail(fileNo: string, status: string, frId: string) {
    console.log(fileNo);
    // this.senddata.requestid = fileNo;
    localStorage.setItem('requestid',fileNo);
    // this.senddata.frid = frId;
    localStorage.setItem('frid',frId);
    // this.senddata.callFrom = 'plinth';
    localStorage.setItem('callFrom' , 'plinth')
    if (status == 'Request Released') {
      this.router.navigate(['/plinthComponent']);
    } 
    // else {
  //     this.router.navigate(['/plintComponentView']);
  //   }
  }
}
