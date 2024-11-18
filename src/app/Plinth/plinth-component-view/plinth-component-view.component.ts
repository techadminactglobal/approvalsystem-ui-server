import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TestPDF } from 'src/app/registration/data/test-pdf';
import { SendData } from 'src/app/SendData';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';

@Component({
  selector: 'app-plinth-component-view',
  // standalone: true,
  templateUrl: './plinth-component-view.component.html',
  styleUrls: ['./plinth-component-view.component.scss']
})
export class PlinthComponentViewComponent {
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
  docUUID: any;
  plinthDetails: any;
  InspectionDetails:any;
  Inspection: boolean = false;
  viewHistoryButton: boolean = false;
  plinthReleased: boolean = false;
  letterUniqueId: any;
  letterName: any;
  viewPlinth: boolean = true;
  paybutton: boolean = false;
  reference:any;

  constructor(
    private fb: FormBuilder,
    private service: commonService,
    private dialog: MatDialog,
    private senddata: SendData,
    private router: Router
  ) {
    if (this.senddata.callFrom == "Dept") {
      this.dept = true;
    }else if (this.senddata.callFrom == "OC"){
      this.viewPlinth = false;
    }
  }



  ngOnInit() {
    this.reference = this.senddata.requestid;
    // setTimeout(() => {
    let request = {
      "fileNo": this.senddata.requestid,
      "frId": this.senddata.frid
    }
    console.log(request, "request...");

    this.service.getDataService(this.apiConstant.PlinthDetails, request).subscribe((res: any) => {
      console.log("**************", res);
      if (res.data == null) {
        return
      }

      this.documents = res.data.supportivefile;
      this.plinthDetails = res.data.PlinthDetails[0];
      this.InspectionDetails = res.data.InspectionDetails[0];
      console.log(this.documents);

      if (this.plinthDetails.approvedLetter != null) {
        this.letterUniqueId = this.plinthDetails.letterApprovedDs;
        this.letterName = "Approve Letter";
      } else if (this.plinthDetails.rejectLetter != null) {
        this.letterUniqueId = this.plinthDetails.rejectLetterDs
        this.letterName = "Reject Letter";
      }


      this.status = res.data.PlinthDetails[0].currentStatus;
      if (this.status == "101") {
        this.paybutton = true;
        // this.dept = false;
        this.viewHistoryButton = false;
        // this.work1hierarchy = true;
        // this.work2onwardhierarchy = false;
      } else if (this.status == "102"){
        this.Inspection = true;
        this.viewHistoryButton = true;
      }
      else if (this.status == "108") {
        this.plinthReleased = true;
        this.viewHistoryButton = true;
      } else {
        this.viewHistoryButton = true;
      }

      console.log(res, "data response");

      // }, 1000);
      // Filter out and log any documents not in the predefined list
      this.documents = this.documents.filter((doc: any) =>
        ['leaseDeedCertificateName', 'SaleDeedCertificatename', 'sitePhotographCertificatename', 'mutitionFormCertificatename'].includes(doc.docName)
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

      // Store unique IDs
      this.leaseDeedCertificateName = this.documents.find((doc: any) => doc.docName === 'leaseDeedCertificateName')?.docUniqueId || null;
      this.SaleDeedCertificatename = this.documents.find((doc: any) => doc.docName === 'SaleDeedCertificatename')?.docUniqueId || null;
      this.sitePhotographCertificatename = this.documents.find((doc: any) => doc.docName === 'sitePhotographCertificatename')?.docUniqueId || null;
      this.mutitionFormCertificatename = this.documents.find((doc: any) => doc.docName === 'mutitionFormCertificatename')?.docUniqueId || null;

      console.log("Updated document details:", {
        leaseRemarks: this.leaseRemarks,
        saleRemark: this.saleRemark,
        siteRemark: this.siteRemark,
        mutitionRemark: this.mutitionRemark,
        leaseDoctype: this.leaseDoctype,
        SaleDeedDoctype: this.SaleDeedDoctype,
        siteDocttype: this.siteDocttype,
        mutitionDoctype: this.mutitionDoctype,
        leaseDeedCertificateName: this.leaseDeedCertificateName,
        SaleDeedCertificatename: this.SaleDeedCertificatename,
        sitePhotographCertificatename: this.sitePhotographCertificatename,
        mutitionFormCertificatename: this.mutitionFormCertificatename
      });

    }, error => {
      console.error('Error fetching document data', error);
    });

    this.viewHierachyHistory();
    this.viewPaymentHistory();
  }

  // this.docUUID = this.documents.docUUID;



  openPdf(docUniqueId: string): void {
    let request: any = {
      "referenceId": this.senddata.requestid,
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
      "referenceId": this.senddata.requestid,
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
      "referenceId": this.senddata.requestid,
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
      "referenceId": this.senddata.requestid,
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
      "referenceId": this.senddata.requestid,
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
    if (this.senddata.callFrom == "Dept") {
      this.dept = true;
      this.router.navigate(['/departmentDashboard']);
    } else {
      this.router.navigate(['/plinthDashboard']);
    }
  }

  pay() {
    this.senddata.paymentType = "plinthNew";
    this.router.navigate(['/payment']);
  }


  hierarchyHistoryData: any;
  hierarchyModule: any;
  referenceId: any;
  history: boolean = false;

  viewHierachyHistory() {
    // this.history = true;
    console.log(this.history);
    this.service.getButtonDetails(this.apiConstant.HIERARCHY_HISTORY, this.senddata.requestid).subscribe((data: any) => {
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



  paymentHistoryData: any;
  fileNo: any;
  frId: any;

  docUniqueId: any;
  paymentHistory: boolean = false;

  viewPaymentHistory() {
    this.paymentHistory = true;
    console.log(this.paymentHistory);

    let request = {
      "fileNo": this.senddata.requestid,
      "frId": this.senddata.frid
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
      "referenceId": this.senddata.requestid,
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
      "fileNo": this.senddata.requestid,
      "frId": this.senddata.frid
    }
    this.service.getSecondViewDetails(this.apiConstant.File_Release, request).subscribe((data: any) => {
      console.log(data, "okkkkk");
      if (data.httpStatus === "OK") {
        this.router.navigate(['/plinthDashboard']);
      }


    });

  }


}


