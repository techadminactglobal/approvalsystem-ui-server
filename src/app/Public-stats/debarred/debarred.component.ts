import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import moment from 'moment';
import { PhotographModalComponent } from 'src/app/pages/photograph-modal/photograph-modal.component';
import { SendData } from 'src/app/SendData';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';
import * as XLSX from 'xlsx';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-debarred',
  templateUrl: './debarred.component.html',
  styleUrls: ['./debarred.component.scss']
})
export class DebarredComponent {
openLicensedCertificatePdf($event: MouseEvent,arg1: any) {
throw new Error('Method not implemented.');
}
openAffidavitPdf($event: MouseEvent,arg1: any) {
throw new Error('Method not implemented.');
}
openContractPdf($event: MouseEvent,arg1: any) {
throw new Error('Method not implemented.');
}
openCertificationPdf($event: MouseEvent,arg1: any) {
throw new Error('Method not implemented.');
}
displayedColumns: string[] = ['userId', 'debardByDept', 'debardDocName', 'debardDate', 'debardTo', 'debardReason'];

  paginatedDataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  myForm: any;
debardTo: any;
  today: any;

  constructor(private service: commonService, public senddata: SendData, private dialog: MatDialog, private route: Router, private fb: FormBuilder,) {
  }

  apiConstant = API_PATH;
  myGroup!: FormGroup;


  ngOnInit(): void {
    this.getAllDebard();
    this.createForm();

    setTimeout(() => {
      console.log(this.debardList,"debard list");
    
    this.updateDataSource(this.debardList);
    }, 1000);
    
  }

  updateDataSource(data: any[]) {
    this.paginatedDataSource = new MatTableDataSource(data);
    this.paginatedDataSource.paginator = this.paginator;
  }

  onPaginateChange(event: PageEvent) {
    // Optional: Any additional logic on pagination change
    this.paginatedDataSource.paginator = this.paginator;
  }

  createForm() {
    this.myGroup = new FormGroup({
      applicantInfo: new FormGroup({
        architectNum: new FormControl(''),
        consultantId: new FormControl('', Validators.required)
      }),
    });
  }

  onKeyup(value: string): void {
    if (value.length >= 4) {
      this.fetchArchitects(value);
    }
  }


  viewArchitect: boolean = false;
  filteredArchitects: any;
  architectMessage: any = '';
  fetchArchitects(consultantId: string) {
    this.service.getButtonDetails(this.apiConstant.GetConsultantByUserName, consultantId).subscribe((res: any) => {
      console.log(res);
      if (res.httpStatus === "OK" && res.data.length > 0) {
        this.filteredArchitects = res.data;
        this.viewArchitect = true;
      } else if (res.data.length == 0) {
        this.architectMessage = "Consultant Not found for this input."
        this.viewArchitect = false;
      }
    });
  }

  viewName: boolean = false;
  consultantDetails: any;
  consultantLocation: any;
  consultantDocuments: any;
  selectArchitectId(consultantId: string) {
    this.service
      .getDeptDashboard(
        this.apiConstant.FindDetilsOfArchitect, consultantId).subscribe((res: any) => {
          console.log(res);
          if (res.httpStatus == "OK") {
            this.viewName = true;
            this.consultantDetails = res.data.consultantDetails;
            this.consultantLocation = res.data.consultantLocation
            this.consultantDocuments = res.data.consultantDocuments
          } else {
            this.viewName = false;
          }

        });
  }

  resetArchitect(): void {
    const architectControl = this.myGroup.get('applicantInfo.architectNum');
    if (architectControl) {
      architectControl.reset();
      this.filteredArchitects = null;
      this.viewName = false;
    }
  }


  openPhotographPdf(event: any, Uuid: any): void {
    let request: any = {
      "referenceId": this.senddata.requestid,
      "docUUID": Uuid
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

    this.dialog.open(PhotographModalComponent, {
      data: { photoGraph: imageUrl }
    });
  }


  openLicensePdf(event: any, Uuid: any): void {
    let request: any = {
      "referenceId": this.senddata.requestid,
      "docUUID": Uuid

    }

    this.service.getHierarchyService(this.apiConstant.viewUUID, request).subscribe((data: any) => {
      console.log(data);
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

  debardForm = new FormGroup({
    debardReason: new FormControl('', [Validators.required]),
    debardTo: new FormControl('',  [Validators.required, this.futureDateValidator()]),
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


/*   debardList: any; */
  debard:boolean = false;
  getAllDebard() {
    this.service.getDeptDashboard(
      this.apiConstant.GetAllDebardList, "").subscribe((res: any) => {
        console.log(res);
        if (res.httpStatus == "OK") {
          this.debard = true;
          this.debardList = res.data;
        } else {
          this.debard = false;
        }
      });

  }



  submit() {
    if (this.debardForm.invalid) {
      alert("Please fill data Properly")
    } else {
      let Json = {
        "debardReason": this.debardForm.value.debardReason,
        "debardTo": this.debardForm.value.debardTo,
        "debardDocName": this.docName,
        "debardDocUniqueId": this.docUUID,
        "debardByDept": this.senddata.hierarchyUserName,
        "userId": this.myGroup.value.applicantInfo.consultantId
      }


      console.log(Json);

       // Call the API to save debard details
       this.service.postService( this.apiConstant.SaveDebardList, Json).subscribe(
        (response: any) => {
          console.log('Response:', response);
          if (response.httpStatus == "OK") {
            this.senddata.debard = true;
            this.route.navigate(['/home']);
          } else {
            alert('Failed to save debard details');
          }
        },
        (error: any) => {
          console.error('Error:', error);
          alert('Error while saving debard details');
        }
      );
    }

  }
 // Custom Validator to allow only today or future dates
 futureDateValidator() {
  return (control: any) => {
    const selectedDate = moment(control.value);
    const today = moment().startOf('day');  // start of today, discards time part

    if (!selectedDate.isValid()) {
      return { invalidDate: true };  // If the date is not valid
    }

    if (selectedDate.isBefore(today)) {
      return { pastDate: true };  // If the date is before today
    }

    return null;  // Validation passes
  };
   // Set today's date in the required format (YYYY-MM-DD)
   this.today = new Date().toISOString().split('T')[0];
}

get date() {
  return this.myForm.get('date');
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

/* displayedColumns: string[] = ['userId', 'debardByDept', 'debardDocName', 'debardDate', 'debardTo', 'debardReason']; */
  debardList: any[] = [];

  // ...

  exportToExcel(): void {
    if (!this.debardList || this.debardList.length === 0) {
      console.error('No data to export');
      return;
    }
  
    console.log('Debard list data:', this.debardList);
  
    const data = this.debardList.map(item => {
      return {
        "DebardReason": item.debardReason,
        "DebardTo": item.debardTo,
        "DebardDocName": item.debardDocName,
        "DebardDocUniqueId": item.debardDocUniqueId,
        "DebardByDept": item.debardByDept,
        "UserId": item.userId,
      };
    });
  
    console.log('Export data:', data);
  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Debard List');
  
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    console.log('Excel buffer:', excelBuffer);
  
    this.saveAsExcelFile(excelBuffer, 'DebardList');
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    console.log('Saving file...');
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const url: string = window.URL.createObjectURL(data);
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = url;
    a.download = fileName + '_export_' + new Date().toISOString() + '.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
    console.log('File saved.');
  }
}

