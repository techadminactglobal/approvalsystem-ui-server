import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SendData } from 'src/app/SendData';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  isPreviewModalOpen: boolean = false;
  // For managing preview and file names
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

  constructor(
    private fb: FormBuilder,
    private service: commonService,
    private dialogRef: MatDialog,
    private senddata: SendData,
    private router: Router, private sanitizer: DomSanitizer
  ) { }
  requestid:any;
  hierarchyUserName:any;
  frid:any;
  ngOnInit(): void {
    this.requestid = localStorage.getItem('requestid');
    this.frid = localStorage.getItem('frid');
    this.hierarchyUserName = localStorage.getItem('hierarchyUserName');
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
    if (arrayName === 'educationalCertificatename') {
      this.leaseDeedName = fileData.name;
    } else if (arrayName === 'SaleDeedCertificatename') {
      this.SaleDeedName = fileData.name;
    } else if (arrayName === 'sitePhotographCertificatename') {
      this.sitePhotographName = fileData.name;
    } else if (arrayName === 'mutitionFormCertificatename') {
      this.mutitionFormName = fileData.name;
    }
   

    const reader = new FileReader();
    reader.readAsDataURL(fileData);

    reader.onload = (event: any) => {
      const inputValue = event.target.result;
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
   // Toggle modal visibility for educational preview
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

  // Close the educational certificate preview modal
  closeEducationalPreviewModals() {
    this.isSaleDeedPreviewModalOpen = false;
  }

  // Delete the educational certificate and reset the preview
  deleteEducationalCertificates() {
    this.saleDeedPreview = null;
    this.SaleDeedName = 'File name will come here';
    // Reset form control and close modal
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

  ///////mution type

  toggleEducationalPreviewsitemutation() {
    this.ismutitionFormNameModalOpen = !this.ismutitionFormNameModalOpen;
  }

  // Close the educational certificate preview modal
  closeEducationalPreviewModalsitemutation() {
    this.ismutitionFormNameModalOpen = false;
  }

  // Delete the educational certificate and reset the preview
  deleteEducationalCertificatesitemutation() {
    this.mutitionFormNamePreview = null;
    this.mutitionFormName = 'File name will come here';
    // Reset form control and close modal
    this.ismutitionFormNameModalOpen = false;
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
    this.service.getButtonDetails(this.apiConstant.newFORM_VIEW, this.requestid).subscribe((data: any) => {
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
      "assignedArchitect":this.hierarchyUserName,
      "natureOfProject": this.data.basicInfo.natureOfProject,
      "remark": this.OCForm.value.remark,
      "docDetailsModel": this.formData,
    }
    

    this.service.getDataService(this.apiConstant.OccupancySaveDetails, json).subscribe((data: any) => {
      console.log(data); 
      if (data.httpStatus == "OK") {
        this.requestid = this.data.basicInfo.fileNo;
        this.frid = this.data.basicInfo.frId;
        
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
