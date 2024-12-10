import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { SendData } from 'src/app/SendData';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';
import { Router } from '@angular/router';
import { COMMONCONSTANTS } from 'src/app/CONSTANTS/constants';



@Component({
  selector: 'app-new-form-view',
  templateUrl: './new-form-view.component.html',
  styleUrls: ['./new-form-view.component.scss']
})
export class NewFormViewComponent {
  frId: any;
  fileNo: any;
  address: any;
  blockNumber: any;
  state: any;
  district: any;
  pinCode: any;
  landMark: any;
  natureOfProject: any;
  bCategory: any;
  bSubCategory: any;
  aadharNum: any;
  oType: any;
  noOfOwners: any;
  name: any;
  contactNumber: any;
  dob: any;
  email: any;
  pArea: any;
  cArea: any;
  cAreaFar: any;
  cPlot: any;
  bHeight: any;
  frontWidth: any;
  areaAffectedInRoadWidening: any;
  mVentilation: any;
  lcSetback: any;
  lcFar: any;
  frName: any;
  currentStatus: any;
  apiConstant = API_PATH;
  supportForm!: FormGroup;




  primaryAddress: any = {};
  secondaryAddress: any = {};

  ApplicantParticulars: any[] = [];

  nextButt: boolean = false;
  fileReupload: boolean = false;
  createdBy: any;


  constructor(private service: commonService, public senddata: SendData, private router: Router, private fb: FormBuilder) {

  }

status:any;
  backButton: boolean = false;
  requestId:any;
  frids:any;
  heirarchyuserName:any;
  
  zone:any;
  ward:any;
  colony:any;
  planType:any;
  ngOnInit(): void {
    this.requestId = localStorage.getItem('requestid');
    this.frids = localStorage.getItem('frid');
    this.heirarchyuserName = localStorage.getItem('hierarchyUserName');
    this.fileprcessedDetail();
    this.buildForm();

    this.service.getButtonDetails(this.apiConstant.newFORM_VIEW, this.requestId).subscribe((data: any) => {
      console.log(data);

      this.createdBy = data.basicInfo.fileCreatedBy;
      this.status = data.basicInfo.status;

      if (data.basicInfo.status == COMMONCONSTANTS.Status_FileProcessed) {
        this.fileReupload = false;
        this.nextButt = true;
      } else if (data.basicInfo.status == COMMONCONSTANTS.Status_Rule_Violation_Error || data.basicInfo.status == COMMONCONSTANTS.Status_State_Laws_Error) {
        this.fileReupload = true;
        this.nextButt = false;
      } else {
        this.fileReupload = false;
        this.nextButt = false;
      }
      this.address = data.siteLocationDetails.address;
      this.blockNumber = data.siteLocationDetails.blockNumber;
      this.district = data.siteLocationDetails.district;
      this.state = data.siteLocationDetails.state;
      this.pinCode = data.siteLocationDetails.pinCode;
      this.landMark = data.siteLocationDetails.landMark;
      
      this.zone = data.siteLocationDetails.zone;
      this.ward = data.siteLocationDetails.ward;
      this.colony = data.siteLocationDetails.colony;


      this.currentStatus = data.basicInfo.status;
      this.senddata.status = data.basicInfo.currentStatus;
      if (this.currentStatus == "File Processed") {
        this.backButton = true;
      }

      if (data.basicInfo.natureOfProject == 1) {
        this.natureOfProject = "New";
      } else if (data.basicInfo.natureOfProject == 2) {
        this.natureOfProject = "Revised";
      }


      if (data.basicInfo.bCategory == 1) {
        this.bCategory = "Residential";
      } else if (data.basicInfo.bCategory == 2) {
        this.bCategory = "Commercial";
      } else if (data.basicInfo.bCategory == 3) {
        this.bCategory = "Industrial";
      } else if (data.basicInfo.bCategory == 40) {
        this.bCategory = "Other";
      }

      // this.natureOfProject = data.basicInfo.natureOfProject;
      // this.bCategory = data.basicInfo.bCategory;
      this.bSubCategory = data.basicInfo.buildingSubType;
      
      this.planType = data.basicInfo.planType;


      //   if (data.applicantDetails && data.applicantDetails.length > 0) {
      //     for (const applicant of data.applicantDetails) {
      //         this.aadharNum = applicant.aadharNum;
      //         this.name = applicant.name;
      //         this.contactNumber = applicant.contactNumber;
      //         this.email = applicant.email;
      //         this.dob = applicant.dob;

      //         if (applicant.primaryAddress) {
      //             this.primaryAddress = applicant.primaryAddress;
      //         }

      //         if (applicant.secondaryAddress) {
      //             this.secondaryAddress = applicant.secondaryAddress;
      //         }


      //         break;
      //     }
      // }



      this.ApplicantParticulars = [];

      if (data.applicantDetails && data.applicantDetails.length > 0) {
        data.applicantDetails.forEach((applicant: any) => {

          this.ApplicantParticulars.push({
            aadharNum: applicant.aadharNum,
            name: applicant.name,
            contactNumber: applicant.contactNumber,
            email: applicant.email,
            dob: applicant.dob,
            primaryAddress: applicant.primaryAddress,
            secondaryAddress: applicant.secondaryAddress
          });
        });
      }



      this.pArea = data.plotDetails.pArea;
      this.cArea = data.plotDetails.cArea;
      this.cAreaFar = data.plotDetails.cAreaFar;
      this.bHeight = data.plotDetails.bHeight;
      this.frontWidth = data.plotDetails.frontWidth;
      this.areaAffectedInRoadWidening = data.plotDetails.areaAffectedInRoadWidening;
      this.cPlot = data.plotDetails.cPlot;
      this.mVentilation = data.plotDetails.mVentilation;
      this.lcSetback = data.plotDetails.lcSetback;
      this.lcFar = data.plotDetails.lcFar;
      this.frId = data.plotDetails.frId;
      this.fileNo = data.plotDetails.fileNo;


      if (data.fileDocDetails && data.fileDocDetails.length > 0) {
        this.frName = data.fileDocDetails[0].frName;
      }

    });

  }

  next() {
    this.requestId = this.fileNo;
    this.frids = this.frId;
    this.router.navigate(['/SupportFileDocument']);
  }




  proff: boolean = true;
  buildForm() {
    this.supportForm = new FormGroup({
      DrawingFileCertificateName: this.fb.array([this.fileTypeForm()]),
    });


  }

  fileTypeForm() {
    return this.fb.group({
      docType: ['', Validators.required],
      docName: ['', Validators.required],
      docUniqueId: ['', Validators.required]
    });
  }
  drawingFileName: any = 'File name will come here';




  uploadDoc(event: any, arrayName: string, extensions = ['dwg', 'dfx']) {
    const fileData = event.target.files[0];
    const maxSize = 52428800;

    const fileExtension = fileData.name.split('.').pop()?.toLowerCase();
    if (!extensions.includes(fileExtension)) {
      alert('Please upload a file with DWG or DFX extension.');
      event.target.value = '';
      return;
    }

    console.log("File size:", fileData.size);
    if (fileData.size > maxSize) {
      alert('Please upload a file under ' + (maxSize / (1024 * 1024)) + ' MB.');
      event.target.value = '';
      return;
    }

    this.drawingFileName = fileData.name;

    const reader = new FileReader();
    reader.readAsDataURL(fileData);

    reader.onload = (event: any) => {
      const inputValue = event.target.result;

      const json = {
        "docFileName": fileData.name.split(".")[0],
        "docType": fileData.name.split(".")[1],
        "docByteStream": inputValue.split(",")[1],
        "docName": fileData.name.split(".")[0]
      };

      this.service.postService(this.apiConstant.downloadUUID, json).subscribe((res: any) => {
        console.log("data =================> ", res);
        if (!res.docUUID) {
          return;
        }

        const formArray = this.supportForm.get(arrayName) as FormArray | null;

        if (formArray) {
          formArray.at(0).patchValue({
            "docType": fileData.name,
            "docName": arrayName,
            "docUniqueId": res.docUUID,
            "docByteStream": inputValue.split(",")[1],
          });
        }

        console.log("uuid: " + res.docUUID);
      });
    };
  }
  checkFileType(event: any, extensions = ['dwg', 'dfx']) {
    const fileData = event.target.files[0];
    if (!fileData) return false;

    const ext = fileData.name.split('.').pop()?.toLowerCase();
    console.log(ext);

    if (!extensions.includes(ext)) {
      alert('File type is incorrect. Please upload a file with DWG or DFX extension.');
      return false;
    }

    const maxSize = 52428800;
    if (fileData.size > maxSize) {
      alert('File size must be below 50 MB.');
      return false;
    }

    return true;
  }



  dialog: boolean = false;
  datasave: boolean = false;
  hideSubmit: boolean = false;


  submit() {
    if (this.supportForm.invalid) {
      alert("please upload drawing file")
    }
    else {

      const request = {
        "fileNo": this.requestId,
        "frId": this.frids,
        "frName": this.supportForm.value.DrawingFileCertificateName[0].docName,
        "frUniqueNo": this.supportForm.value.DrawingFileCertificateName[0].docUniqueId,
        "frType": this.supportForm.value.DrawingFileCertificateName[0].docType
      };

      this.service.postService(this.apiConstant.doc_Re_Upload_Error, request).subscribe((res: any) => {
        console.log("data =================> ", res);

        if (res.httpStatus === "OK") {
          this.dialog = true;
          this.datasave = true;
          this.hideSubmit = true;

          this.heirarchyuserName = this.createdBy;
          this.senddata.dwgReupload = true;
          this.router.navigate(['/home']);

        } else {
          this.dialog = false;
          this.datasave = false;
          this.hideSubmit = false;
        }

      });

    }
  }

  ProcessedFileMessage:any;
  message:boolean=false;
  ProcessedFileDetails:any;
  FileDetails:any;
  fileprcessedDetail() {
    this.service.getDeptDashboard(this.apiConstant.FileProcessedDetails, this.frids).subscribe((res: any) => {
      console.log("data =================> ", res);

      if (res.httpStatus === "OK") {
        if(res.data.ProcessedFileDetails.length > 0){
        this.ProcessedFileDetails = res.data.ProcessedFileDetails;
        this.message = true;
        }else{
        this.ProcessedFileMessage = "Your File is Being Processing...";
        this.message = false;
        }
        this.FileDetails = res.data.FileDetails;
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

  downloadDwg(docUniqueId: string,fileName: string): void {
    let request: any = {
      "docUUID": docUniqueId
    };
  
    this.service.getHierarchyService(this.apiConstant.viewUUID, request).subscribe((data: any) => {
      console.log(docUniqueId, "asgjho");
      console.log(data);
      const byteString = atob(data.docByteStream);
      const byteArray = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([byteArray], { type: 'application/acad' }); // DWG MIME type
      const url = window.URL.createObjectURL(blob);
      
      // Create a link element to download the file
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}`; // Set the file name
      document.body.appendChild(a);
      a.click(); // Programmatically click the link to trigger the download
      document.body.removeChild(a); // Remove the link element after download
    });
  }
  

  back() {
    this.router.navigate(['/dashboard']);
  }
  
}







