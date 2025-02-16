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
  isCheckeds = false;  // This controls the checkbox status
  isTrues = false;     // Example variable for message condition
  messages = "Please enter a valid email";  // Example message

  
  emailopen(){
     if (this.isCheckeds) {
      this.isCheckeds = false;
     }
     else {
      this.isCheckeds = true;
     }
  }

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

/////masking adhar card
  // Method to mask Aadhaar number in the format xxxx xxxx 9012
  maskAadhaar(aadhaar: string): string {
    if (aadhaar && aadhaar.length >= 12) {
      // Mask first 8 digits as 'xxxx xxxx' and leave last 4 digits as is
      const maskedPart = aadhaar.slice(0, 8).replace(/\d/g, 'x');  // Mask the first 8 digits
      const lastFourDigits = aadhaar.slice(-4);  // Get the last 4 digits
      return `${maskedPart.slice(0, 4)} ${maskedPart.slice(4)} ${lastFourDigits}`;  // Format as 'xxxx xxxx 9012'
    }
    return aadhaar;  // Return as is if it's less than 12 digits
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
  addintionalOwner: boolean = true; // To show additional owners
  hierarchyId:any;
  hierarchyUsersName:any;

  ngOnInit(): void {
    this.hierarchyId = localStorage.getItem('hierarchyId');
    this.hierarchyUsersName = localStorage.getItem('hierarchyUserName');

    this.viewOwner();
    this.viewOwnerDashboard();
    this.createForm();
    this.addintionalOwner = false;
    this.removeOwner(0);
  }


  dashboardDetails: any;
  viewOwnerDashboard() {
    this.service.getDeptDashboard(this.apiConstant.GetOwnerDashboard, this.hierarchyUsersName).subscribe((res: any) => {
      console.log("**************", res);
      if (res.httpStatus === "OK") {
        this.dashboardDetails = res.data;
      }
    });
  }


  viewOwner() {
    // this.senddata.hierarchyUserName
    // "df@asdg.in"
    this.service.getButtonDetails(this.apiConstant.GetOwnerByEmail,this.hierarchyUsersName).subscribe((res: any) => {
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

          this.AddDetails();

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
          // this.senddata.frid = data.name;
          localStorage.setItem('name',data.name),
          localStorage.setItem('frid', data.data);  
          this.router.navigate(['/home']);
        }
      });
    }
  }


  viewDetail(consultantName:string,status: string, frId: string) {
    console.log(consultantName);
    localStorage.setItem("requestid",consultantName);
    localStorage.setItem("frid",frId);
    localStorage.setItem("paymentType","fileNew");
    localStorage.setItem("ownerCall",true.toString());
    // localStorage.setItem("disablePullBack",true.toString());
    // localStorage.setItem("status",status);
   
    // this.senddata.requestid = consultantName;
    // this.senddata.frid = frId;
    // this.senddata.paymentType = "fileNew";
    if (status == COMMONCONSTANTS.Status_Documents_Uploaded) {
      this.router.navigate(['/supportView']);
    } else if (status === COMMONCONSTANTS.Status_InitialDepositedAssigned1hierarchy || status ===
      COMMONCONSTANTS.Status_Approval_Hierarchy2nd || status ===
      COMMONCONSTANTS.Status_Approval_Hierarchy3rd || status ===
      COMMONCONSTANTS.Status_Approval_Hierarchy4th || status ===
      COMMONCONSTANTS.Status_Rejection_Hierarchy2nd || status ===
      COMMONCONSTANTS.Status_Rejection_Hierarchy3rd || status ===
      COMMONCONSTANTS.Status_Rejection_Hierarchy4th || status == COMMONCONSTANTS.Status_PendingPayment || status == COMMONCONSTANTS.Status_PaymentCompleted || status == COMMONCONSTANTS.Status_DSAppliedRequestApproved
      || status == COMMONCONSTANTS.Status_Request_Released || status == COMMONCONSTANTS.Status_NocFilled || status == COMMONCONSTANTS.Status_InitialDepositedAssignedNOCDept || status == COMMONCONSTANTS.Status_Rejected || status == COMMONCONSTANTS.Status_DSPending) {
      this.router.navigate(['/viewNocPage']);
    } else if (status == COMMONCONSTANTS.Status_Final_Form_Submit || status == COMMONCONSTANTS.Status_Form_Submitted_GIS_Pending) {
      this.router.navigate(['/secondView']);
    } else if (status == COMMONCONSTANTS.Status_OwnerAssigned) {
      this.senddata.architectView = true;
      this.router.navigate(['/OwnerApplicantDetials']);
    } else if(status == COMMONCONSTANTS.Status_AcceptByArchitect){
      this.router.navigate(['/OwnerApplicantDetials']); //Changes
    }else if (status == 'Request Released') {
      this.router.navigate(['/plintComponentView']);
    } else if (status == 'Plinth Applied' || status == 'Plinth Payment Completed & Inspection Schedule' || status == 'Plinth Approval Hierachy - 2nd' || status == 'Plinth Rejection Hierachy - 2nd' || status == 'Plinth Ds Pending' || status == 'Plinth Ds Applied - Plinth Approved' || status == 'Plinth Released' || status == 'Plinth Initial Deposite' || status == 'Plinth Rejected') {
      this.router.navigate(['/plintComponentView']);
    } else if (status == "Plinth Released") {
      this.router.navigate(['/plintComponentView']);
    } else if (status == 'Occupancy Applied' || status == 'Occupancy Noc Submit' || status == 'Occupancy Payment Completed & Assigned to Noc Dept' || status == 'Occupany Initial Deposite' || status == 'Occupancy Payment Completed & Inspection Schedule' || status == 'Occupancy Approval Hierachy - 2nd' || status == 'Occupancy Approval Hierachy - 3nd' || status == 'Occupancy Rejection Hierachy - 2nd' || status == 'Occupancy Rejection Hierachy - 3nd' || 
      status == 'Occupancy Pending For payment' || status == 'Occupancy Payment Completed' || status == 'Occupancy Ds Pending' || status == 'Occupancy Ds Applied - Occupancy Approved' || status == 'Occupancy Released' || status == 'Occupancy Rejected') {
      this.router.navigate(['/OccupancyComponentView']);
    } else{
      this.router.navigate(['/OwnerApplicantDetials']);
    }
    // this.router.navigate(['/OwnerApplicantDetials']);

  }


}
