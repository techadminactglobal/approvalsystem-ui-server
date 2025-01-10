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
  totalArray: any[] = [];
  loading = -1;
  reject: boolean = false;
  professionalType: any;
  apiConstant = API_PATH;

  pending:boolean = false;
  approve:boolean = false;
  total:boolean = true;

  totalSize = 0;

  constructor(
    private service: commonService,
    private dialogRef: MatDialog,
    private senddata: SendData,
    private router: Router
  ) {}
  hierarchyId:any;
  professionalTypes:any;
  requestId:any;
  frids:any;
  zoneId:any;
  ngOnInit() {
    this.requestId = localStorage.getItem('requestId');
    this.hierarchyId = localStorage.getItem('hierarchyId');
    this.professionalTypes = localStorage.getItem('professionalType');
    this.frids = localStorage.getItem('frid')
    this.zoneId=localStorage.getItem("zoneId");
    this.zoneId= this.zoneId==""?null:this.zoneId;

    this.Approve();
    this.Reject();

    this.allDetails();
    
    this.viewDashboard();
    setTimeout(() => {
      // Initialize the totalData array
      // this.totalArray = [];
      this.reject = false;
      this.pending = false;
      this.approve = false;
      this.total = true;
      

      // Combine all the data into one array
      // const combinedData = [
      //   ...this.ApporveArray.length > 0 ? this.ApporveArray : [],
      //   ...this.pendingArray.length > 0 ? this.pendingArray : [],
      //   ...this.rejectArray.length > 0 ? this.rejectArray : []
      // ].filter(item => item && Object.keys(item).length > 0); // Removes empty arrays or falsy items      
      
      // // Push the combined data into the 0th index of totalData
      // this.totalArray = combinedData;

      // console.log(this.totalArray, "total array for plinth dashboard");
      
      
    this.reject =false;
    }, 750);
    
  }

  allDetails(){

    this.service.getDeptDashboard(this.apiConstant.GET_DEPT_ALL_DASHBOARD + "?hierarchyRole=", this.hierarchyId+"&zoneId="+this.zoneId).subscribe((res: any) => {

      console.log(res);

      if (res.data != null) {

        this.totalArray = [];

        this.totalSize = res.data.length;

        this.senddata.totalSize = res.data.length;

        console.log(this.totalSize);

        this.totalArray = res.data;

        console.log(this.totalArray);

      }

    })

  }

  viewDashboard() {
    this.service.getDeptDashboard(this.apiConstant.GET_DEPT_DASHBOARD + "?hierarchyRole=", this.hierarchyId+"&zoneId="+this.zoneId).subscribe((res: any) => {
      console.log(res);
      this.reject = false;
      this.pending = true;
      this.approve = false;
      this.total = false;
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
    this.service.getDeptDashboard(this.apiConstant.NocRejectDashboard + "?hierarchyRole=",  this.hierarchyId+"&zoneId="+this.zoneId).subscribe((res: any) => {
      console.log(res);
      this.pending = false;
      this.approve = false;
      this.reject = true;
      this.total = false;
      if (res.data != null) {
        this.rejectedSize = res.data.length;
        this.loading = res.data.length;
        this.senddata.rejectSize = res.data.length;
        this.rejectArray = res.data; 
        console.log(this.rejectArray);
      }
    });
  }

  Total(){
    this.reject = false;
      this.pending = false;
      this.approve = false;
      this.total = true;
  }

  Approve() {
    this.service.getDeptDashboard(this.apiConstant.NocApproveDashboard + "?hierarchyRole=",  this.hierarchyId+"&zoneId="+this.zoneId).subscribe((res: any) => {
      console.log(res);
      this.reject = false;
      this.pending = false;
      this.approve = true;
      this.total = false;
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
    // this.requestId = fileNo;
    localStorage.setItem('requestid', fileNo);
    localStorage.setItem('frid', frId);
    // this.frids = frId;
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

  // totalSize(): number {
  //   return this.reject ? this.rejectArray.length : this.pendingArray.length + this.ApporveArray.length;
  // }
  paginatorLength() {
    if (this.reject) {
      return this.rejectArray.length;
    } else if (this.pending) {
      return this.pendingArray.length;
    } else if (this.approve) {
      return this.ApporveArray.length;
    } else if (this.total) {
      return this.totalArray.length;
    }
    return 0; // Default length if none are selected
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
