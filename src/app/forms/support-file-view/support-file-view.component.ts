import { AfterViewInit, Component } from '@angular/core';
import { SendData } from 'src/app/SendData';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestPDF } from '../../registration/data/test-pdf';
import { PhotographnameModalComponent } from '../photographname-modal/photographname-modal.component';
import { COMMONCONSTANTS } from 'src/app/CONSTANTS/constants';


@Component({
  selector: 'app-support-file-view',
  templateUrl: './support-file-view.component.html',
  styleUrls: ['./support-file-view.component.scss']
})
export class SupportFileViewComponent {

  apiConstant = API_PATH;
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
  photograpFormCertificatename: any;
  photographRemark: any;
  photographDoctype: any;
  photoIdCertificatename: any;
  photoIdRemark: any;
  photoidDotype: any;
  companyIdCertificatename: any;
  companyIdRemark: any;
  companyIDDoctype: any;



  constructor(private service: commonService, public senddata: SendData, private router: Router, private dialog: MatDialog, private _formBuilder: FormBuilder) {

  }

  documents: any[] = [];
  nextDisable: boolean = false;

  ngOnInit(): void {

    this.service.getButtonDetails(this.apiConstant.supportFile_View, this.senddata.requestid).subscribe((data: any) => {
      console.log(data, "ppp");

    this.service.getButtonDetails(this.apiConstant.newFORM_VIEW, this.senddata.requestid).subscribe((data: any) => {
      if(data.basicInfo.status == COMMONCONSTANTS.Status_Documents_Uploaded){
        this.nextDisable = true;}
    });

      data.forEach((doc: any) => {
        if (doc.docName != "leaseDeedCertificateName" && doc.docName != "SaleDeedCertificatename" && doc.docName != "sitePhotographCertificatename" &&
          doc.docName != "mutitionFormCertificatename" && doc.docName != "photograpFormCertificatename" && doc.docName != "photoIdCertificatename" &&
          doc.docName != "companyIdCertificatename") {
          console.log(doc.docName, "kkkkokoo")

          this.documents.push({
            docName: doc.docName,
            docType: doc.docType,
            docUniqueId: doc.docUniqueId,
            remark: doc.remark
          });
        }
      });

      console.log(this.documents, "agiasd");



      this.leaseRemarks = data.find((doc: any) => doc.docName === 'leaseDeedCertificateName')?.remark;
      this.saleRemark = data.find((doc: any) => doc.docName === 'SaleDeedCertificatename')?.remark;
      this.siteRemark = data.find((doc: any) => doc.docName === 'sitePhotographCertificatename')?.remark;
      this.mutitionRemark = data.find((doc: any) => doc.docName === 'mutitionFormCertificatename')?.remark;
      this.photographRemark = data.find((doc: any) => doc.docName === 'photograpFormCertificatename')?.remark;
      this.photoIdRemark = data.find((doc: any) => doc.docName === 'photoIdCertificatename')?.remark;
      this.companyIdRemark = data.find((doc: any) => doc.docName === 'companyIdCertificatename')?.remark;



      this.leaseDoctype = data.find((doc: any) => doc.docName === 'leaseDeedCertificateName')?.docType;
      this.SaleDeedDoctype = data.find((doc: any) => doc.docName === 'SaleDeedCertificatename')?.docType;
      this.siteDocttype = data.find((doc: any) => doc.docName === 'sitePhotographCertificatename')?.docType;
      this.mutitionDoctype = data.find((doc: any) => doc.docName === 'mutitionFormCertificatename')?.docType;
      this.photographDoctype = data.find((doc: any) => doc.docName === 'photograpFormCertificatename')?.docType;
      this.photoidDotype = data.find((doc: any) => doc.docName === 'photoIdCertificatename')?.docType;
      this.companyIDDoctype = data.find((doc: any) => doc.docName === 'companyIdCertificatename')?.docType;









      const leaseDeedDocument = data.find((doc: any) => doc.docName === 'leaseDeedCertificateName');
      this.leaseDeedCertificateName = leaseDeedDocument ? leaseDeedDocument.docUniqueId : null;

      const SaleDeedCertificatename = data.find((doc: any) => doc.docName === 'SaleDeedCertificatename');
      this.SaleDeedCertificatename = SaleDeedCertificatename ? SaleDeedCertificatename.docUniqueId : null;

      const sitePhotographCertificatename = data.find((doc: any) => doc.docName === 'sitePhotographCertificatename');
      this.sitePhotographCertificatename = sitePhotographCertificatename ? sitePhotographCertificatename.docUniqueId : null;

      const mutitionFormCertificatename = data.find((doc: any) => doc.docName === 'mutitionFormCertificatename');
      this.mutitionFormCertificatename = mutitionFormCertificatename ? mutitionFormCertificatename.docUniqueId : null;

      const photograpFormCertificatename = data.find((doc: any) => doc.docName === 'photograpFormCertificatename');
      this.photograpFormCertificatename = photograpFormCertificatename ? photograpFormCertificatename.docUniqueId : null;


      const photoIdCertificatename = data.find((doc: any) => doc.docName === 'photoIdCertificatename');
      this.photoIdCertificatename = photoIdCertificatename ? photoIdCertificatename.docUniqueId : null;

      const companyIdCertificatename = data.find((doc: any) => doc.docName === 'companyIdCertificatename');
      this.companyIdCertificatename = companyIdCertificatename ? companyIdCertificatename.docUniqueId : null;









      // data.supportForm.forEach((doc: any) => {
      //   if (doc.docName === "leaseDeedCertificateName") {
      //     this.leaseDeedCertificateName = doc.docUniqueId;
      //     console.log(this.leaseDeedCertificateName, "kk");
      //   } else if (doc.docName === "educationalCertificatename") {

      //   } else if(doc.docName === "licensedCertificatename") {

      //   }
      // });

      this.docUUID = data.docUUID;


    });





  }


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


  docUUID: any;

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

  openphotograpFormCertificatePdf(): void {
    let request: any = {
      "referenceId": this.senddata.requestid,
      "docUUID": this.photograpFormCertificatename
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
        this.openPhotographModal(url);
        // window.open(url, '_blank');

      } else {
        console.error('No document data found in the response');
      }
    },
      (error: any) => {
        console.error('Error fetching document data:', error);
      });
  }
  openPhotographModal(imageUrl: string): void {

    this.dialog.open(PhotographnameModalComponent, {
      data: { photograpFormCertificatename: imageUrl }
    });
  }



  openphotoIdCertificatePdf(): void {

    let request: any = {
      "referenceId": this.senddata.requestid,
      "docUUID": this.photoIdCertificatename
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


  opencompanyIdCertificatePdf(): void {

    let request: any = {
      "referenceId": this.senddata.requestid,
      "docUUID": this.companyIdCertificatename
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

  SecondFrom() {
    this.router.navigate(['/senondForm']);
  }

  back(){
    this.router.navigate(['/dashboard']);
  }


}
