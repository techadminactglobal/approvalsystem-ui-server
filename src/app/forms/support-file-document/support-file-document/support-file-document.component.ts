import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { commonService } from 'src/app/services/common.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { API_PATH } from 'src/environments/api-constant';
import { SendData } from 'src/app/SendData';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-support-file-document',
  templateUrl: './support-file-document.component.html',
  styleUrls: ['./support-file-document.component.scss'],
})
export class SupportFileDocumentComponent {
  supportForm!: FormGroup;
  proff: boolean = true;
  apiConstant = API_PATH;

  ownerType = [
    {
      lable: 'Single document',
      type: 'S',
    },
    {
      lable: 'Multiple document',
      type: 'M',
    },
  ];

  constructor(
    private service: commonService,
    private fb: FormBuilder,
    public dialogRef: MatDialog,
    private router: Router,
    public datepipe: DatePipe,
    public sendData: SendData,
    private sanitizer: DomSanitizer
  ) {}
  requestId: any;
  ngOnInit(): void {
    this.requestId = localStorage.getItem('requestid');
    this.buildForm();
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
      leaseRemarks: new FormControl(''),
      saleRemark: new FormControl(''),
      siteRemark: new FormControl(''),
      mutitionRemark: new FormControl(''),
      // photograpFormCertificatename: this.fb.array([this.fileTypeForm()], [Validators.required]),
      // photoIdCertificatename:  this.fb.array([this.fileTypeForm()]),
      // photographRemark: new FormControl('', [Validators.required]),
      // photoIdRemark: new FormControl('', [Validators.required]),
      // companyIdCertificatename: this.fb.array([this.fileTypeForm()]),
      // companyIdRemark: new FormControl('', [Validators.required]),
      docDetailsModel: this.fb.array(
        [this.fileTypeFormOther()]
      ),
      otherRemark: new FormControl(''),

      // applicantInfo: this.fb.group({
      //   oType: ['', [Validators.required]],
      //   noOfOwners: ['', [Validators.required, Validators.min(1), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],

      // }),
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
    this.subscribeToRemarkChanges('otherRemark', 'docDetailsModel');
  }

  // createOwner() {
  //   return this.fb.group({

  //     DocumentName: ['', [Validators.required]],
  //     otherIdCertificatename:  this.fb.array([this.fileTypeForm()]),
  //     otherRemark: ['', [Validators.required]],

  //     isPrimary: [false],

  //   })
  // }

  // +++++++++++++++++++++++++++++++++++++++++

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

  // ++++++++++++++++++++++++++++++++++++++++++

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
      fileNumber: this.requestId,
      docDetailsModel: this.formData,
    };
    console.log(result, 'supportive file dfoashgo................');

    this.service
      .getFileService(this.apiConstant.Supportive_Doc, result)
      .subscribe((data: any) => {
        console.log(data, 'kkkkkk');
        if (data.httpStatus === 'OK') {
          this.sendData.dialog = true;
          this.sendData.datasave = true;
          this.hideSubmit = true;

          this.sendData.docDetails = true;
          this.sendData.formOne = false;
          this.router.navigate(['/home']);
        } else {
          this.sendData.dialog = true;
          this.sendData.datasave = false;
          this.sendData.hideSubmit = true;
        }
      });
    this.formData = [];
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

  fileTypeFormOther(){
    return this.fb.group({
      docType: [''],
      docName: [''],
      docUniqueId: [''],
      remark: [''],
    });
  }

  fileTypeForm() {
    return this.fb.group({
      docType: ['',
        [Validators.required]],
      docName: ['',
        [Validators.required]],
      docUniqueId: ['',
        [Validators.required]],
      remark: [''],
    });
  }

  leaseDeedName: any = 'File name will come here';
  SaleDeedName: any = 'File name will come here';
  sitePhotographName: any = 'File name will come here';
  mutitionFormName: any = 'File name will come here';
  // photographName:any = 'File name will come here';
  // photoIdName:any = 'File name will come here';
  // companyIdName:any = 'File name will come here';
  otherIdName: any = 'File name will come here';
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
  otherIdNamePreview: SafeResourceUrl | null = null;
  isotherIdNameModalOpen: boolean = false;
  otherIdNameFileType: string | null = null;

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
      // }else if(arrayName == 'photograpFormCertificatename'){
      //   this.photographName = fileData.name.split(".")[0] + fileData.name.split(".")[1];
      // }else if(arrayName == 'photoIdCertificatename'){
      //   this.photoIdName = fileData.name.split(".")[0] + fileData.name.split(".")[1];
      // }else if(arrayName == 'companyIdCertificatename'){
      //   this.companyIdName = fileData.name.split(".")[0] + fileData.name.split(".")[1];
    } else if (arrayName === 'docDetailsModel') {
      this.otherIdName =
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
    } else if (arrayName === 'docDetailsModel') {
      this.otherIdName = fileData.name;
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
      if (arrayName === 'docDetailsModel') {
        this.otherIdNameFileType = fileExtension; // Set the file type

        // For PDFs, create a Blob URL
        if (fileExtension === 'pdf') {
          this.otherIdNamePreview =
            this.sanitizer.bypassSecurityTrustResourceUrl(
              URL.createObjectURL(fileData)
            ); // Safe URL for PDF
        } else {
          this.otherIdNamePreview = inputValue; // Base64 for images
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

  owners = 1;

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

  ///other id proof
  toggleEducationalPreviewsitemutationotherid() {
    this.isotherIdNameModalOpen = !this.isotherIdNameModalOpen;
  }

  // Close the educational certificate preview modal
  closeEducationalPreviewModalsitemutationotherid() {
    this.isotherIdNameModalOpen = false;
  }

  // Delete the educational certificate and reset the preview
  deleteEducationalCertificatesitemutationotherid() {
    this.otherIdNamePreview = null;
    this.otherIdName = 'File name will come here';
    // Reset form control and close modal
    this.isotherIdNameModalOpen = false;
  }

  // get owner_list(): FormArray {
  //   return this.supportForm.get('docDetailsModel') as FormArray;
  // }

  // incrementOwner() {
  //   if (this.supportForm.value.applicantInfo.oType !== "M") return;
  //   this.owners += 1;
  //   (this.supportForm.get(["docDetailsModel"]) as FormArray).push(this.createOwner());
  // }
  // decrementOwner() {
  //   if (this.supportForm.value.applicantInfo.oType == "S") return

  //   if (this.owners == 1) return
  //   this.owners -= 1;
  //   (this.supportForm.get(["docDetailsModel"]) as FormArray).removeAt(this.owners)
  // }

  // deleteOwner(index: number) {
  //   (this.supportForm.get(["docDetailsModel"]) as FormArray).removeAt(index)
  //   this.owners -= 1;

  // }

  back() {
    this.router.navigate(['/NewFormView']);
  }
}
