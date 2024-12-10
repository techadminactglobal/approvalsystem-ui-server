import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SendData } from 'src/app/SendData';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';

@Component({
  selector: 'app-occupancy-dashborad',
  templateUrl: './occupancy-dashborad.component.html',
  styleUrls: ['./occupancy-dashborad.component.scss']
})
export class OccupancyDashboradComponent {

  constructor(private service: commonService, private dialogRef: MatDialog, private senddata: SendData, private router: Router) {
  }

  pendingSize = 0;
  approvedSize = 0;
  rejectedSize = 0;
  totalSize: number = 0;
  pendingArray: any[] = [];
  approveArray: any[] = [];
  rejectArray: any[] = [];
  pendArr: any[] = [];
  totalArray: any[] = [];
  apiConstant = API_PATH;
  reject: boolean = false;
  approve: boolean = false;
  pending: boolean = false;
  total: boolean = false;
  
  hierarchyUserName:any;

  ngOnInit() {
    this.hierarchyUserName = localStorage.getItem('hierarchyUserName'); 
    this.occupancyDashboradData();
    this.total = false;
    this.pending = true;

    // setTimeout(() => {
       
 
    //    // Combine all the data into one array
    //    const combinedData = [
    //      ...this.approveArray.length > 0 ? this.approveArray : [],
    //      ...this.pendingArray.length > 0 ? this.pendingArray : [],
    //      ...this.rejectArray.length > 0 ? this.rejectArray : []
    //    ].filter(item => item && Object.keys(item).length > 0); // Removes empty arrays or falsy items      
       
    //    // Push the combined data into the 0th index of totalData
    //    this.totalArray = combinedData;
 
    //    console.log(this.totalArray, "total array for plinth dashboard");

    //   this.totalSize = this.pendingSize + this.approvedSize + this.rejectedSize;
    // }, 1000);


  }

  occupancyDashboradData() {
    this.service.getDeptDashboard(this.apiConstant.OccupancyDashboardDetails, this.hierarchyUserName).subscribe((res: any) => {
      console.log("**************", res);
      if (res.data == null) {
        return
      }
      this.pending = true;
      this.reject = false;
      

      if(res.data.PlinthDetails.length > 0){
        this.pendArr = res.data.PlinthDetails;       
        for (let i = 0; i < this.pendArr.length; i++) {
          this.pendingArray = this.pendingArray.concat(this.pendArr[i]);
          console.log(this.pendingArray, "total pending array after API response");
          this.pendingSize =  this.pendingArray.length;
        }
      }
      this.pendingSize =  this.pendingArray.length;
      if(res.data.OccupancyCertificate.length > 0){
        this.pendArr = [];
        this.pendArr = res.data.OccupancyCertificate;       
        for (let i = 0; i < this.pendArr.length; i++) {
          this.pendingArray = this.pendingArray.concat(this.pendArr[i]);
          console.log(this.pendingArray, "total pending array after API response");
          this.pendingSize =  this.pendingArray.length;
        }
      }
      // this.pendingSize = this.pendingArray.length;
      console.log(this.pendingSize, "size pending plinth");
      this.senddata.pendingSize = this.pendingSize;
      console.log(this.pendingArray, "data plint array...");
    })

    //Approve
    let request = 'assignedArchitect='+this.hierarchyUserName;
    this.service.getDeptDashboard(this.apiConstant.OccupancyApprovedDashboard, request).subscribe((res: any) => {
      console.log("**************", res);
      if (res == null) {
        return
      }
      this.approveArray.push(res);
      this.approvedSize = this.approveArray[0].length;
      console.log(this.approveArray, "size approve plinth");
      this.senddata.approveSize = this.approvedSize;
      console.log(this.approveArray, "data plint array...");
    })
    

    //rejected
    this.service.getDeptDashboard(this.apiConstant.OccupancyRejectedDashboard, request).subscribe((res: any) => {
      console.log("**************", res);
      if (res == null) {
        return
      }
      this.rejectArray.push(res);
      this.rejectedSize = this.rejectArray[0].length;
      console.log(this.rejectedSize, "size reject plinth");
      this.senddata.rejectSize = this.rejectedSize;
      console.log(this.rejectArray, "data plint array...");
    })
  }





  totalPending() {
    this.reject = false;
    this.approve = false;
    this.pending = true;
    this.total = false;
    console.log(this.pendingArray);
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

  totalReqeust(){
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
    // this.senddata.callFrom = "OC";
    localStorage.setItem('callFrom' , 'OC')
    if (status == "Plinth Released") {
      this.router.navigate(['/OccupancyComponent']);
    } 
    // else {
    //   this.router.navigate(['/OccupancyComponentView']);
    // }

  }


}
