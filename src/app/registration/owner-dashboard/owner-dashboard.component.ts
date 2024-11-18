import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { COMMONCONSTANTS } from 'src/app/CONSTANTS/constants';
import { SendData } from 'src/app/SendData';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.scss']
})
export class OwnerDashboardComponent implements OnInit {

  myGroup!: FormGroup;

  // Getter for applicantDetails for easier access in the template
  get applicantDetails(): FormArray {
    return this.myGroup.get('applicantDetails') as FormArray;
  }

  onKeyup(value: string): void {
    if (value.length >= 4) {
      this.fetchArchitects(value);
    }
  }


  resetArchitect(): void {
    const architectControl = this.myGroup.get('applicantInfo.architectNum');
    if (architectControl) {
      architectControl.reset();
      this.filteredArchitects = null;
      this.viewName = false;
    }
  }

  viewArchitect: boolean = false;
  filteredArchitects: any;
  architectMessage: any = '';
  fetchArchitects(consultantId: string) {
    this.service.getButtonDetails(this.apiConstant.GetArchitectByUserName, consultantId).subscribe((res: any) => {
      console.log(res);
      if (res.httpStatus === "OK" && res.data.length > 0) {
        this.filteredArchitects = res.data;
        this.viewArchitect = true;
      } else if (res.data.length == 0) {
        this.architectMessage = "Architect Not found for this input."
        this.viewArchitect = false;
      }
    });
  }

  viewName:boolean=false;
  selectedArchitect: any;
  selectArchitectId(consultantId: string) {
    for (let architect of this.filteredArchitects) {
      console.log(architect,"architect");
      if (architect.consultantId === consultantId) {
        this.selectedArchitect = architect;
        this.viewName = true;
        break;
      }else{
        this.viewName = false;
      }
    }
  }


  selectArchitect(architect: any) {
    // Set the selected architect to the form control
    this.myGroup.get('applicantInfo.architectNum')?.setValue(architect.firstName);
  }

  constructor(private service: commonService, public senddata: SendData, private route: Router, private fb: FormBuilder,
    private router: Router,) {
  }

  apiConstant = API_PATH;
  ownerDetail: any;
  addintionalOwner: boolean = false;

  ngOnInit(): void {
    this.viewOwner();
    this.viewOwnerDashboard();
    this.createForm();
    this.addintionalOwner = false;
    this.removeOwner(0);
  }


  dashboardDetails: any;
  viewOwnerDashboard() {
    this.service.getDeptDashboard(this.apiConstant.GetOwnerDashboard, this.senddata.hierarchyUserName).subscribe((res: any) => {
      console.log("**************", res);
      if (res.httpStatus === "OK") {
        this.dashboardDetails = res.data;
      }
    });
  }


  viewOwner() {
    // this.senddata.hierarchyUserName
    // "df@asdg.in"
    this.service.getButtonDetails(this.apiConstant.GetOwnerByEmail, this.senddata.hierarchyUserName).subscribe((res: any) => {
      console.log(res);
      if (res.httpStatus === "OK") {
        this.ownerDetail = res;
      }
    });
  }

  isTrue: boolean = false;
  message: any = "";
  ownerDetilsSearch: any;
  searchUser(aadhaarNumber: string): void {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(aadhaarNumber)) {
      this.service.getButtonDetails(this.apiConstant.GetOwnerByEmail, aadhaarNumber).subscribe((res: any) => {
        console.log(res);
        if (res.httpStatus === "OK" && res.data != null) {
          this.ownerDetilsSearch = res.data;
          this.message = "Details Featched Please add detiails";
          this.isTrue = false;

          this.resetAddharNo();

        } else if (res.httpStatus === "OK" && res.data == null) {
          this.message = "You are not register in your system";
          this.isTrue = true;
        }
      });
    } else {
      this.message = "Please type a valid Email ID";
      this.isTrue = true;
    }
  }

  resetAddharNo(): void {
    const addharControl = this.myGroup.get('addharNum');
    if (addharControl) {
      addharControl.reset();
    }
  }


  // This method clears the user information
  resetUser(): void {
    this.message = "";
    this.isTrue = false;
  }
  createForm() {
    this.myGroup = new FormGroup({
      applicantInfo: new FormGroup({
        architectNum: new FormControl(''),
        consultantId: new FormControl('', Validators.required)
      }),
      applicantDetails: this.fb.array([this.fileTypeForm()]),
      addharNum: new FormControl(''),
      companyDetails: new FormGroup({
        companyName: new FormControl(''),
        email: new FormControl(''),
        phoneNo: new FormControl(''),
        gstNo: new FormControl('')
      }),
    });
  }

  isChecked = false;

  resetForm() {
    const companyControl = this.myGroup.get('companyDetails');
    if (this.isChecked) {
      this.isChecked = false;
      this.myGroup.value.companyDetails = {
        companyName: '',
        email: '',
        phoneNo: '',
        gstNo: ''
      };
      // companyControl!.reset();
    } else {
      this.isChecked = true;
      this.myGroup.value.companyDetails ={
        companyName: '',
        email: '',
        phoneNo: '',
        gstNo: ''
      };
    }
    // if (!this.isChecked) {
    //   companyControl!.reset();
    // }
  }


  removeOwner(index: number) {
    const applicantDetails = this.myGroup.get('applicantDetails') as FormArray;
    if (index >= 0 && index < applicantDetails.length) {
      applicantDetails.removeAt(index);
    }
  }

  fileTypeForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      contactNumber: new FormControl(''),
      email: new FormControl(''),
      dob: new FormControl(''),
      addhar: new FormControl('')
    });
  }

  AddDetails(): void {
    const ownerGroup = this.fileTypeForm(); // Create a new owner form group
    (this.myGroup.get('applicantDetails') as FormArray).push(ownerGroup); // Push the new group into the array

    ownerGroup.patchValue({
      name: `${this.ownerDetilsSearch.salutation || ''} ${this.ownerDetilsSearch.firstName || ''} ${this.ownerDetilsSearch.middleName || ''} ${this.ownerDetilsSearch.lastName || ''}`.trim(),
      contactNumber: this.ownerDetilsSearch.phone,
      email: this.ownerDetilsSearch.email,
      dob: this.ownerDetilsSearch.dob,
      addhar: this.ownerDetilsSearch.addharNo
    });

    this.addintionalOwner = true;

    // Reset the search details
    this.ownerDetilsSearch = {
      salutation: '',
      firstName: '',
      middleName: '',
      lastName: '',
      phone: '',
      email: '',
      dob: '',
      addharNo: ''
    };
  }



  submitForm() {
    if (this.myGroup.value.applicantInfo.consultantId == "") {
      console.log(this.myGroup.value);

      alert("Plese fill data properly");
    } else {
      console.log(this.myGroup.value);

      const json = {
        name: this.ownerDetail.data.salutation + this.ownerDetail.data.firstName + this.ownerDetail.data.middleName + this.ownerDetail.data.lastName,
        email: this.ownerDetail.data.email,
        phone: this.ownerDetail.data.phone,
        dob: this.ownerDetail.data.dob,
        addharNo: this.ownerDetail.data.addharNo,
        consultantId: this.myGroup.value.applicantInfo.consultantId,
        applicantDetails: this.myGroup.value.applicantDetails,
        // myGroupValue: this.myGroup.value // Adding myGroup.value here
        companyDetails: this.myGroup.value.companyDetails
      };

      console.log(json, "json is ...");


      this.service.getDataService(this.apiConstant.SaveOwnerApplicationDetila, json).subscribe((data: any) => {
        console.log(data);

        if (data.httpStatus === "OK") {
          this.senddata.ownerApplicant = true;
          this.senddata.frid = data.data;
          this.router.navigate(['/home']);
        }
      });
    }
  }


  viewDetail(status: string, frId: string) {
    this.senddata.frid = frId;
    // if (status == COMMONCONSTANTS.Status_Documents_Uploaded) {
    //   this.router.navigate(['/supportView']);
    // } else if (status === COMMONCONSTANTS.Status_InitialDepositedAssigned1hierarchy || status ===
    //   COMMONCONSTANTS.Status_Approval_Hierarchy2nd || status ===
    //   COMMONCONSTANTS.Status_Approval_Hierarchy3rd || status ===
    //   COMMONCONSTANTS.Status_Approval_Hierarchy4th || status ===
    //   COMMONCONSTANTS.Status_Rejection_Hierarchy2nd || status ===
    //   COMMONCONSTANTS.Status_Rejection_Hierarchy3rd || status ===
    //   COMMONCONSTANTS.Status_Rejection_Hierarchy4th || status == COMMONCONSTANTS.Status_PendingPayment || status == COMMONCONSTANTS.Status_PaymentCompleted || status == COMMONCONSTANTS.Status_DSAppliedRequestApproved
    //   || status == COMMONCONSTANTS.Status_Request_Released || status == COMMONCONSTANTS.Status_NocFilled || status == COMMONCONSTANTS.Status_InitialDepositedAssignedNOCDept || status == COMMONCONSTANTS.Status_Rejected || status == COMMONCONSTANTS.Status_DSPending) {
    //   this.router.navigate(['/viewNocPage']);
    // } else if (status == COMMONCONSTANTS.Status_Final_Form_Submit) {
    //   this.router.navigate(['/secondView']);
    // } else if (status == COMMONCONSTANTS.Status_OwnerAssigned) {
    //   this.senddata.architectView = false;
    //   this.router.navigate(['/OwnerApplicantDetials']);
    // } else if(status == COMMONCONSTANTS.Status_AcceptByArchitect){
    //   this.router.navigate(['/form/new-first-component']);
    // }else{
    //   this.router.navigate(['/NewFormView']);
    // }
    this.router.navigate(['/OwnerApplicantDetials']);

  }

}
