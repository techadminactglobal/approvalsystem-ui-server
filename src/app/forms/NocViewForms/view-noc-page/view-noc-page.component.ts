import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { COMMONCONSTANTS } from 'src/app/CONSTANTS/constants';
import { SendData } from 'src/app/SendData';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';
// import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-noc-page',
  templateUrl: './view-noc-page.component.html',
  styleUrls: ['./view-noc-page.component.scss']
})
export class ViewNocPageComponent {

  constructor(
    private service: commonService,

    private router: Router,private fb: FormBuilder,
    public senddata: SendData,private sanitizer: DomSanitizer) {
      this.supportForm = this.fb.group({
        pdfFile: ['', Validators.required],
  
      }); }
      dsPlinthDept: boolean = false;
      dsOC: boolean = false;
      paymentFor:any;
      supportForm!: FormGroup;

  apiConstant = API_PATH;
  fireForm: boolean = false;

 
  viewHistoryButton: boolean = false;
  viewPaymentButton: boolean = false;
  viewLetter: boolean = false;
  letterUniqueId: any;
  letterName: any;
  requestId: any;
  frids: any;
  ownerCall: any;
  disalePayNow:any;
  rework: Boolean = false;
  leaseDeedCertificateName: Boolean = false;
  SaleDeedCertificatename: Boolean = false;
  sitePhotographCertificatename: Boolean = false;
  mutitionFormCertificatename: Boolean = false;
  leaseDeedName: any = 'File name will come here';
  SaleDeedName: any = 'File name will come here';
  sitePhotographName: any = 'File name will come here';
  mutitionFormName: any = 'File name will come here';
  educationalPreview: SafeResourceUrl | null = null; // Using SafeResourceUrl for PDF
  isEducationalPreviewModalOpen: boolean = false;
  educationalFileType: string | null = null;
  saleDeedPreview: SafeResourceUrl | null = null;
  isSaleDeedPreviewModalOpen: boolean = false;
  saleDeedFileType: string | null = null;
  sitePhotographNamePreview: SafeResourceUrl | null = null;
  issitePhotographNameModalOpen: boolean = false;
  sitePhotographNameFileType: string | null = null;
  mutitionFormNamePreview: SafeResourceUrl | null = null;
  ismutitionFormNameModalOpen: boolean = false;
  mutitionFormNameFileType: string | null = null;

  buildForm() {
    this.supportForm = new FormGroup({
      DrawingFileCertificateName: this.fb.array([this.fileTypeForm()]),
    });
    this.supportForm = new FormGroup({
      leaseDeedCertificateName: this.fb.array(
        [this.fileTypeForm()],
        [Validators.required]
      ),
      SaleDeedCertificatename: this.fb.array(
        [this.fileTypeForm()],
        [Validators.required]
      ),
      sitePhotographCertificatename: this.fb.array(
        [this.fileTypeForm()],
        [Validators.required]
      ),
      mutitionFormCertificatename: this.fb.array(
        [this.fileTypeForm()],
        [Validators.required]
      ),
      // leaseRemarks: new FormControl(''),
      // saleRemark: new FormControl(''),
      // siteRemark: new FormControl(''),
      // mutitionRemark: new FormControl(''),
      otherRemark: new FormControl(''),

    });

    this.subscribeToRemarkChanges('leaseRemarks', 'leaseDeedCertificateName');
    this.subscribeToRemarkChanges('saleRemark', 'SaleDeedCertificatename');
    this.subscribeToRemarkChanges(
      'siteRemark',
      'sitePhotographCertificatename'
    );
    this.subscribeToRemarkChanges(
      'mutitionRemark',
      'mutitionFormCertificatename'
    );
    // this.subscribeToRemarkChanges('photographRemark', 'photograpFormCertificatename');
    // this.subscribeToRemarkChanges('photoIdRemark', 'photoIdCertificatename');
    // this.subscribeToRemarkChanges('companyIdRemark', 'companyIdCertificatename');
    // this.subscribeToRemarkChanges('otherRemark', 'docDetailsModel');
  }

  private subscribeToRemarkChanges(
    remarkControlName: string,
    formArrayName: string
  ): void {
    const remarkControl: FormControl | null = this.supportForm.get(
      remarkControlName
    ) as FormControl;
    const formArray: FormArray | null = this.supportForm.get(
      formArrayName
    ) as FormArray;

    if (remarkControl && formArray) {
      remarkControl.valueChanges.subscribe((value) => {
        formArray.controls.forEach((control) => {
          control.get('remark')?.setValue(value);
        });
      });
    } else {
      console.error(
        `Remark control or FormArray not found for ${remarkControlName}`
      );
    }
  }

  // fileTypeForm() {
  //   return this.fb.group({
  //     docType: [''],
  //     docName: [''],
  //     docUniqueId: [''],
  //     remark: [''],
  //   });
  // }
  uploadDoc(
    event: any,
    arrayName: string,
    extensions = ['jpeg', 'jpg', 'pdf']
  ) {
    const fileData = event.target.files[0];
    let allowedExtensions: string[];
    let maxSize: number;

    if (
      arrayName === 'leaseDeedCertificateName' ||
      arrayName === 'SaleDeedCertificatename' ||
      arrayName === 'sitePhotographCertificatename' ||
      arrayName === 'mutitionFormCertificatename' ||
      arrayName === 'photoIdCertificatename' ||
      arrayName === 'companyIdCertificatename' ||
      arrayName === 'docDetailsModel'
    ) {
      allowedExtensions = ['pdf', 'jpeg'];
      maxSize = 10485760;
    } else if (arrayName === 'photograpFormCertificatename') {
      allowedExtensions = ['jpeg', 'jpg'];
      maxSize = 2097152;
    } else {
      allowedExtensions = ['jpeg', 'jpg'];
      maxSize = 2097152;
    }

    const fileExtension = fileData.name.split('.').pop()?.toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      if (
        arrayName === 'leaseDeedCertificateName' ||
        arrayName === 'SaleDeedCertificatename' ||
        arrayName === 'sitePhotographCertificatename' ||
        arrayName === 'mutitionFormCertificatename' ||
        arrayName === 'photograpFormCertificatename' ||
        arrayName === 'photoIdCertificatename' ||
        arrayName === 'companyIdCertificatename' ||
        arrayName === 'docDetailsModel'
      ) {
        alert('Please upload a file with PDF or JPEG extension.');
      } else {
        alert('Please upload a file with JPG or JPEG extension.');
      }
      event.target.value = '';
      return;
    }

    console.log('File size:', fileData.size);
    if (fileData.size > maxSize) {
      event.target.value = '';
      alert('Please upload a file under ' + maxSize / (1024 * 1024) + ' MB.');
      return;
    }

    if (arrayName == 'leaseDeedCertificateName') {
      this.leaseDeedName =
        fileData.name.split('.')[0] + fileData.name.split('.')[1];
      // this.educationalPreview = "true"
    } else if (arrayName == 'SaleDeedCertificatename') {
      this.SaleDeedName =
        fileData.name.split('.')[0] + fileData.name.split('.')[1];
    } else if (arrayName == 'sitePhotographCertificatename') {
      this.sitePhotographName =
        fileData.name.split('.')[0] + fileData.name.split('.')[1];
    } else if (arrayName == 'mutitionFormCertificatename') {
      this.mutitionFormName =
        fileData.name.split('.')[0] + fileData.name.split('.')[1];
    }
    if (fileData.size > 15728640) {
      event.target.value = '';
      alert('Please Upload under 2 MB File');
      return;
    }
    this.supportForm.get(['deedDetails', arrayName])?.reset();
    this.supportForm.get(['supportForm', arrayName])?.reset();
    this.supportForm.get(['ownerDetails', arrayName])?.reset();
    this.supportForm.get(['companyDetails', arrayName])?.reset();
    // this.supportForm.get(['otherDetails', arrayName])?.reset();
    this.supportForm.get(['docDetailsModel', arrayName])?.reset();

    if (!this.checkFileType(event, extensions)) {
      event.target.value = '';
      this.supportForm.get(['deedDetails', arrayName])?.reset();
      this.supportForm.get(['supportForm', arrayName])?.reset();

      this.supportForm.get(['ownerDetails', arrayName])?.reset();
      this.supportForm.get(['companyDetails', arrayName])?.reset();
      this.supportForm.get(['docDetailsModel', arrayName])?.reset();
      // this.supportForm.get(['otherDetails', arrayName])?.reset();
      return;
    }
    if (arrayName === 'educationalCertificatename') {
      this.leaseDeedName = fileData.name;
    } else if (arrayName === 'SaleDeedCertificatename') {
      this.SaleDeedName = fileData.name;
    } else if (arrayName === 'sitePhotographCertificatename') {
      this.sitePhotographName = fileData.name;
    } else if (arrayName === 'mutitionFormCertificatename') {
      this.mutitionFormName = fileData.name;
    }

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event: any) => {
      const inputValue = event.target.result;
      // Handle preview for educational certificate
      if (arrayName === 'leaseDeedCertificateName') {
        this.educationalFileType = fileExtension; // Set the file type

        // For PDFs, create a Blob URL
        if (fileExtension === 'pdf') {
          this.educationalPreview =
            this.sanitizer.bypassSecurityTrustResourceUrl(
              URL.createObjectURL(fileData)
            ); // Safe URL for PDF
        } else {
          this.educationalPreview = inputValue; // Base64 for images
        }
      }
      if (arrayName === 'SaleDeedCertificatename') {
        this.saleDeedFileType = fileExtension; // Set the file type

        // For PDFs, create a Blob URL
        if (fileExtension === 'pdf') {
          this.saleDeedPreview = this.sanitizer.bypassSecurityTrustResourceUrl(
            URL.createObjectURL(fileData)
          ); // Safe URL for PDF
        } else {
          this.saleDeedPreview = inputValue; // Base64 for images
        }
      }
      if (arrayName === 'sitePhotographCertificatename') {
        this.sitePhotographNameFileType = fileExtension; // Set the file type

        // For PDFs, create a Blob URL
        if (fileExtension === 'pdf') {
          this.sitePhotographNamePreview =
            this.sanitizer.bypassSecurityTrustResourceUrl(
              URL.createObjectURL(fileData)
            ); // Safe URL for PDF
        } else {
          this.sitePhotographNamePreview = inputValue; // Base64 for images
        }
      }
      if (arrayName === 'mutitionFormCertificatename') {
        this.mutitionFormNameFileType = fileExtension; // Set the file type

        // For PDFs, create a Blob URL
        if (fileExtension === 'pdf') {
          this.mutitionFormNamePreview =
            this.sanitizer.bypassSecurityTrustResourceUrl(
              URL.createObjectURL(fileData)
            ); // Safe URL for PDF
        } else {
          this.mutitionFormNamePreview = inputValue; // Base64 for images
        }
      }

      const json = {
        docFileName: fileData.name.split('.')[0],
        docType: fileData.name.split('.')[1],
        docByteStream: inputValue.split(',')[1],
        docName: fileData.name.split('.')[0],
      };

      this.service
        .postService(this.apiConstant.downloadUUID, json)
        .subscribe((res: any) => {
          console.log('data =================> ', res);
          if (!res.docUUID) {
            return;
          }

          const formArray = this.supportForm.get(arrayName) as FormArray | null;

          if (formArray) {
            formArray.at(0).patchValue({
              docType:
                fileData.name.split('.')[0] + '.' + fileData.name.split('.')[1],
              docName: arrayName,
              docUniqueId: res.docUUID,
              docByteStream: inputValue.split(',')[1],
            });
          }

          console.log('uuid: ' + res.docUUID);
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
    if (fileData.size > 15728640) {
      alert('File Size must be below 15MB.');
      return false;
    }
    return true;
  }

  toggleEducationalPreview() {
    this.isEducationalPreviewModalOpen = !this.isEducationalPreviewModalOpen;
  }

  // Close the educational certificate preview modal
  closeEducationalPreviewModal() {
    this.isEducationalPreviewModalOpen = false;
  }

  // Delete the educational certificate and reset the preview
  deleteEducationalCertificate() {
    this.educationalPreview = null;
    this.leaseDeedName = 'File name will come here';
    // Reset form control and close modal
    this.isEducationalPreviewModalOpen = false;
  }
  // Toggle modal visibility for educational preview
  toggleEducationalPreviews() {
    this.isSaleDeedPreviewModalOpen = !this.isSaleDeedPreviewModalOpen;
  }

  ///////mution type

  toggleEducationalPreviewsitemutation() {
    this.ismutitionFormNameModalOpen = !this.ismutitionFormNameModalOpen;
  }

  // Close the educational certificate preview modal
  closeEducationalPreviewModalsitemutation() {
    this.ismutitionFormNameModalOpen = false;
  }

  // Close the educational certificate preview modal
  closeEducationalPreviewModals() {
    this.isSaleDeedPreviewModalOpen = false;
  }

  ////site photo grapg
  toggleEducationalPreviewsite() {
    this.issitePhotographNameModalOpen = !this.issitePhotographNameModalOpen;
  }

  // Close the educational certificate preview modal
  closeEducationalPreviewModalsite() {
    this.issitePhotographNameModalOpen = false;
  }

  // Delete the educational certificate and reset the preview
  deleteEducationalCertificatesite() {
    this.sitePhotographNamePreview = null;
    this.sitePhotographName = 'File name will come here';
    // Reset form control and close modal
    this.issitePhotographNameModalOpen = false;
  }
  // Delete the educational certificate and reset the preview
  deleteEducationalCertificates() {
    this.saleDeedPreview = null;
    this.SaleDeedName = 'File name will come here';
    // Reset form control and close modal
    this.isSaleDeedPreviewModalOpen = false;
  }

  // Delete the educational certificate and reset the preview
  deleteEducationalCertificatesitemutation() {
    this.mutitionFormNamePreview = null;
    this.mutitionFormName = 'File name will come here';
    // Reset form control and close modal
    this.ismutitionFormNameModalOpen = false;
  }

  deptCall:boolean = false;
  ngOnInit(): void {
    this.requestId = localStorage.getItem('requestid');
    this.frids = localStorage.getItem('frid');
    this.ownerCall = localStorage.getItem("ownerCall");
    this.ownerCall = this.ownerCall == null ? 'false' : this.ownerCall;
    this.deptCall = localStorage.getItem("architectView") === "true";
    this.disalePayNow = localStorage.getItem("disalePayNow");
  
    this.userName = this.requestId;
    this.service.getButtonDetails(this.apiConstant.newFORM_VIEW, this.requestId).subscribe((data: any) => {
      if (data.basicInfo.status == COMMONCONSTANTS.Status_InitialDepositedAssigned1hierarchy || data.basicInfo.status == COMMONCONSTANTS.Status_PaymentCompleted
        || data.basicInfo.status == COMMONCONSTANTS.Status_DSPending) {
        this.viewHistoryButton = true;
        this.viewPaymentButton = false;
      } else if (data.basicInfo.status == COMMONCONSTANTS.Status_PendingPayment) {
        this.viewHistoryButton = true;
        this.viewPaymentButton = true;
      } else if (data.basicInfo.status == COMMONCONSTANTS.Status_NocFilled || data.basicInfo.status == COMMONCONSTANTS.Status_Final_Form_Submit) {
        this.viewHistoryButton = false;
        this.viewPaymentButton = true;
      } else {
        this.viewHistoryButton = true;
        this.viewPaymentButton = false;
      }
// <<<<<<< HEAD
//       if(data.basicInfo.status == COMMONCONSTANTS.Status_DS_Pending_Architect){
//        this.viewLetter = true;
//       }else{
//         this.viewLetter = false;
//       }

//       if(data.basicInfo.approvedLetter != null){
//         this.letterUniqueId = data.basicInfo.approvedLetter;
//         this.letterName = "Approve Letter";
//       }else if(data.basicInfo.rejectLetter != null){
//         this.letterUniqueId =data.basicInfo.rejectLetter
// =======
      if (data.basicInfo.status == COMMONCONSTANTS.Status_DSAppliedRequestApproved || data.basicInfo.status == COMMONCONSTANTS.Status_DS_Pending_Architect) {
        this.viewLetter = true;
      } else {
        this.viewLetter = false;
      }

      if (data.basicInfo.status == COMMONCONSTANTS.Status_Refer_Back_to_Architect) {

        this.service.getButtonDetails(this.apiConstant.supportFile_View, this.requestId).subscribe((data: any) => {
          console.log(data, "ppp...");
          this.buildForm();
          data.forEach((doc: any) => {
            if (doc.docName === "leaseDeedCertificateName" && doc.modificationRequired === "yes") {
              this.leaseDeedCertificateName = true;
            } else if (doc.docName === "SaleDeedCertificatename" && doc.modificationRequired === "yes") {
              this.SaleDeedCertificatename = true;
            } else if (doc.docName === "sitePhotographCertificatename" && doc.modificationRequired === "yes") {
              this.sitePhotographCertificatename = true;
            } else if (doc.docName === "mutitionFormCertificatename" && doc.modificationRequired === "yes") {
              this.mutitionFormCertificatename = true;
            } else {

            }
          });
          console.log(this.leaseDeedCertificateName, this.SaleDeedCertificatename, this.sitePhotographCertificatename, this.mutitionFormCertificatename, "data need to modified");

        });
        
          this.rework = true;
      }

      if (data.basicInfo.approvedLetter != null) {
        this.letterUniqueId = data.basicInfo.letterApprovedDs;
        this.letterName = "Approve Letter";
      } else if (data.basicInfo.rejectLetter != null) {
        this.letterUniqueId = data.basicInfo.rejectLetterDs
// >>>>>>> 8cdf48347b3bdb672b6f156429caa00a19549b05
        this.letterName = "Reject Letter";
      }

    });


    this.fireDetails();
    this.viewPaymentHistory();
    this.viewHierachyHistory();
    this.viewNocHistory();
  }

  fireDetails() {
    let request = '?fileNo=' + this.requestId + '&frId=' + this.frids + '&callFor=' + this.senddata.callFrom;
    this.service.getButtonDetails(this.apiConstant.ViewNocFire, request).subscribe((data: any) => {
      console.log(data, "response from api...");
      if (data.httpStatus === "NOT_FOUND") {
        this.fireForm = true;
      } else if (data.httpStatus == "OK") {
        this.fireForm = false;
      }
    });
  }


  ViewNocFire() {
    this.router.navigate(['/viewFire']);
  }

  payment() {
    this.requestId = this.requestId,
      this.frids = this.frids;
    // this.senddata.paymentType = "fileNew"
    localStorage.removeItem('paymentType');
    localStorage.setItem('paymentType', 'fileNew');
    this.router.navigate(['/payment']);
  }

  hierarchyHistoryData: any;
  hierarchyModule: any;
  referenceId: any;
  userName: any;
  docUUID: any;
  history: boolean = false;

  viewHierachyHistory() {
    this.history = true;
    console.log(this.history);
    this.service.getButtonDetails(this.apiConstant.HIERARCHY_HISTORY, this.userName).subscribe((data: any) => {
      console.log(data, "ashish");

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


  nocHistoryData: any;

  viewNocHistory() {
    this.service.getButtonDetails(this.apiConstant.NOC_HISTORY, this.userName).subscribe((data: any) => {
      console.log(data, "ashish");

      this.nocHistoryData = data.data.filter((item: any) => {
        return !(this.calculateTimeDifference(item.workDate, item.assignDate) === "-476144:-4");
      });
    });
  }


  paymentHistoryData: any;
  fileNo: any;
  frId: any;
  docUniqueId: any;
  paymentHistory: boolean = false;

  viewPaymentHistory() {
    this.paymentHistory = true;
    console.log(this.paymentHistory);

    let request = {
      "fileNo": this.requestId,
      "frId": this.frids
    }

    this.service.getHierarchyService(this.apiConstant.Payment_History, request).subscribe((data: any) => {
      console.log(data, "ashish");

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
      console.log(docUniqueId, "asgjho");
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
      "referenceId": this.requestId,
      "docUUID": this.letterUniqueId
    }
    console.log(this.letterUniqueId, "uiqueif");

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

  fileRelease() {

    let request = {
      "fileNo": this.requestId,
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
      console.log(docUniqueId, "asgjho");
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


  back() {
    this.router.navigate(['/dashboard']);
  }

  BacktoNocdeptdasbhoard() {
    this.router.navigate(['/nocPage']);
  }

  BacktoOwnerDasbhoard() {
    this.router.navigate(['/OwnerDashboard']);
  }


  dialog: boolean = false;
  datasave: boolean = false;
  hideSubmit: boolean = false;
  supportFormSubmit() {
    if (this.supportForm.invalid) {
      console.log(this.supportForm.value, 'ok');
      alert('Please fill all the details properly..');
      return;
    }
    console.log('this.supportForm.value', this.supportForm.value);
    this.setData();
    let result = {
      referenceId: this.requestId,
      hierachyRemark: this.supportForm.value.otherRemark,
      listdocument: this.formData,
    };
    console.log(result, 'supportive file dfoashgo................');

    this.service
      .getFileService(this.apiConstant.REWORK_API_ARCHITECT, result)
      .subscribe((data: any) => {
        console.log(data, 'kkkkkk');
        if (data.httpStatus === 'OK') {
          this.senddata.dialog = true;
          this.senddata.datasave = true;
          this.hideSubmit = true;

          this.senddata.docDetailsRework = true;
          this.senddata.formOne = false;
          this.router.navigate(['/home']);
        } else {
          this.senddata.dialog = true;
          this.senddata.datasave = false;
          this.senddata.hideSubmit = true;
        }
      });
    this.formData = [];
  }

  formData: any[] = [];
  setData() {
    const excludedControls = [
      'leaseRemarks',
      'saleRemark',
      'siteRemark',
      'mutitionRemark',
      // 'photographRemark',
      // 'photoIdRemark',
      // 'companyIdRemark',
      'applicantInfo',
      'otherRemark',
    ];

    const extractControlValues = (control: AbstractControl): any => {
      if (control instanceof FormGroup) {
        const groupData: any = {};
        Object.keys(control.controls).forEach((key) => {
          if (!excludedControls.includes(key)) {
            groupData[key] = extractControlValues(control.get(key)!);
          }
        });
        return groupData;
      } else if (control instanceof FormArray) {
        const arrayData = control.controls.map((c) => extractControlValues(c));
        return arrayData.filter((data) => Object.keys(data).length > 0); // Remove empty objects
      } else {
        return control.value;
      }
    };

    // Clear existing formData
    this.formData = [];

    Object.keys(this.supportForm.controls).forEach((controlName) => {
      const control = this.supportForm.get(controlName)!;
      if (!excludedControls.includes(controlName)) {
        this.formData = this.formData.concat(extractControlValues(control));
      }
    });

    // Output the form data array
    console.log(this.formData);
  }

pdfFileName: any = 'File name will come here';
isapproveisrefrencePreviewModalOpen: boolean = false;
referenceDocuments: any = 'File name will come here';
refrencePreview: SafeResourceUrl | null = null; // Using SafeResourceUrl for PDF
isrefrencePreviewModalOpen: boolean = false;
refrenceFileType: string | null = null;
approvereferenceDocuments: any = 'File name will come here';
approverefrencePreview: SafeResourceUrl | null = null; // Using SafeResourceUrl for PDF
approverefrenceFileType: string | null = null;

openCertificatePdf(event: Event): void {
  event.stopPropagation();

  let request: any = {
    "referenceId": this.requestId,
    "docUUID": this.letterUniqueId
  };

  this.service.getHierarchyService(this.apiConstant.viewUUID, request).subscribe((data: any) => {
    console.log(request,"request");
    console.log(data,"............eck byte stream");
    
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
    if(arrayName === 'pdfFile'){
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

// buildForm() {
 
// }
fileTypeForm() {
  return this.fb.group({
    docType: ['', Validators.required],
    docName: ['', Validators.required],
    docUniqueId: ['', Validators.required]
  });
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

submit() {

  if (this.supportForm.invalid) {
    alert("Please fill all the details properly..");
    return;
  } else {

    this.paymentFor = localStorage.getItem("paymentType");

    let json1 = {};
    // if (this.dsOC == true) {
    //   json1 = {
    //     "fileNo": this.requestId,
    //     "frId": this.frId,
    //     "letterUinqueId": this.docUUID,
    //     "letterType": "OCAcceptDS"
    //   };
    // } else if (this.dsPlinthDept == true) {
    //   json1 = {
    //     "fileNo": this.requestId,
    //     "frId": this.frId,
    //     "letterUinqueId": this.docUUID,
    //     "letterType": "plinthAcceptDS"
    //   };
    // } else 
    if (this.paymentFor == "fileNew") {
      json1 = {
        "fileNo": this.requestId,
        "frId": this.frId,
        "letterUinqueId": this.docUUID,
        "letterType": "Letter Accepted DS"
      };

    // } else {
    //   json1 = {
    //     "userName": this.requestId,
    //     "letterUinqueId": this.docUUID,
    //     "letterType": "Letter Accepted DS"
    //   };
    }
    console.log(json1, "json data...");

    this.service.postService(this.apiConstant.LetterSaveAfterDS, json1).subscribe((res: any) => {
      console.log("vishal data =================> ", res);
      if (res.httpStatus == 'OK') {
        this.router.navigate(['/dashboard']);

      }

    });
  }

}
}
