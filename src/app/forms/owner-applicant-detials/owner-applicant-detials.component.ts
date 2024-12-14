import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SendData } from 'src/app/SendData';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';

@Component({
  selector: 'app-owner-applicant-detials',
  templateUrl: './owner-applicant-detials.component.html',
  styleUrls: ['./owner-applicant-detials.component.scss']
})
export class OwnerApplicantDetialsComponent {

  applicantInfoForm!: FormGroup;
  constructor(private service: commonService, public senddata: SendData, private route: Router, private fb: FormBuilder) {
      this.applicantInfoForm =  new FormGroup({
        applicantInfo: new FormGroup({
          architectNum: new FormControl(''),
          consultantId: new FormControl('',Validators.required),
          frId: new FormControl( this.frId)
      }),
    });
    }

  apiConstant = API_PATH;
  frId:any;
architectview:any;
ownerCall:any;
disalePullBack:any;
status:any;
  ngOnInit(): void {
   this.architectview =  localStorage.getItem('architectView');
    this.frId = localStorage.getItem('frid');
    this.viewDetais();

    this.ownerCall = localStorage.getItem("ownerCall");
    // this.disalePullBack = localStorage.getItem("disablePullBack");
    // this.status = localStorage.getItem("status");
   

    // this.disalePullBack = this.status=='File In Process'?this.disalePullBack='true':'false';
    // console.log(this.status + ' erweryg');
    // console.log(this.disalePullBack + ' erweryg');
    
    
  }

  initailOwnerDetails: any;
  initailOwnerCommunicationAddress: any;
  initailOwnerPermanentAddress: any;
  additionalOwnerDetails: any;
  fileDetails: any;
  companyDetails: any;
  company: boolean = false;
  resignToArchitect:boolean = false;
  pullBacks:boolean = false;
  acceptArchitect:boolean = false;
  viewDetais() {
    
    this.service.getDeptDashboard(this.apiConstant.viewOwnerApplicantDetails, this.frId).subscribe((data: any) => {
      console.log(data);

      if (data.httpStatus === "OK") {
        this.initailOwnerDetails = data.data.InitailOwnerDetails;
        this.initailOwnerCommunicationAddress = data.data.InitailOwnerCommunicationAddress;
        this.initailOwnerPermanentAddress = data.data.InitailOwnerPermanentAddress;
        this.additionalOwnerDetails = data.data.AdditionalOwnerDetails;
        this.fileDetails = data.data.FileDetails;
        if (data.data.CompanyDetails.companyPhone != null) {
          this.companyDetails = data.data.CompanyDetails;
          this.company = true;
        }
        if(data.data.FileDetails.status == "Rejected by Architect" || data.data.FileDetails.status == "Pull back by Owner"){
          this.resignToArchitect = true;
          this.pullBacks = false;
          this.acceptArchitect = false;
        }else if(data.data.FileDetails.status == "Assign to Architect" ){
          this.resignToArchitect = false;
          this.pullBacks = true;
          this.acceptArchitect = true;
        }else if(data.data.FileDetails.status == "Accept by Architect"){
          this.resignToArchitect = false;
          this.pullBacks = true;
          this.acceptArchitect = false;
        }else{
          this.resignToArchitect = false;
          this.pullBacks = true;
          this.acceptArchitect = false;
        }

      }
    });
  }

  accept() {
    this.service.getDeptDashboard(this.apiConstant.AcceptByArchitect,  this.frId).subscribe((data: any) => {
      console.log(data);

      if (data.httpStatus === "OK") {
        this.route.navigate(['/form/new-first-component']);
      }
    });
  }

  reject() {
    this.service.getDeptDashboard(this.apiConstant.RejectByArchitect, this.frId).subscribe((data: any) => {
      console.log(data);

      if (data.httpStatus === "OK") {
        this.route.navigate(['/dashboard']);
      }
    });
  }

  pullBack(){
    this.service.getDeptDashboard(this.apiConstant.PullBack,  this.frId).subscribe((data: any) => {
      console.log(data);

      if (data.httpStatus === "OK") {
        this.route.navigate(['/OwnerDashboard']);
      }
    });
  }

  onKeyup(value: string): void {
    if (value.length >= 4) {
      this.fetchArchitects(value);
    }
  }


  resetArchitect(): void {
    const architectControl = this.applicantInfoForm.get('architectNum');
    if (architectControl) {
      architectControl.reset();
      this.filteredArchitects = null;
    }
  }

  viewArchitect:boolean = false;
  filteredArchitects: any;
  architectMessage :any = '';
  fetchArchitects(consultantId: string) {
    this.service.getButtonDetails(this.apiConstant.GetArchitectByUserName, consultantId).subscribe((res: any) => {
      console.log(res);
      if (res.httpStatus === "OK" && res.data.length > 0 ) {
        this.filteredArchitects = res.data;
        this.viewArchitect = true;
      }else if(res.data.length == 0){
        this.architectMessage = "Architect Not found for this input."
        this.viewArchitect = false;
      }
    });
  }

  selectArchitect(architect: any) {
    // Set the selected architect to the form control
    this.applicantInfoForm.get('architectNum')?.setValue(architect.firstName);
  }

  SubmitRequest(){
    console.log(this.applicantInfoForm.value,"form resubmit to new architect");
    let json = "frId="+this.applicantInfoForm.value.applicantInfo.this.frId+"&consultantId="+this.applicantInfoForm.value.applicantInfo.consultantId;
console.log(json,"json value");

    this.service.getButtonDetails(this.apiConstant.resignToArchitect, json).subscribe((res: any) => {
      console.log(res);

      if(res.httpStatus === "OK"){
        this.route.navigate(['/OwnerDashboard']);
      }
    });
  }
  
  back(){
    this.route.navigate(['/OwnerDashboard']);
  }
  
}
