import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { COMMONCONSTANTS } from 'src/app/CONSTANTS/constants';
import { SendData } from 'src/app/SendData';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';

@Component({
  selector: 'app-view-noc-page',
  templateUrl: './view-noc-page.component.html',
  styleUrls: ['./view-noc-page.component.scss']
})
export class ViewNocPageComponent {

  constructor(
    private service: commonService,
    private router: Router,
    public senddata: SendData) { }

  apiConstant = API_PATH;
  fireForm: boolean = false;

  viewHistoryButton:boolean =false;
  viewPaymentButton:boolean=false;
  viewLetter:boolean=false;
  letterUniqueId:any;
  letterName:any;
  requestId:any;
  frids:any;
  ownerCall:any;

  ngOnInit(): void {
    this.requestId = localStorage.getItem('requestid');
    this.frids = localStorage.getItem('frid');
    this.ownerCall = localStorage.getItem("ownerCall");
    this.ownerCall= this.ownerCall==null?'false':this.ownerCall;


    this.userName = this.requestId;
    this.service.getButtonDetails(this.apiConstant.newFORM_VIEW, this.requestId).subscribe((data: any) => {
      if(data.basicInfo.status == COMMONCONSTANTS.Status_InitialDepositedAssigned1hierarchy || data.basicInfo.status == COMMONCONSTANTS.Status_PaymentCompleted
        || data.basicInfo.status == COMMONCONSTANTS.Status_DSPending  ){
        this.viewHistoryButton = true;
        this.viewPaymentButton =false;
      }else if(data.basicInfo.status == COMMONCONSTANTS.Status_PendingPayment){
        this.viewHistoryButton = true;
        this.viewPaymentButton =true;
      }else if(data.basicInfo.status == COMMONCONSTANTS.Status_NocFilled || data.basicInfo.status == COMMONCONSTANTS.Status_Final_Form_Submit){
        this.viewHistoryButton = false;
        this.viewPaymentButton =true;
      }else{
        this.viewHistoryButton = true;
        this.viewPaymentButton =false;
      }
      if(data.basicInfo.status == COMMONCONSTANTS.Status_DSAppliedRequestApproved){
       this.viewLetter = true;
      }else{
        this.viewLetter = false;
      }

      if(data.basicInfo.approvedLetter != null){
        this.letterUniqueId = data.basicInfo.letterApprovedDs;
        this.letterName = "Approve Letter";
      }else if(data.basicInfo.rejectLetter != null){
        this.letterUniqueId =data.basicInfo.rejectLetterDs
        this.letterName = "Reject Letter";
      }

      });


    this.fireDetails();
    this.viewPaymentHistory();
    this.viewHierachyHistory();
    this.viewNocHistory();
  }

  fireDetails() {
    let request = '?fileNo=' + this.requestId + '&frId=' +  this.frids + '&callFor=' + this.senddata.callFrom;
    this.service.getButtonDetails(this.apiConstant.ViewNocFire, request).subscribe((data: any) => {
      console.log(data, "response from api...");
      if (data.httpStatus === "NOT_FOUND") {
        this.fireForm = true;
      }else if (data.httpStatus == "OK"){
        this.fireForm = false;
      }
    });
  }


  ViewNocFire() {
    this.router.navigate(['/viewFire']);
  }

  payment(){
    this.requestId  = this.requestId ,
    this.frids =  this.frids;
    // this.senddata.paymentType = "fileNew"
    localStorage.removeItem('paymentType');
    localStorage.setItem('paymentType', 'fileNew');
    this.router.navigate(['/payment']);
  }

  hierarchyHistoryData: any;
  hierarchyModule:any;
  referenceId: any;
  userName: any;
  docUUID:any;
  history:boolean=false;

  viewHierachyHistory() {
    this.history = true;
    console.log(this.history);
    this.service.getButtonDetails(this.apiConstant.HIERARCHY_HISTORY, this.userName).subscribe((data: any) => {
      console.log(data,"ashish");
     
      this.hierarchyHistoryData = data.filter((item: any) => {
        return !(this.calculateTimeDifference(item.workDate, item.assignDate) === "-476144:-4");
      });
  
      if (this.hierarchyHistoryData.length > 0) {
        this.hierarchyModule = this.hierarchyHistoryData[0].hierachyModule;
        this.referenceId = this.hierarchyHistoryData[0].referenceId;
        this.docUUID = this.hierarchyHistoryData[0].docUUID;
      
      }
  
    });
  }


  nocHistoryData : any;

  viewNocHistory(){
    this.service.getButtonDetails(this.apiConstant.NOC_HISTORY, this.userName).subscribe((data: any) => {
      console.log(data,"ashish");
     
      this.nocHistoryData = data.data.filter((item: any) => {
        return !(this.calculateTimeDifference(item.workDate, item.assignDate) === "-476144:-4");
      });
    });
  }


  paymentHistoryData: any;
  fileNo:any;
  frId: any;
  docUniqueId:any;
  paymentHistory:boolean=false;

  viewPaymentHistory(){
    this.paymentHistory = true;
    console.log(this.paymentHistory);

    let request={
      "fileNo": this.requestId,
      "frId":this.frids
    }

    this.service.getHierarchyService(this.apiConstant.Payment_History, request).subscribe((data: any) => {
      console.log(data,"ashish");
     
      this.paymentHistoryData = data.filter((item: any) => {
        return !(this.calculateTimeDifference(item.workDate, item.assignDate) === "-476144:-4");
      });
  
      if (this.paymentHistoryData.length > 0) {
        this.fileNo = this.paymentHistoryData[0].fileNo;
        this.frId = this.paymentHistoryData[0].frId;
        this.docUniqueId = this.paymentHistoryData[0].docUniqueId;
      
      }
  
    });


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








  calculateTimeDifference(workDate: any, assignDate: any): string {
    if (!workDate || !assignDate || isNaN(new Date(workDate).getTime()) || isNaN(new Date(assignDate).getTime())) {
      return "";
    }
    const workDateTime = new Date(workDate).getTime();
    const assignDateTime = new Date(assignDate).getTime();
  
    const timeDifference = workDateTime - assignDateTime;
  
    if (timeDifference < 0) {
      return "";
    }
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  
    return `${hours}:${minutes}`;
  }


  ViewDS(): void {
    let request: any = {
      "referenceId":  this.requestId,
      "docUUID": this.letterUniqueId
    }
console.log(this.letterUniqueId,"uiqueif");

    this.service.getHierarchyService(this.apiConstant.viewUUID, request).subscribe((data: any) => {
      console.log(data);
      this.docUUID = data.docUUID
      console.log(this.docUUID, "sdjkdsfdjsfdsjfj")
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

fileRelease(){

  let request = {
    "fileNo":  this.requestId,
    "frId": this.frids
  }
  this.service.getSecondViewDetails(this.apiConstant.File_Release, request).subscribe((data: any) => {
    console.log(data, "okkkkk");
    if (data.httpStatus === "OK") {
      this.router.navigate(['/dashboard']);
    }


  });

}

openPdf(docUniqueId: string): void {
  let request: any = {
    "docUUID": docUniqueId
   
  }
  this.service.getHierarchyService(this.apiConstant.viewUUID, request).subscribe((data: any) => {
    console.log(docUniqueId,"asgjho");
    console.log(data);
    // this.docUUID = data.docUUID
    // console.log(this.docUUID,"sdjkdsfdjsfdsjfj")
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


back(){
  this.router.navigate(['/dashboard']);
}

BacktoNocdeptdasbhoard(){
  this.router.navigate(['/nocPage']);
}

BacktoOwnerDasbhoard(){
  this.router.navigate(['/OwnerDashboard']);
}

}
