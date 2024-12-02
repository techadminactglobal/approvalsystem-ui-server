import { AfterViewInit, Component } from '@angular/core';
import { SendData } from 'src/app/SendData';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ElementRef, ViewChild } from '@angular/core';
import { PhotographModalComponent } from '../../pages/photograph-modal/photograph-modal.component';
import { TestPDF } from '../data/test-pdf';
import { COMMONCONSTANTS } from 'src/app/CONSTANTS/constants';


@Component({
  selector: 'app-registration-view',
  templateUrl: './registration-view.component.html',
  styleUrls: ['./registration-view.component.scss']
})
export class RegistrationViewComponent {
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
  fifthFormGroup!: FormGroup;
  sixthFormGroup!: FormGroup;
 
  status: any;
  userName: any;
  salutation: any;
  firstName: any;
  middleName: any;
  lastName: any;
  dob: any;
  gender: any;
  professionalCategory: any;
  licensedNo: any;
  validFrom: any;
  validTo: any;
  addharNo: any;
  emailId: any;
  contactNo: any;
  certificateNo: any;
  photoGraph: any;
  // photoGraphName:any;
  educationalCertificate:any;
  // licensedNo:any;
  licensedNum:any;
  state: any;
  district: any;
  pinCode: any;
  zone:any;
  buildingTypeDetails: any;

  address: any;
  apiConstant = API_PATH;
  paymentDone:boolean=false;
  viewHistory:boolean=false;
  viewLetter:boolean=false;

  proff: boolean = true;
  letterUniqueId: any;
  letterName:any;
  photoGraphName: any;
  viewLogout: boolean = true;

  constructor(private service: commonService, public senddata: SendData,private route:Router, private dialog: MatDialog,private _formBuilder: FormBuilder) {
    this.userName = this.senddata.requestid;

  }

  ngOnInit(): void {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required]
    });
    this.sixthFormGroup = this._formBuilder.group({
      sixthCtrl: ['', Validators.required]
    });

  
  

    let request: any = { "name": this.userName }

    this.service.getDataService(this.apiConstant.GET_DETAILS, request).subscribe((data: any) => {
      console.log(data);

if(data.consultantDetailModel.letterApprovedDs != null && data.consultantDetailModel.rejectLetterDs == null){
  this.letterUniqueId = data.consultantDetailModel.letterApprovedDs;
  this.letterName = "Approved Letter DS"
}else if(data.consultantDetailModel.letterApprovedDs == null && data.consultantDetailModel.rejectLetterDs != null){
  this.letterUniqueId = data.consultantDetailModel.rejectLetterDs;
  this.letterName = "Reject Letter DS"
}
      

      this.userName = data.address.userName;
      this.salutation = data.consultantDetailModel.salutation;
      // this.status = data.consultantDetailModel.status;
      this.firstName = data.consultantDetailModel.firstName;
      this.middleName = data.consultantDetailModel.middleName;
      this.lastName = data.consultantDetailModel.lastName;
      this.dob = data.consultantDetailModel.dob;
      this.gender = data.consultantDetailModel.gender;
      this.professionalCategory = data.consultantDetailModel.professionalType;
      this.licensedNum = data.consultantDetailModel.licenseNo;
      this.validFrom = data.consultantDetailModel.validFrom;
      this.validTo = data.consultantDetailModel.validTo;
      this.addharNo = data.consultantDetailModel.addharNo;
      this.contactNo = data.consultantDetailModel.contactNo;
      this.emailId = data.consultantDetailModel.email;
      this.certificateNo = data.consultantDetailModel.certificateNo;
      this.state = data.address.state;
      this.district = data.address.district;
      this.pinCode = data.address.pinCode;
      this.address = data.address.addres;
      this.zone = data.consultantDetailModel.zone;
      this.buildingTypeDetails=data.consultantDetailModel.buildingTypeDetails;
      // this.photoGraph = data.address.photoGraph;
      // if(data.consultantDocumentsModel[0].docName=="photoName"){
      //   this.photoGraph = data.consultantDocumentsModel[0].docUniqueId;
      //   console.log(this.photoGraph,"kk")
      // } if(data.consultantDocumentsModel[1].docName=="educationalCertificatename"){
      //   this.educationalCertificate = data.consultantDocumentsModel[1].docUniqueId;
      //   console.log(this.educationalCertificate,"kk")
      // }

      data.consultantDocumentsModel.forEach((doc: any) => {
        if (doc.docName === "photoName") {
          this.photoGraphName=doc.docType;
          this.photoGraph = doc.docUniqueId;
          console.log(this.photoGraph, "kk");
        } else if (doc.docName === "educationalCertificatename") {
          this.educationalCertificate = doc.docUniqueId;
          console.log(this.educationalCertificate, "kk");
        } else if(doc.docName === "licensedCertificatename") {
          this.licensedNo = doc.docUniqueId;
        }
      });

      // if (data.basicInfo.buildingTypeDetails == 1) {
      //   this.buildingTypeDetails = "Residential";
      // } else if (data.basicInfo.buildingTypeDetails == 2) {
      //   this.buildingTypeDetails = "Commercial";
      // } else if (data.basicInfo.buildingTypeDetails == 3) {
      //   this.buildingTypeDetails = "Industrial";
      // } else if (data.basicInfo.buildingTypeDetails == 40) {
      //   this.buildingTypeDetails = "Other";
      // }
    
      
      this.docUUID = data.docUUID;
     
      this.senddata.status =  data.consultantDetailModel.statusId;
      
      this.service.getButtonDetails(this.apiConstant.VIEW_STATUS, data.consultantDetailModel.statusId).subscribe((data: any) => {
        this.status =  data.description;
          console.log('Status:', this.status); // Check status value
        if(this.status== COMMONCONSTANTS.Status_Registration_Initiated){
          this.viewHistory = true;
          this.paymentDone=true;
        }else if(this.status== COMMONCONSTANTS.Status_PendingPayment){
          this.viewHistory=false;
          this.paymentDone =true;
        // }else if(this.status== "Inital Deposited & Assigned to 1st Hierachy" || this.status=="Inital Deposited" || this.status=="Payment Completed"){
        }else if(this.status== COMMONCONSTANTS.Status_InitialDepositedAssigned1hierarchy || this.status== COMMONCONSTANTS.Status_InitialDeposited
          || this.status==COMMONCONSTANTS.Status_PaymentCompleted
        ){
          this.viewHistory=false;
          this.paymentDone =false;
        }
        else if(this.status == 	COMMONCONSTANTS.Status_DSPending){
          this.senddata.viewDsWork = COMMONCONSTANTS.Status_DSPending;
          this.senddata.status = data.consultantDetailModel.statusId;
        }
        if(this.status ==  COMMONCONSTANTS.Status_DSAppliedRequestApproved){
          this.viewLetter = true;
         }else{
           this.viewLetter = false;
         }

      });
    
      if (this.professionalCategory == 'Architect') {
        this.proff = true;
      } else {
        this.proff = false;
      }
    });

    this.viewHierachyHistory();
    this.viewPaymentHistory();

    this.checkDeptView();
  }
  checkDeptView(){
    if(this.senddata.hierarchyId == COMMONCONSTANTS.RegNew_ROLE_ID_JE ||
      this.senddata.hierarchyId == COMMONCONSTANTS.RegNew_ROLE_ID_AE ||
      this.senddata.hierarchyId == COMMONCONSTANTS.RegNew_ROLE_ID_AA ||
      this.senddata.hierarchyId == COMMONCONSTANTS.RegNew_ROLE_ID_SE ){
      this.viewLogout = false;
     }else{
      this.viewLogout = true;
     }

  }


  downloadPdf() {
    console.log("download button clicked....");
    const pdfFilePath = './assets/Get_Started_With_Smallpdf.pdf'; // Replace with the actual path to your PDF file
    const link = document.createElement('a');
    link.href = pdfFilePath;
    link.download = 'Aman.pdf'; // You can set the desired name for the downloaded file
    link.click();
  }

  hierarchyHistoryData: any;
  hierarchyModule:any;
  referenceId: any;

history:boolean=false;
//   viewHierachyHistory(){
//     this.history=true;
//     console.log(this.history)
//     this.service.getButtonDetails(this.apiConstant.HIERARCHY_HISTORY, this.userName).subscribe((data: any) => {
//     console.log(data)
//     this.hierarchyHistoryData = data;
//     if (data.length > 0) {
//       this.hierarchyModule = data[0].hierachyModule;
//       this.referenceId = data[0].referenceId;
//     }


//   });

// }


viewHierachyHistory() {

  this.history = true;
  console.log(this.history);
  this.service.getButtonDetails(this.apiConstant.HIERARCHY_HISTORY, this.userName).subscribe((data: any) => {
    console.log(data);
   
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




docUUID:any;


openPhotographPdf(event: any): void {
  let request: any = { 
    "referenceId": this.senddata.requestid,  
    "docUUID": this.photoGraph
  };

  this.service.getHierarchyService(this.apiConstant.viewUUID, request).subscribe((data: any) => {
    if (data && data.docByteStream) {
      const byteCharacters = atob(data.docByteStream);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);

      // const a = document.createElement('a');
      // a.href = url;
      // a.download = 'photograph.jpg';
      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);

      // window.open(url, '_blank');
      this.openPhotographModal(url);
    } else {
      console.error('No document data found in the response');
    }
  },
  (error: any) => {
    console.error('Error fetching document data:', error);
  });
}

openPhotographModal(imageUrl: string): void {
  
  this.dialog.open(PhotographModalComponent,{
    data:{photoGraph:imageUrl}
  });
}
// openPhotographModal(imageUrl: string): void {
//   this.dialog.open(PhotographModalComponent, {
//     data: { photoGraph: imageUrl },
//     backdropClass: 'custom-backdrop',
//     panelClass: 'custom-dialog-container'
//   });
// }



openCertificatePdf( event: any): void {
  let request: any = { 
    "referenceId": this.senddata.requestid,  
    "docUUID": this.educationalCertificate

  }

  this.service.getHierarchyService(this.apiConstant.viewUUID, request).subscribe((data: any) => {
    console.log(data);
    this.docUUID = data.docUUID
    console.log(this.docUUID,"sdjkdsfdjsfdsjfj")
    const byteString = atob(data.docByteStream);
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'certificate.pdf'; 
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
    
    window.open(url, '_blank');
    
  });
}




openLicensePdf( event: any): void {
  let request: any = { 
    "referenceId": this.senddata.requestid,  
    "docUUID": this.licensedNo
    // "docUUID": 84bf552a-4547-462f-9732-63fc9e4142fa
  }


  this.service.getHierarchyService(this.apiConstant.viewUUID, request).subscribe((data: any) => {
    console.log(data);
    this.docUUID = data.docUUID
    console.log(this.docUUID,"sdjkdsfdjsfdsjfj")
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




testOld(): void {
  let newPdfWindow = window.open('', 'Print');
  let content = encodeURIComponent(TestPDF.data);
  let iframeStart =
    "<iframe width='100%' height='100%' src='data:application/pdf;base64, ";
  let iframeEnd = "'></iframe>";
  if (newPdfWindow) {
    newPdfWindow.document.write(iframeStart + content + iframeEnd);
}

}
testNew(): void {
  const byteArray = new Uint8Array(
    atob(TestPDF.data)
      .split('')
      .map((char) => char.charCodeAt(0))
  );

  const blob = new Blob([byteArray], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);
  let tab = window.open();
  if (tab) {
    tab.location.href = url;
}

}








acceptFlowIsHigher: boolean = true;
viewFlow() {
  this.service.getDeptDashboard(this.apiConstant.VIEW_FLOW, this.userName).subscribe((data: any) => {
    console.log(data);

    const acceptFlows = data.filter((item: any) => item.flow === 'Accept');
    const rejectFlows = data.filter((item: any) => item.flow === 'Reject');

    const acceptFlowCount = acceptFlows.length;
    const rejectFlowCount = rejectFlows.length;

    if (acceptFlowCount > rejectFlowCount) {
      this.acceptFlowIsHigher = true;
    } else if (rejectFlowCount > acceptFlowCount) {
      this.acceptFlowIsHigher = false;
    } else {
     
    }
  });
}


payment(){
  this.senddata.requestid = this.userName;
  if(this.senddata.expired){
    this.senddata.paymentType="RenewalConsultant";
    this.route.navigate(["/payment"]);
  }
  else{
    this.senddata.paymentType="regNew";
    this.route.navigate(["/payment"]);   
  }
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



paymentHistoryData: any;
fileNo:any;
frId: any;

docUniqueId:any;
paymentHistory:boolean=false;

viewPaymentHistory(){
  this.paymentHistory = true;
  console.log(this.paymentHistory);

  let request={
    "userName":this.senddata.requestid,
   
  }

  this.service.getHierarchyService(this.apiConstant.Payment_History, request).subscribe((data: any) => {
    this.paymentHistoryData = data.filter((item: any) => {
      return !(this.calculateTimeDifference(item.workDate, item.assignDate) === "-476144:-4");
    });

    if (this.paymentHistoryData.length > 0) {
      this.frId = this.paymentHistoryData[0].frId;
      this.userName = this.paymentHistoryData[0].userName;
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



ViewDS(): void {
  let request: any = {
    "referenceId": this.senddata.requestid,
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
 "userName":this.senddata.requestid
}
this.service.getSecondViewDetails(this.apiConstant.File_Release, request).subscribe((data: any) => {
  console.log(data, "okkkkk");
  if (data.httpStatus === "OK") {
    // this.route.navigate(['/dashboard']);
    alert("Your Registration Letter is Released Please Re Login")
    this.route.navigate(['/login']);
  }


});

}
logout() {
  console.log('login clicked');
  this.route.navigate(['/login']);
}

}

