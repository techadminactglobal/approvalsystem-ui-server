import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SendData } from 'src/app/SendData';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';

@Component({
  selector: 'app-occupancy-component',
  templateUrl: './occupancy-component.component.html',
  styleUrls: ['./occupancy-component.component.scss']
})
export class OccupancyComponentComponent implements OnInit {

  apiConstant = API_PATH;
  OCForm!: FormGroup;

  leaseDeedName: string = 'File name will come here';
  SaleDeedName: string = 'File name will come here';
  sitePhotographName: string = 'File name will come here';
  mutitionFormName: string = 'File name will come here';

  constructor(
    private fb: FormBuilder,
    private service: commonService,
    private dialogRef: MatDialog,
    private senddata: SendData,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.previousData();
  }

  buildForm() {
    this.OCForm = this.fb.group({
      leaseDeedCertificateName: this.fb.array([this.fileTypeForm()], [Validators.required]),
      SaleDeedCertificatename: this.fb.array([this.fileTypeForm()], [Validators.required]),
      sitePhotographCertificatename: this.fb.array([this.fileTypeForm()], [Validators.required]),
      mutitionFormCertificatename: this.fb.array([this.fileTypeForm()], [Validators.required]),
      leaseRemarks: new FormControl(''),
      saleRemark: new FormControl(''),
      siteRemark: new FormControl(''),
      mutitionRemark: new FormControl(''),
      remark: new FormControl('', [Validators.required]),
    });

    this.subscribeToRemarkChanges('leaseRemarks', 'leaseDeedCertificateName');
    this.subscribeToRemarkChanges('saleRemark', 'SaleDeedCertificatename');
    this.subscribeToRemarkChanges('siteRemark', 'sitePhotographCertificatename');
    this.subscribeToRemarkChanges('mutitionRemark', 'mutitionFormCertificatename');
  }

  private subscribeToRemarkChanges(remarkControlName: string, formArrayName: string): void {
    const remarkControl = this.OCForm.get(remarkControlName) as FormControl;
    const formArray = this.OCForm.get(formArrayName) as FormArray;

    if (remarkControl && formArray) {
      remarkControl.valueChanges.subscribe(value => {
        formArray.controls.forEach(control => {
          control.get('remark')?.setValue(value, { emitEvent: false });
        });
      });
    } else {
      console.error(`Remark control or FormArray not found for ${remarkControlName}`);
    }
  }

  fileTypeForm() {
    return this.fb.group({
      docType: [''],
      docName: [''],
      docUniqueId: [''],
      remark: ['']
    });
  }


  uploadDoc(event: any, arrayName: string) {
    const fileData = event.target.files[0];
    if (!fileData) return;

    const allowedExtensions = ['pdf', 'jpeg'];
    const maxSize = 10485760; // 10MB

    const fileExtension = fileData.name.split('.').pop()?.toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      alert('Please upload a file with PDF or JPEG extension.');
      event.target.value = '';
      return;
    }

    if (fileData.size > maxSize) {
      alert('Please upload a file under 10 MB.');
      event.target.value = '';
      return;
    }

    let fileName = fileData.name.split('.').slice(0, -1).join('.');
    let fileExt = fileExtension;

    // Update variable name based on arrayName
    switch (arrayName) {
      case 'leaseDeedCertificateName':
        this.leaseDeedName = `${fileName}.${fileExt}`;
        break;
      case 'SaleDeedCertificatename':
        this.SaleDeedName = `${fileName}.${fileExt}`;
        break;
      case 'sitePhotographCertificatename':
        this.sitePhotographName = `${fileName}.${fileExt}`;
        break;
      case 'mutitionFormCertificatename':
        this.mutitionFormName = `${fileName}.${fileExt}`;
        break;
    }

    const reader = new FileReader();
    reader.readAsDataURL(fileData);

    reader.onload = (event: any) => {
      const inputValue = event.target.result;

      const json = {
        "docFileName": fileName,
        "docType": fileExt,
        "docByteStream": inputValue.split(",")[1],
        "docName": arrayName
      };

      this.service.postService(this.apiConstant.downloadUUID, json).subscribe((res: any) => {
        if (!res.docUUID) return;

        const formArray = this.OCForm.get(arrayName) as FormArray | null;
        if (formArray) {
          formArray.at(0).patchValue({
            "docType": `${fileName}.${fileExt}`,
            "docName": arrayName,
            "docUniqueId": res.docUUID,
            "docByteStream": inputValue.split(",")[1]
          });
        } else {
          console.error(`FormArray not found for ${arrayName}`);
        }
      });
    };
  }


  formData: any[] = [];
  setData() {

    this.formData.push(this.OCForm.value.leaseDeedCertificateName[0]);
    this.formData.push(this.OCForm.value.SaleDeedCertificatename[0]);
    this.formData.push(this.OCForm.value.sitePhotographCertificatename[0]);
    this.formData.push(this.OCForm.value.mutitionFormCertificatename[0]);
  
    console.log(this.formData);
  }

data: any;
  previousData() {
    this.service.getButtonDetails(this.apiConstant.newFORM_VIEW, this.senddata.requestid).subscribe((data: any) => {
      console.log(data); 
      this.data = data;
    });
  }


  dialog: boolean = false;
  datasave: boolean = false;
  hideSubmit: boolean = false;
  ocFormSubmit() {
    if (this.OCForm.invalid) {
      console.log(this.OCForm.value, "plint value invalid");
      alert("Please fill all the details properly.");
      return;
    }
    this.setData();
    let json = {
      "fileNo": this.data.basicInfo.fileNo,
      "frId": this.data.basicInfo.frId,
      "bCategory": this.data.basicInfo.bCategory,
      "bSubCategory": this.data.basicInfo.bSubCategory,
      "pArea": this.data.basicInfo.pArea,
      "bHeight": this.data.basicInfo.bHeight,
      "fileCreatedBy": this.data.basicInfo.fileCreatedBy,
      "assignedArchitect":this.senddata.hierarchyUserName,
      "natureOfProject": this.data.basicInfo.natureOfProject,
      "remark": this.OCForm.value.remark,
      "docDetailsModel": this.formData,
    }
    

    this.service.getDataService(this.apiConstant.OccupancySaveDetails, json).subscribe((data: any) => {
      console.log(data); 
      if (data.httpStatus == "OK") {
        this.senddata.requestid = this.data.basicInfo.fileNo;
        this.senddata.frid = this.data.basicInfo.frId;
        
        this.senddata.dialog=true;
        this.senddata.datasave =true;
        this.hideSubmit = true;
        
        this.senddata.OCForm = true;
        this.router.navigate(['/home']);

      }
    });
    
    this.formData = [];

  }

  back() {
    this.router.navigate(['/OccupancyDashborad']);
  }

}
