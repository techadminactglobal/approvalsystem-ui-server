import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TestPDF } from 'src/app/registration/data/test-pdf';
import { SendData } from 'src/app/SendData';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';

@Component({
  selector: 'app-occupancy-component-view',
  templateUrl: './occupancy-component-view.component.html',
  styleUrls: ['./occupancy-component-view.component.scss']
})
export class OccupancyComponentViewComponent {
  dept: boolean = false;
  apiConstant = API_PATH;
  status: any;
  work1hierarchy: boolean = false;
  work2onwardhierarchy: boolean = false;
  documents: any[] = [];
  leaseDeedCertificateName: any;
  leaseRemarks: any;
  leaseDoctype: any;
  SaleDeedCertificatename: any;
  saleRemark: any;
  SaleDeedDoctype: any;
  sitePhotographCertificatename: any;
  siteRemark: any;
  siteDocttype: any
  mutitionFormCertificatename: any;
  mutitionRemark: any;
  mutitionDoctype: any;
  dwgDoctype: any;
  docUUID: any;
  plinthDetails: any;
  viewHistoryButton: boolean = false;
  plinthReleased: boolean = false;
  letterUniqueId: any;
  letterName: any;
  viewPlinth: boolean = true;
  fireForm: boolean = false;
  pay:boolean = false;
  noc: boolean = false;
  InspectionDetails:any;
  Inspection: boolean = false;

  leaseDeedCertificateNameRework: Boolean = false;
  SaleDeedCertificatenameRework: Boolean = false;
  sitePhotographCertificatenameRework: Boolean = false;
  mutitionFormCertificatenameRework: Boolean = false;
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
  fileReupload: boolean = false;
  requestId: any;
  frids: any;
  heirarchyuserName: any;
  createdBy: any;
  dwgCertificatename: any;
  
  constructor(
    private fb: FormBuilder,
    private service: commonService,
    private dialog: MatDialog,
    public senddata: SendData,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    if (this.senddata.callFrom = "OC"){
      this.viewPlinth = false;
    }
  }
  callFrom:any;
  requestid:any;
  frid:any;
  paymentType:any;
  supportForm!: FormGroup;
  deptCall:boolean = false;
  rework: Boolean = false;
  ngOnInit() {
    this.callFrom = localStorage.getItem('callFrom');
    this.requestid = localStorage.getItem('requestid');
    this.frid = localStorage.getItem('frid');
    this.paymentType = localStorage.getItem('paymentType');
    this.deptCall = localStorage.getItem("architectView") === "true";
    // setTimeout(() => {
    let request = {
      "fileNo": this.requestid,
      "frId": this.frid
    }
    console.log(request, "request...");

    this.service.getDataService(this.apiConstant.OccupancyDetails, request).subscribe((res: any) => {
      console.log("**************", res);
      if (res.data == null) {
        return
      }
      

      this.documents = res.data.supportivefile;
      this.plinthDetails = res.data.OccupanyCertificate[0];
      this.InspectionDetails = res.data.InspectionDetails[0];
      console.log(this.documents);

      if (this.plinthDetails.approvedLetter != null) {
        this.letterUniqueId = this.plinthDetails.letterApprovedDs;
        this.letterName = "Approve Letter";
      } else if (this.plinthDetails.rejectLetter != null) {
        this.letterUniqueId = this.plinthDetails.rejectLetterDs
        this.letterName = "Reject Letter";
      }

      if (res.data.OccupanyCertificate[0].currentStatus == "225") {

        this.service.getButtonDetails(this.apiConstant.supportFile_View, this.requestid).subscribe((data: any) => {
          console.log(data, "ppp...");
          this.buildForm();
          data.forEach((doc: any) => {
            if (doc.docName === "leaseDeedCertificateName" && doc.modificationRequired === "yes") {
              this.leaseDeedCertificateNameRework = true;
            } else if (doc.docName === "SaleDeedCertificatename" && doc.modificationRequired === "yes") {
              this.SaleDeedCertificatenameRework = true;
            } else if (doc.docName === "sitePhotographCertificatename" && doc.modificationRequired === "yes") {
              this.sitePhotographCertificatenameRework = true;
            } else if (doc.docName === "mutitionFormCertificatename" && doc.modificationRequired === "yes") {
              this.mutitionFormCertificatenameRework = true;
            } else {

            }
          });
          console.log(this.leaseDeedCertificateName, this.SaleDeedCertificatename, this.sitePhotographCertificatename, this.mutitionFormCertificatename, "data need to modified");

        });
        
          this.rework = true;
      }
// setTimeout(() => {
      this.status = res.data.OccupanyCertificate[0].status;
      console.log(this.status,"status for oc");
      
      if (this.status=="Occupancy Applied" || this.status=="Occupancy Pending For payment" || this.status=="Occupancy DWG Approved") {
        this.pay = true;
        this.noc = true;
      } else if(this.status=="Occupancy Noc Submit" || this.status=="Occupancy Pending For payment"){
        this.pay = true;
        this.noc = false;
      }
      // else if (this.status=="Occupancy DWG Approved" || this.status=="Occupancy Pending For payment") {
      //   this.pay = true;
      //   this.noc = false;}
      if (this.status == "Occupancy Applied" || this.status == "Occupancy Noc Submit" || 
        this.status == "Occupany Initial Deposite") {
        this.viewHistoryButton = false;
        // this.work1hierarchy = false;
        // this.work2onwardhierarchy = true;
      } else if (this.status == "Occupancy Payment Completed & Inspection Schedule"){
        this.viewHistoryButton = true;
        this.Inspection = true;
      }else if (this.status == "Occupancy Ds Pending"){
        this.viewHistoryButton = true;
        this.senddata.status = "Occupancy Ds Pending";
      }else if(this.status == "Occupancy Ds Applied - Occupancy Approved"){
        this.viewHistoryButton = true;
        this.plinthReleased = true;
      }
      else {
        this.viewHistoryButton = true;
      }

      // }, 1000);
      // Filter out and log any documents not in the predefined list
      this.documents = this.documents.filter((doc: any) =>
        ['leaseDeedCertificateName', 'SaleDeedCertificatename', 'sitePhotographCertificatename', 'mutitionFormCertificatename','dwgFile'].includes(doc.docName)
      );

      console.log(this.documents, "Filtered documents");

      // Extract remarks and document types
      this.leaseRemarks = this.documents.find((doc: any) => doc.docName === 'leaseDeedCertificateName')?.remark || null;
      this.saleRemark = this.documents.find((doc: any) => doc.docName === 'SaleDeedCertificatename')?.remark || null;
      this.siteRemark = this.documents.find((doc: any) => doc.docName === 'sitePhotographCertificatename')?.remark || null;
      this.mutitionRemark = this.documents.find((doc: any) => doc.docName === 'mutitionFormCertificatename')?.remark || null;

      this.leaseDoctype = this.documents.find((doc: any) => doc.docName === 'leaseDeedCertificateName')?.docType || null;
      this.SaleDeedDoctype = this.documents.find((doc: any) => doc.docName === 'SaleDeedCertificatename')?.docType || null;
      this.siteDocttype = this.documents.find((doc: any) => doc.docName === 'sitePhotographCertificatename')?.docType || null;
      this.mutitionDoctype = this.documents.find((doc: any) => doc.docName === 'mutitionFormCertificatename')?.docType || null;
      this.dwgDoctype = this.documents.find((doc: any) => doc.docName === 'dwgFile')?.docType || null;

      // Store unique IDs
      this.leaseDeedCertificateName = this.documents.find((doc: any) => doc.docName === 'leaseDeedCertificateName')?.docUniqueId || null;
      this.SaleDeedCertificatename = this.documents.find((doc: any) => doc.docName === 'SaleDeedCertificatename')?.docUniqueId || null;
      this.sitePhotographCertificatename = this.documents.find((doc: any) => doc.docName === 'sitePhotographCertificatename')?.docUniqueId || null;
      this.mutitionFormCertificatename = this.documents.find((doc: any) => doc.docName === 'mutitionFormCertificatename')?.docUniqueId || null;
      this.dwgCertificatename = this.documents.find((doc: any) => doc.docName === 'dwgFile')?.docUniqueId || null;

      console.log("Updated document details:", {
        leaseRemarks: this.leaseRemarks,
        saleRemark: this.saleRemark,
        siteRemark: this.siteRemark,
        mutitionRemark: this.mutitionRemark,
        leaseDoctype: this.leaseDoctype,
        SaleDeedDoctype: this.SaleDeedDoctype,
        siteDocttype: this.siteDocttype,
        mutitionDoctype: this.mutitionDoctype,
        dwgDoctype: this.dwgDoctype,
        leaseDeedCertificateName: this.leaseDeedCertificateName,
        SaleDeedCertificatename: this.SaleDeedCertificatename,
        sitePhotographCertificatename: this.sitePhotographCertificatename,
        mutitionFormCertificatename: this.mutitionFormCertificatename,
        dwgCertificatename: this.dwgCertificatename

      });

    }, error => {
      console.error('Error fetching document data', error);
    });
    this.fireDetails();

    this.viewHierachyHistory();
    this.viewPaymentHistory();
    this.viewNocHistory();
  }

  buildForm() {
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

    this.supportForm = new FormGroup({
      DrawingFileCertificateName: this.fb.array([this.fileTypeForm()]),
    });
    // this.subscribeToRemarkChanges('photographRemark', 'photograpFormCertificatename');
    // this.subscribeToRemarkChanges('photoIdRemark', 'photoIdCertificatename');
    // this.subscribeToRemarkChanges('companyIdRemark', 'companyIdCertificatename');
    // this.subscribeToRemarkChanges('otherRemark', 'docDetailsModel');
  }
  // this.docUUID = this.documents.docUUID;

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

  fileTypeForm() {
    return this.fb.group({
      docType: [''],
      docName: [''],
      docUniqueId: [''],
      remark: [''],
    });
  }
  fireDetails() {
    let request = '?fileNo=' + this.requestid + '&frId=' + this.frid + '&callFor=' + this.callFrom;
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
    this.callFrom = "OC";
    this.router.navigate(['/viewFire']);
  }

  payment(){
    localStorage.setItem('callFrom',"OC");
    // this.senddata.callFrom = "OC";
    // this.senddata.requestid = this.senddata.requestid,
    // localStorage.setItem('requestid', 'requestid');
    // // this.senddata.frid = this.senddata.frid;
    // localStorage.setItem('frid', 'frid');
    
    // this.senddata.paymentType = "OC"
    localStorage.setItem('paymentType',"OC");
    this.router.navigate(['/payment']);
  }

  openPdf(docUniqueId: string): void {
    let request: any = {
      "referenceId": this.requestid,
      "docUUID": docUniqueId

    }
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


  // docUUID: any;

  openCertificatePdf(): void {

    let request: any = {
      "referenceId": this.requestid,
      "docUUID": this.leaseDeedCertificateName

    }

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

  openSaleDeedCertificatePdf(): void {

    let request: any = {
      "referenceId": this.requestid,
      "docUUID": this.SaleDeedCertificatename
    }

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

  opensitePhotographCertificatePdf(): void {

    let request: any = {
      "referenceId": this.requestid,
      "docUUID": this.sitePhotographCertificatename
    }

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

  openmutitionFormCertificatePdf(): void {

    let request: any = {
      "referenceId": this.requestid,
      "docUUID": this.mutitionFormCertificatename
    }

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







  back() {
    if (this.callFrom = "OC") {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/departmentDashboard']);
    }
  }

  NocFill(){
    this.callFrom = "OC"
      this.router.navigate(['/nocPage']);
    }


  hierarchyHistoryData: any;
  hierarchyModule: any;
  referenceId: any;
  history: boolean = false;

  viewHierachyHistory() {
    this.history = true;
    console.log(this.history);
    this.service.getButtonDetails(this.apiConstant.HIERARCHY_HISTORY, this.requestid).subscribe((data: any) => {
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

  nocHistoryData : any;

  viewNocHistory(){
    this.service.getButtonDetails(this.apiConstant.NOC_HISTORY, this.requestid).subscribe((data: any) => {
      console.log(data,"ashish");
     
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
      "fileNo": this.requestid,
      "frId": this.frid
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
      "referenceId": this.requestid,
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
      "fileNo": this.requestid,
      "frId": this.frid
    }
    this.service.getSecondViewDetails(this.apiConstant.File_Release, request).subscribe((data: any) => {
      console.log(data, "okkkkk");
      if (data.httpStatus === "OK") {
        this.router.navigate(['/plinthDashboard']);
      }


    });

  }
  drawingFileName: any = 'File name will come here';

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
    this.drawingFileName = fileData.name;
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

  // dialog: boolean = false;
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
      referenceId: this.requestid,
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

          this.senddata.docDetailsReworkOC = true;
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

  proff: boolean = true;
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

      this.service.postService(this.apiConstant.doc_Re_Upload_Error_DWG, request).subscribe((res: any) => {
        console.log("data =================> ", res);

        if (res.httpStatus === "OK") {
          this.senddata.dialog = true;
          this.datasave = true;
          this.hideSubmit = true;

          this.heirarchyuserName = this.createdBy;
          this.senddata.dwgReupload = true;
          this.router.navigate(['/home']);

        } else {
          this.senddata.dialog = false;
          this.datasave = false;
          this.hideSubmit = false;
        }

      });

    }
  }
}


