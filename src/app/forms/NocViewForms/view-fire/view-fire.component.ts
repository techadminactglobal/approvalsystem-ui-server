import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SendData } from 'src/app/SendData';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';
import { PhotographnameModalComponent } from '../../photographname-modal/photographname-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COMMONCONSTANTS } from 'src/app/CONSTANTS/constants';

@Component({
  selector: 'app-view-fire',
  templateUrl: './view-fire.component.html',
  styleUrls: ['./view-fire.component.scss']
})
export class ViewFireComponent {
  docUniqueId: any;

  constructor(
    private service: commonService,
    private router: Router,
    public senddata: SendData,
    private dialog: MatDialog) { }

  buildingDetails: any[] = [];
  geoDetails: any[] = [];
  apiConstant = API_PATH;
  fireNocs: any;
  NocDept: boolean = false;
  NocDeptDashboard: boolean = false;
  InternalDeptNoc: boolean = false;
  viewback:boolean = false;

  ngOnInit(): void {
      if(this.senddata.hierarchyId === 'f-101'){
        this.viewback=true;
    this.NocDeptDashboard = true;
      }else{
        this.NocDeptDashboard = this.senddata.NocDeptDashboard;
      }
    this.NocDept = this.senddata.NocDept;
    this.fireDetails();
  }

  viewDoc:boolean = false;
  fireDetails() {
    let request = '?fileNo=' + this.senddata.requestid + '&frId=' + this.senddata.frid + '&callFor=' + this.senddata.callFrom;
    this.service.getButtonDetails(this.apiConstant.ViewNocFire, request).subscribe((data: any) => {
      console.log(data, "response from api...");
      this.fireNocs = data.data.fireNocs[0];

      if(data.data.fireNocs[0].fileType == ""){
        this.viewDoc = false;
      }else{
        this.viewDoc = true;
      }
      this.geoDetails = data.data.geoCoordinate;
      this.buildingDetails = data.data.buildingFloorDetails;

    });
  }

  openFireServicePdf(): void {

    let request: any = {
      "referenceId": this.senddata.requestid,
      "docUUID": this.fireNocs.fileUniqueNo
    }

    this.service.getHierarchyService(this.apiConstant.viewUUID, request).subscribe((data: any) => {
      console.log(data);
      this.docUniqueId = data.docUUID
      console.log(this.docUniqueId, "sdjkdsfdjsfdsjfj")
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

  openPhotographModal(imageUrl: string): void {

    this.dialog.open(PhotographnameModalComponent, {
      data: { photograpFormCertificatename: imageUrl }
    });
  }


  Back() {
    if (this.senddata.callFrom == "plinth") {
      this.router.navigate(['/plinthComponent']);
    } else if(this.senddata.callFrom == "OC"){
      this.router.navigate(['/OccupancyComponentView']);
    }else{
      this.router.navigate(['/viewNocPage']);
    }
  }

  BacktoNocdeptdasbhoard(){
    this.router.navigate(['/nocDashboard']);
  }

  deptForm = new FormGroup({
    hierachyRemark: new FormControl('', [Validators.required]),
    referenceDocuments: new FormControl('', [Validators.required])
  });

  referenceDocuments: any = 'File name will come here';
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


  AcceptData() {
    if (this.deptForm.invalid) {
      alert("Please fill all the details properly..");
      return;
    } else {
      let request: any = {
        "referenceId": this.senddata.requestid,
        "hierachyUserName": this.senddata.hierarchyUserName,
        "hierachyRemark": this.deptForm.value.hierachyRemark,
        "hierachyRoleId": this.senddata.hierarchyId,
        "docName": this.docName,
        "docUUID": this.docUUID,
        "docType": this.docType
      }

      console.log(request);


      this.service.getHierarchyService(this.apiConstant.NocApproveApi, request).subscribe((data: any) => {
        console.log(data);
        if (data.httpStatus == 'OK') {
          this.senddata.NocDept = false;
          this.router.navigate(['/nocDashboard']);
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
        "referenceId": this.senddata.requestid,
        "hierachyUserName": this.senddata.hierarchyUserName,
        "hierachyRemark": this.deptForm.value.hierachyRemark,
        "hierachyRoleId": this.senddata.hierarchyId,
        "docName": this.docName,
        "docUUID": this.docUUID,
        "docType": this.docType
      }

      this.service.getHierarchyService(this.apiConstant.NocRejectApi, request).subscribe((data: any) => {
        console.log(data);
        if (data.httpStatus == 'OK') {
          this.senddata.NocDept = false;
          this.router.navigate(['/nocDashboard']);
        }
      });
    }
  }
}



