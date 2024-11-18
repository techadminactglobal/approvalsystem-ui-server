import { Component, OnInit , ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SendData } from 'src/app/SendData';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-noc-dashboard',
  templateUrl: './noc-dashboard.component.html',
  styleUrls: ['./noc-dashboard.component.scss']
})
export class NocDashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pendingSize = 0;
  approvedSize = 0;
  rejectedSize = 0;
  ApporveArray: any[] = [];
  pendingArray: any[] = [];
  rejectArray: any[] = [];
  loading = -1;
  reject: boolean = false;
  professionalType: any;
  apiConstant = API_PATH;

  constructor(
    private service: commonService,
    private dialogRef: MatDialog,
    private senddata: SendData,
    private router: Router
  ) {}

  ngOnInit() {
    this.professionalType = this.senddata.professionalType;
    this.Approve();
    this.Reject();
    setTimeout(() => {
      this.viewDashboard(); 
    this.reject =false;
    }, 750);
    
  }

  viewDashboard() {
    this.service.getDeptDashboard(this.apiConstant.GET_DEPT_DASHBOARD + "?hierarchyRole=", this.senddata.hierarchyId).subscribe((res: any) => {
      console.log(res);
      this.reject = false;
      this.rejectArray=[];
      this.ApporveArray=[];
      if (res.data != null) {
        this.pendingSize = res.data.length;
        this.loading = res.data.length;
        this.senddata.pendingSize = res.data.length;
        this.pendingArray = res.data; 
        console.log(this.pendingArray);
      }
    });
  }

  Reject() {
    this.service.getDeptDashboard(this.apiConstant.NocRejectDashboard + "?hierarchyRole=", this.senddata.hierarchyId).subscribe((res: any) => {
      console.log(res);
      this.ApporveArray =[];
      this.pendingArray = [];
      this.reject = true;
      if (res.data != null) {
        this.rejectedSize = res.data.length;
        this.loading = res.data.length;
        this.senddata.rejectSize = res.data.length;
        this.rejectArray = res.data; 
        console.log(this.rejectArray);
      }
    });
  }

  Approve() {
    this.service.getDeptDashboard(this.apiConstant.NocApproveDashboard + "?hierarchyRole=", this.senddata.hierarchyId).subscribe((res: any) => {
      console.log(res);
      this.rejectArray = [];
      this.pendingArray=[];
      this.reject = false;
      if (res.data != null) {
        this.approvedSize = res.data.length;
        this.loading = res.data.length;
        this.senddata.approveSize = res.data.length;
        this.ApporveArray = res.data; 
        console.log(this.ApporveArray);
      }
    });
  }

  viewDetail(fileNo: any, frId: string,reqeustType:string) {
    this.senddata.requestid = fileNo;
    this.senddata.frid = frId;
    this.senddata.NocDeptDashboard=true;
    if(reqeustType=='approve' || reqeustType=='reject'){
      this.senddata.NocDept=false;
    }else{
      this.senddata.NocDept = true;
    }
    this.router.navigate(['/viewFire']);
  }

    onPageChange(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
  }

  totalSize(): number {
    return this.reject ? this.rejectArray.length : this.pendingArray.length + this.ApporveArray.length;
  }
}



// import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { SendData } from 'src/app/SendData';
// import { commonService } from 'src/app/services/common.service';
// import { API_PATH } from 'src/environments/api-constant';
// import { MatPaginator, PageEvent } from '@angular/material/paginator';

// @Component({
//   selector: 'app-noc-dashboard',
//   templateUrl: './noc-dashboard.component.html',
//   styleUrls: ['./noc-dashboard.component.scss']
// })
// export class NocDashboardComponent implements OnInit {
//   pendingSize = 0;
//   approvedSize = 0;
//   rejectedSize = 0;
//   ApporveArray: any[] = [];
//   pendingArray: any[] = [];
//   rejectArray: any[] = [];
//   loading = -1;
//   reject = false;
//   professionalType: any;
//   apiConstant = API_PATH;

//   @ViewChild(MatPaginator) paginator!: MatPaginator;

//   constructor(
//     private service: commonService,
//     private dialogRef: MatDialog,
//     private senddata: SendData,
//     private router: Router
//   ) {}


//   ngOnInit() {
//     this.professionalType = this.senddata.professionalType;
//     this.Approve();
//     this.Reject();
//     setTimeout(() => {
//       this.viewDashboard(); 
//     this.reject =false;
//     }, 750);
    
//   }
  

//   viewDashboard() {
//     this.service.getDeptDashboard(this.apiConstant.GET_DEPT_DASHBOARD + "?hierarchyRole=", this.senddata.hierarchyId).subscribe((res: any) => {
//       console.log(res);
//       this.reject = false;
//       this.rejectArray = [];
//       this.ApporveArray = [];
//       if (res.data != null) {
//         this.pendingSize = res.data.length;
//         this.loading = res.data.length;
//         this.senddata.pendingSize = res.data.length;
//         this.pendingArray = res.data;
//         console.log(this.pendingArray);
//       }
//     });
//   }

//   Reject() {
//     this.service.getDeptDashboard(this.apiConstant.NocRejectDashboard + "?hierarchyRole=", this.senddata.hierarchyId).subscribe((res: any) => {
//       console.log(res);
//       this.ApporveArray = [];
//       this.pendingArray = [];
//       this.reject = true;
//       if (res.data != null) {
//         this.rejectedSize = res.data.length;
//         this.loading = res.data.length;
//         this.senddata.rejectSize = res.data.length;
//         this.rejectArray = res.data;
//         console.log(this.rejectArray);
//       }
//     });
//   }

//   Approve() {
//     this.service.getDeptDashboard(this.apiConstant.NocApproveDashboard + "?hierarchyRole=", this.senddata.hierarchyId).subscribe((res: any) => {
//       console.log(res);
//       this.rejectArray = [];
//       this.pendingArray = [];
//       this.reject = false;
//       if (res.data != null) {
//         this.approvedSize = res.data.length;
//         this.loading = res.data.length;
//         this.senddata.approveSize = res.data.length;
//         this.ApporveArray = res.data;
//         console.log(this.ApporveArray);
//       }
//     });
//   }

//   viewDetail(fileNo: any, frId: string, reqeustType: string) {
//     this.senddata.requestid = fileNo;
//     this.senddata.frid = frId;
//     this.senddata.NocDeptDashboard = true;
//     if (reqeustType == 'approve' || reqeustType == 'reject') {
//       this.senddata.NocDept = false;
//     } else {
//       this.senddata.NocDept = true;
//     }
//     this.router.navigate(['/viewFire']);
//   }

//   onPageChange(event: PageEvent) {
//     this.paginator.pageIndex = event.pageIndex;
//     this.paginator.pageSize = event.pageSize;
//   }

//   totalSize(): number {
//     return this.reject ? this.rejectArray.length : this.pendingArray.length + this.ApporveArray.length;
//   }
// }
