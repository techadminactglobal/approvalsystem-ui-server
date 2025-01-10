import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Data, Router } from '@angular/router';
import { LockChanges } from '@ngrx/store-devtools/src/actions';
import { LogarithmicScale } from 'chart.js';
import { COMMONCONSTANTS } from 'src/app/CONSTANTS/constants';
import { SendData } from 'src/app/SendData';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';

@Component({
  selector: 'app-deparmental-request-view',
  templateUrl: './deparmental-request-view.component.html',
  styleUrls: ['./deparmental-request-view.component.scss']
})
export class DeparmentalRequestViewComponent {
  base64File: string | null = null;
  filename: string | null = null;
  supportForm: FormGroup;
  pdfFileName: any = 'File name will come here';
  letterUnqueId: any;
  letterName: any;
  dsOC: boolean = false;
  // optionalDocuments: string | null = null;


  constructor(private service: commonService, public senddata: SendData,
    private router: Router, private fb: FormBuilder, private sanitizer: DomSanitizer) {
    this.supportForm = this.fb.group({
      pdfFile: ['', Validators.required],

    });

  }
  referenceId: any;
  recheck: boolean = false;
  revise: boolean = false;
  reject: boolean = false;
  accept: boolean = false;
  apiConstant = API_PATH;
  viewWork: boolean = false;
  viewDsWork: boolean = false;
  viewPart: any;
  docUniqueId: any;
  dsPlinth: boolean = false;
  dsPlinthDept: boolean = false;
  disalePayNow:any;
  plinthDetails: any;
  documents: any[] = [];
  letterUniqueId: any;
  // letterName: any;
  requestId: any;
  frId: any;
  paymentFor: any;
  hierarchyId: any;
  hierarchyUserName: any;
  paymentType: any;
  rework: boolean = false;

  selectedZones: string[] = [];
  fileName: any[] = [];
  form!: FormGroup;
  status:any;

  ngOnInit() {
    this.requestId = localStorage.getItem('requestid');
    this.paymentType = localStorage.getItem('paymentType')
    this.hierarchyId = localStorage.getItem('hierarchyId');
    this.paymentFor = localStorage.getItem('paymentFor');
    this.frId = localStorage.getItem('frid');
    this.hierarchyUserName = localStorage.getItem('hierarchyUserName');
    this.disalePayNow = localStorage.setItem("disalePayNow",true.toString());

    setTimeout(() => {
    if (this.hierarchyId == "101" || this.hierarchyId == "201" || (this.hierarchyId == "301" && this.status == COMMONCONSTANTS.Status_Plinth_Inspection_Completed )|| (this.hierarchyId == "401" && this.status == COMMONCONSTANTS.Status_OC_Inspection_Completed )) {
      this.rework = true;
      this.fileName = ["leaseDeedCertificateName", "SaleDeedCertificateName", "sitePhotographCertificateName", "mutationFormCertificateName"]
      this.form = new FormGroup({
        zoneDetails: new FormControl(this.selectedZones)
      });
    }
    // if(this.hierarchyId == "301" || this.hierarchyId == "401"){
    //   this.revise =false;
    // }
  }, 100);

    this.referenceId = this.requestId;
    this.viewPart = this.paymentFor;
    console.log(this.referenceId);


    //OC
    let request = {
      "fileNo": this.requestId,
      "frId": this.frId
    }
    this.service.getDataService(this.apiConstant.OccupancyDetails, request).subscribe((res: any) => {
      console.log("**************", res);
      if (res.data == null) {
        return
      }

      this.plinthDetails = res.data.OccupanyCertificate[0];

      if (this.plinthDetails.status == "Occupancy Ds Pending") {
        this.dsOC = true;
      } else if (this.plinthDetails.status == "Occupancy Rejected") {
        this.dsOC = true;
      }
    });



    //plinth
    let requestPlinth = {
      "fileNo": this.requestId,
      "frId": this.frId
    }
    console.log(requestPlinth, "request plinth...");

    this.service.getDataService(this.apiConstant.PlinthDetails, requestPlinth).subscribe((res: any) => {
      console.log("**************plinth", res);
      if (res.data == null) {
        return
      }
      this.status = res.data.PlinthDetails[0].status;
      if (res.data.PlinthDetails[0].currentStatus == "103") {
        this.dsPlinth = true;
      } else if (res.data.PlinthDetails[0].currentStatus == "107") {
        this.dsPlinthDept = true;
      }
    });
    //****************************************** */


    //OC
    // let requestOC = {
    //   "fileNo": this.senddata.requestid,
    //   "frId": this.senddata.frid
    // }
    // console.log(requestPlinth, "request plinth...");

    // this.service.getDataService(this.apiConstant.OccupancyDetails, requestOC).subscribe((res: any) => {
    //   console.log("**************res", res);
    //   if (res.data == null) {
    //     return
    //   }
    //   if (res.data.OccupanyCertificate[0].currentStatus == 103) {
    //     this.dsPlinth = true;
    //   } else if (res.data.PlinthDetails[0].currentStatus == 107) {
    //     this.dsPlinthDept = true;
    //   }
    // });



    //****************************************** */


    setTimeout(() => {
      if (this.senddata.status == "35" || this.dsPlinthDept == true || this.dsOC == true) {
        this.viewWork = false;
        this.viewDsWork = true;
      }

      if (this.dsOC == true) {

        let request = {
          "fileNo": this.requestId,
          "frId": this.frId
        }
        this.service.getDataService(this.apiConstant.OccupancyDetails, request).subscribe((res: any) => {
          console.log("**************", res);
          if (res.data == null) {
            return
          }

          this.documents = res.data.supportivefile;
          this.plinthDetails = res.data.OccupanyCertificate[0];
          console.log(this.plinthDetails, "OC details..............");

          if (res.data.OccupanyCertificate[0].approvedLetter != null) {
            this.letterUnqueId = res.data.OccupanyCertificate[0].approvedLetter;
            this.letterName = "Approve Letter";
          } else if (res.data.OccupanyCertificate[0].rejectLetter != null) {
            this.letterUnqueId = res.data.OccupanyCertificate[0].rejectLetter
            this.letterName = "Reject Letter";
          }
        });


      } else if (this.dsPlinthDept == true) {

        let request = {
          "fileNo": this.requestId,
          "frId": this.frId
        }
        this.service.getDataService(this.apiConstant.PlinthDetails, request).subscribe((res: any) => {
          console.log("**************", res);
          if (res.data == null) {
            return
          }

          this.plinthDetails = res.data.PlinthDetails[0];
          console.log(this.plinthDetails, "plinth details......");

          if (this.plinthDetails.approvedLetter != null) {
            this.letterUnqueId = this.plinthDetails.approvedLetter;
            this.letterName = "Approve Letter";
          } else if (this.plinthDetails.rejectLetter != null) {
            this.letterUnqueId = this.plinthDetails.rejectLetter
            this.letterName = "Reject Letter";
          }

        });
      } else {


        let request: any = { "name": this.requestId }
        this.service.getDataService(this.apiConstant.GET_DETAILS, request).subscribe((data: any) => {
          console.log(data);

          console.log(data, "amanaryan........");
          if (data.consultantDetailModel.approvedLetter != null) {
            this.letterUnqueId = data.consultantDetailModel.approvedLetter;
            this.letterName = "Approve Letter";
          } else if (data.consultantDetailModel.rejectLetter != null) {
            this.letterUnqueId = data.consultantDetailModel.rejectLetter
            this.letterName = "Reject Letter";
          }
        });


        this.service.getButtonDetails(this.apiConstant.newFORM_VIEW, this.requestId).subscribe((data: any) => {
         
          if (data.basicInfo.status == COMMONCONSTANTS.Status_DSPending) {
            this.viewWork = false;
            this.viewDsWork = true;
          } else if(data.basicInfo.status == COMMONCONSTANTS.Status_Plinth_Inspection_Scheduled 
            || data.basicInfo.status == COMMONCONSTANTS.Status_OC_Inspection_Scheduled
          ){
            
              this.viewWork = false;
              this.viewDsWork = false; 
          }
          console.log(data, "amanaryan........");
          if (data.basicInfo.approvedLetter != null) {
            this.letterUnqueId = data.basicInfo.approvedLetter;
            this.letterName = "Approve Letter";
          } else if (data.basicInfo.rejectLetter != null) {
            this.letterUnqueId = data.basicInfo.rejectLetter
            this.letterName = "Reject Letter";
          }
        });
      }
    }, 1000);

    this.viewReferButton();
    this.viewButton();

  }

  isAllSelectedZones(): boolean {
    return this.selectedZones.length === this.fileName.length;
  }

  selectAllZones() {
    if (this.isAllSelectedZones()) {
      // If all zones are already selected, unselect all
      this.selectedZones = [];
    } else {
      // Otherwise, select all zones
      this.selectedZones = [...this.fileName];
    }

    // Update the form control with the selected zones
    this.form.get('zoneDetails')?.setValue(this.selectedZones);
  }

  referBackArr: { value: string, viewValue: string }[] = [];

  viewReferButton() {
    this.service.getButtonDetails(this.apiConstant.VIEW_REFERBACK_BUTTON, this.referenceId).subscribe((data: any) => {
      console.log(data);
      data.data.forEach((item: { hierachyRole: any; deptType: any; }) => {
        this.referBackArr.push({ value: item.hierachyRole, viewValue: item.deptType });
      });

      console.log(this.referBackArr, "hsdighseiorhgedo");
    });
  }

  viewButton() {
    console.log(this.referenceId);
    this.service.getButtonDetails(this.apiConstant.VIEW_BUTTON, this.referenceId).subscribe((data: any) => {
      console.log(data, "aman");
      if (data.httpStatus == 'OK') {
        console.log(this.hierarchyId, "hierarchyId");
        console.log(data.data.asignTo, "asignTo");
        if (data.data.asignTo == this.hierarchyId && data.data.hierarchyStatus == "Assigned" || data.data.hierarchyStatus == "Start") {
          this.viewWork = true;

        }
        this.recheck = data.data.recheck;
        this.accept = data.data.accept;
        this.reject = data.data.reject;
        this.revise = data.data.revise;
      }
    });
  }

  deptForm = new FormGroup({
    hierachyRemark: new FormControl('', [Validators.required]),
    referenceDocuments: new FormControl('')
  });

  AcceptData() {
    if (this.deptForm.invalid) {
      alert("Please fill all the details properly..");
      return;
    } else {
      let request: any = {
        "referenceId": this.requestId,
        "hierachyUserName": this.hierarchyUserName,
        "hierachyRemark": this.deptForm.value.hierachyRemark,
        "hierachyRoleId": this.hierarchyId,
        "docName": this.docName,
        "docUUID": this.docUUID,
        "docType": this.docType,
        "zoneId":localStorage.getItem("zoneId")
      }

      console.log(request);


      this.service.getHierarchyService(this.apiConstant.ACCEPT_API, request).subscribe((data: any) => {
        console.log(data);
        if (data.httpStatus == 'OK') {
          //ds letter generate
          if (this.dsPlinth == true) {
            // this.paymentType = "plinthNew";
            localStorage.setItem('paymentType', "plinthNew");
            // this.requestId = this.requestId;
            // this.frId = this.frId;
            this.router.navigate(['/dsLetter']);
            // setTimeout(() => {
            //   this.router.navigate(['/departmentDashboard']);
            // }, 3000); 
          } else {
            this.router.navigate(['/departmentDashboard']);
          }
        }
      });
    }
  }
  RecheckData(value: string) {
    console.log(value, "valuehasbh");

    if (this.deptForm.invalid) {
      alert("Please fill all the details properly..");
      return;
    } else {
      console.log(this.senddata.hierarchyUserName);
      let request: any = {
        "referenceId": this.requestId,
        "hierachyUserName": this.hierarchyUserName,
        "hierachyRemark": this.deptForm.value.hierachyRemark,
        "hierachyRoleId": this.hierarchyId,
        "referBackTo": value,
        "docName": this.docName,
        "docUUID": this.docUUID,
        "docType": this.docType
      }

      this.service.getHierarchyService(this.apiConstant.RECHECK_API, request).subscribe((data: any) => {
        console.log(data);
        if (data.httpStatus == 'OK') {
          this.router.navigate(['/departmentDashboard']);
        }
      });
    }
  }

  RejectData() {
    if (this.deptForm.invalid) {
      alert("Please fill all the details properly..");
      return;
    } else {
      let request: any = {
        "referenceId": this.requestId,
        "hierachyUserName": this.hierarchyUserName,
        "hierachyRemark": this.deptForm.value.hierachyRemark,
        "hierachyRoleId": this.hierarchyId,
        "docName": this.docName,
        "docUUID": this.docUUID,
        "docType": this.docType
      }

      this.service.getHierarchyService(this.apiConstant.REJECT_API, request).subscribe((data: any) => {
        console.log(data);
        if (data.httpStatus == 'OK') {
          this.router.navigate(['/departmentDashboard']);
        }
      });
    }
  }

  ReviseData() {
    if (this.form.value.zoneDetails.length === 0) {
      alert("Please fill all the details properly..");
      return;
    } else if (this.deptForm.invalid) {
      alert("Please fill all the details properly..");
      return;
    } else {

      let listdocument = [];
      let zoneDetails = this.form.get('zoneDetails')?.value;
      for (let i = 0; i < zoneDetails.length; i++) {
        let document = {
          docName: zoneDetails[i]
        };
        listdocument.push(document);
      }

      let request: any = {
        "referenceId": this.requestId,
        "hierachyUserName": this.hierarchyUserName,
        "hierachyRemark": this.deptForm.value.hierachyRemark,
        "hierachyRoleId": this.hierarchyId,
        "docName": this.docName,
        "docUUID": this.docUUID,
        "docType": this.docType,
        "listdocument": listdocument
      }
      this.service.getHierarchyService(this.apiConstant.REWORK_API, request).subscribe((data: any) => {
        console.log(data);
        if (data.httpStatus == 'OK') {
          this.router.navigate(['/departmentDashboard']);
        }
      });
    }
  }

  backtodeptdashboarddasbhoard() {
    // Define the list of valid hierarchyIds
    const validHierarchyIds = ['201', '202', '301', '302', '401', '402', '403','101'];
  
    // Check if hierarchyId matches any in the valid list
    if (validHierarchyIds.includes(this.hierarchyId)) {
      // Navigate to deptRequestView if hierarchyId matches
      this.router.navigate(['/departmentDashboard']);
    } 
  }

  referenceDocuments: any = 'File name will come here';
  refrencePreview: SafeResourceUrl | null = null; // Using SafeResourceUrl for PDF
  isrefrencePreviewModalOpen: boolean = false;
  refrenceFileType: string | null = null;
  approvereferenceDocuments: any = 'File name will come here';
  approverefrencePreview: SafeResourceUrl | null = null; // Using SafeResourceUrl for PDF
  isapproveisrefrencePreviewModalOpen: boolean = false;
  approverefrenceFileType: string | null = null;
  proff: boolean = false;
  docUUID: any;
  docName: any;
  docType: any;

  uploadDoc(event: any, arrayName: string) {
    const fileData = event.target.files[0];
    const allowedExtensions = ['pdf', 'jpeg'];
    const maxSize = 10485760;

    const fileExtension = fileData.name.split('.').pop()?.toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      alert('Please upload a file with PDF or JPEG extension.');
      event.target.value = '';
      return;
    }

    console.log("File size:", fileData.size);
    if (fileData.size > maxSize) {
      event.target.value = '';
      alert('Please upload a file under ' + (maxSize / (1024 * 1024)) + ' MB.');
      return;
    }

    this.referenceDocuments = fileData.name;

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event: any) => {
      const inputValue = event.target.result;
      if (arrayName === 'referenceDocuments') {
        this.refrenceFileType = fileExtension; // Set the file type

        // For PDFs, create a Blob URL
        if (fileExtension === 'pdf') {
          this.refrencePreview =
            this.sanitizer.bypassSecurityTrustResourceUrl(
              URL.createObjectURL(fileData)
            ); // Safe URL for PDF
        } else {
          this.refrencePreview = inputValue; // Base64 for images
        }
      }


      const json = {
        "docFileName": fileData.name.split(".")[0],
        "docType": fileData.name.split(".")[1],
        "docByteStream": inputValue.split(",")[1],
        "docName": fileData.name.split(".")[0]
      };

      this.service.postService(this.apiConstant.downloadUUID, json).subscribe((res: any) => {
        console.log("data =================> ", res);
        this.docName = arrayName,
          this.docType = fileData.name.split(".")[0] + "." + fileData.name.split(".")[1],
          this.docUUID = res.docUUID

        if (!res.docUUID) {
          return;
        }
      });
    };
  }


  checkFileType(event: any, extensions = ['jpg', 'jpeg', 'pdf']) {
    var fileData = event.target.files[0];
    if (!fileData) return false;
    var ext = fileData.name.split('.').slice(-1)[0];
    console.log(ext);

    if (!extensions.includes(ext)) {
      alert('File type is incorrect.');
      return false;
    }
    if (fileData.size > 10485760) {
      alert('File Size must be below 10MB.');
      return false;
    }
    return true;
  }

  togglerefrencePreview() {
    this.isrefrencePreviewModalOpen = !this.isrefrencePreviewModalOpen;
  }

  // Close the educational certificate preview modal
  closerefrencePreviewModal() {
    this.isrefrencePreviewModalOpen = false;
  }

  // Delete the educational certificate and reset the preview
  deleterefrenceCertificate() {
    this.refrencePreview = null;
    this.referenceDocuments = 'File name will come here';
    // Reset form control and close modal
    this.isrefrencePreviewModalOpen = false;
  }



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


  uploadPDF(event: any, arrayName: string) {
    const fileData = event.target.files[0];
    const allowedExtensions = ['pdf'];
    const maxSize = 10485760;

    const fileExtension = fileData.name.split('.').pop()?.toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      alert('Please upload a file with PDF extension.');
      event.target.value = '';
      return;
    }

    if (fileData.size > maxSize) {
      alert('Please upload a file under ' + (maxSize / (1024 * 1024)) + ' MB.');
      event.target.value = '';
      return;
    }

    this.pdfFileName = fileData.name;

    const reader = new FileReader();
    reader.readAsDataURL(fileData);

    reader.onload = (event: any) => {
      const inputValue = event.target.result;
      if (arrayName === 'pdfFile') {
        this.approverefrenceFileType = fileExtension; // Set the file type

        // For PDFs, create a Blob URL
        if (fileExtension === 'pdf') {
          this.approverefrencePreview =
            this.sanitizer.bypassSecurityTrustResourceUrl(
              URL.createObjectURL(fileData)
            ); // Safe URL for PDF
        } else {
          this.approverefrencePreview = inputValue; // Base64 for images
        }
      }

      const json = {
        "docFileName": fileData.name.split(".")[0],
        "docType": fileData.name.split(".")[1],
        "docByteStream": inputValue.split(",")[1],
        "docName": fileData.name.split(".")[0]
      };


      this.service.postService(this.apiConstant.downloadUUID, json).subscribe((res: any) => {
        console.log("Response from postService:", res);
        if (!res.docUUID) {
          console.warn("No docUUID found in response.");
          return;
        }

        console.log("uuid: " + res.docUUID);

        // const formArray = this.supportForm.get(arrayName) as FormArray | null;
        const formArray = this.supportForm.get(arrayName) as FormArray;

        if (formArray.length > 0) {
          const formGroup = formArray.at(0) as FormGroup;
          formGroup.patchValue({
            "docType": fileData.name.split(".")[0] + "." + fileData.name.split(".")[1],
            "docName": arrayName,
            "docUniqueId": res.docUUID,
            "docByteStream": inputValue.split(",")[1],
          });
        }
        this.docUUID = res.docUUID;
        console.log("uuidfsdfsd: " + res.docUUID);
      }, error => {
        console.error("Error in postService:", error);
      });
    };
  }
  //ds letter
  togglerefrenceapprovePreview() {
    this.isapproveisrefrencePreviewModalOpen = !this.isapproveisrefrencePreviewModalOpen;
  }

  // Close the educational certificate preview modal
  closerefrenceapprovePreviewModal() {
    this.isapproveisrefrencePreviewModalOpen = false;
  }

  // Delete the educational certificate and reset the preview
  deleterefrenceapproveCertificate() {
    this.approverefrencePreview = null;
    this.pdfFileName = 'File name will come here';
    // Reset form control and close modal
    this.isapproveisrefrencePreviewModalOpen = false;
  }






  //   uploadPDF(event: any) {
  //     const fileData = event.target.files[0];
  //     const maxSize = 10485760; 

  //     const fileExtension = fileData.name.split('.').pop()?.toLowerCase();
  //     if (fileExtension !== 'pdf') {
  //         alert('Please upload a file with a PDF extension.');
  //         event.target.value = '';
  //         return;
  //     }

  //     if (fileData.size > maxSize) {
  //         alert('Please upload a file under ' + (maxSize / (1024 * 1024)) + ' MB.');
  //         event.target.value = '';
  //         return;
  //     }

  //     this.pdfFileName = fileData.name;

  //     const reader = new FileReader();
  //     reader.readAsDataURL(fileData);

  //     reader.onload = (event: any) => {
  //         const inputValue = event.target.result;

  //         const json = {
  //             docFileName: fileData.name.split('.')[0],
  //             docType: 'pdf',
  //             docByteStream: inputValue.split(',')[1],
  //             docName: fileData.name.split('.')[0]
  //         };




  //         this.service.postService(this.apiConstant.downloadUUID, json).subscribe((res: any) => {
  //             console.log('data =================> aman', res);
  //             if (!res.docUUID) {
  //               console.log('uuid: ' + res.docUUID);
  //                 return;
  //             }else {
  //               console.log('docUUID not found in response:', res);
  //           }
  //             // const formArray = this.supportForm.get('pdfFile') as FormArray; 
  //             // if (formArray) {
  //             //   formArray.at(0).patchValue({
  //             //     "docType": fileData.name.split(".")[0] + "." + fileData.name.split(".")[1],
  //             //     "docName": 'pdfFile',
  //             //     "docUniqueId": res.docUUID,
  //             //     "docByteStream": inputValue.split(",")[1],
  //             //   });
  //             // }



  //             this.supportForm.patchValue({
  //                 pdfFile: {
  //                     "docType": fileData.name.split(".")[0] + "." + fileData.name.split(".")[1],
  //                     "docName": 'pdfFile',
  //                     "docUniqueId": res.docUUID,
  //                     "docByteStream": inputValue.split(",")[1],

  //                 }
  //             });

  //             console.log('uuid: ' + res.docUUID);
  //             this.docUniqueId = res.docUUID;
  //         });
  //     };
  // }


  checkFileTypee(event: any) {
    const fileData = event.target.files[0];
    if (!fileData) return false;

    const ext = fileData.name.split('.').pop()?.toLowerCase();
    console.log(ext);

    if (ext !== 'pdf') {
      alert('File type is incorrect. Please upload a file with a PDF extension.');
      return false;
    }

    const maxSize = 10485760;
    if (fileData.size > maxSize) {
      alert('File size must be below 10 MB.');
      return false;
    }

    return true;
  }

  fileData: any;
  submit() {

    if (this.supportForm.invalid) {
      alert("Please fill all the details properly..");
      return;
    } else {

      let json1 = {};
      if (this.dsOC == true) {
        json1 = {
          "fileNo": this.requestId,
          "frId": this.frId,
          "letterUinqueId": this.docUUID,
          "letterType": "OCAcceptDS"
        };
      } else if (this.dsPlinthDept == true) {
        json1 = {
          "fileNo": this.requestId,
          "frId": this.frId,
          "letterUinqueId": this.docUUID,
          "letterType": "plinthAcceptDS"
        };
      } else if (this.paymentFor == "fileNew") {
        json1 = {
          "fileNo": this.requestId,
          "frId": this.frId,
          "letterUinqueId": this.docUUID,
          "letterType": "Letter Accepted DS"
        };

      } else {
        json1 = {
          "userName": this.requestId,
          "letterUinqueId": this.docUUID,
          "letterType": "Letter Accepted DS"
        };
      }
      console.log(json1, "json data...");

      this.service.postService(this.apiConstant.LetterSaveAfterDS, json1).subscribe((res: any) => {
        console.log("vishal data =================> ", res);
        if (res.httpStatus == 'OK') {
          this.router.navigate(['/departmentDashboard']);

        }

      });
    }

  }


  openCertificatePdf(event: Event): void {
    event.stopPropagation();

    let request: any = {
      "referenceId": this.requestId,
      "docUUID": this.letterUnqueId
    };

    this.service.getHierarchyService(this.apiConstant.viewUUID, request).subscribe((data: any) => {
      const byteString = atob(data.docByteStream);
      const byteArray = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'certificate.pdf';
      a.click();

      window.URL.revokeObjectURL(url);
    });
  }




}































