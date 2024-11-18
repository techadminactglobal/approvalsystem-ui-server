
import { Component, OnInit } from '@angular/core';
import { SendData } from 'src/app/SendData';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { AuthService } from 'src/app/services/auth.service';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';
import { Router } from '@angular/router';
import { __values } from 'tslib';
import { COMMONCONSTANTS } from 'src/app/CONSTANTS/constants';
import { LOGGED_IN } from 'src/app/actions/auth.actions';
import { ColorManager } from 'pdfjs-dist/types/src/display/editor/tools';


@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {

  apiConstant = API_PATH;

  PaymentForm!: FormGroup;


  hideSubmit: boolean = false;
  PaymentOption: any;
  data: any;
  amount: any;
  charge1: any;
  charge2: any;
  charge3: any;
  charge4: any;
  charge5: any;
  comment: any;
  currentStatus: any;
  hidePaymentButton: boolean = false;
  viewCharge1: boolean = false;
  viewCharge2345: boolean = false;

  fullName: any;
  address: any;
  email: any;
  paymentDate: any;
  basicAddress: any;
  userName: any;
  transactionNo: any;
  paymentTypeMethod: any;
  paymentRespect: any;
  ReceptNo: any;
  professionlType: any;
  dateofBirth: any;
  genderDetails: any;
  createdDateDetails: any;
  contactNoDetails: any;




  constructor(
    private service: commonService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder, public senddata: SendData) {

  }

  ngOnInit(): void {
    this.createForm();

    this.service.getButtonDetails(this.apiConstant.Payment_Mode, this.senddata.paymentType).subscribe((data: any) => {
      this.PaymentOption = data.data;
      console.log(this.PaymentOption, 'Payment Option');

    });

    if (this.senddata.paymentType == "regNew") {
      let request: any = { "name": this.senddata.requestid }
      this.service.getDataService(this.apiConstant.GET_DETAILS, request).subscribe((data: any) => {

        this.currentStatus = data.consultantDetailModel.statusId;
        let requestJson = {
          "userName": this.senddata.requestid,
          "referenceId": "regNew"
        }

        this.service.getDataService(this.apiConstant.view_Amount, requestJson).subscribe((data: any) => {
          console.log(data);
          let tempArr: any[] = data.data.PaymentDetailsList;
          tempArr.forEach((element) => {
            if (element.amountType === "Security Deposite" && this.currentStatus == 1) {
              this.amount = data.data.paymentCharges.charge1;
              this.charge1 = data.data.paymentCharges.charge1;
              this.comment = element.amountType;
              this.viewCharge1 = true;
              this.viewCharge2345 = false
              this.PaymentForm.patchValue({ comment: this.comment, amount: this.amount });
            } else if (element.amountType === "Final Payment" && this.currentStatus == 29) {
              this.amount = data.data.paymentCharges.charge2 + data.data.paymentCharges.charge3 + data.data.paymentCharges.charge4 + data.data.paymentCharges.charge5;
              this.charge1 = data.data.paymentCharges.charge1;
              this.charge2 = data.data.paymentCharges.charge2;
              this.charge3 = data.data.paymentCharges.charge3;
              this.charge4 = data.data.paymentCharges.charge4;
              this.charge5 = data.data.paymentCharges.charge5;
              this.comment = element.amountType;
              this.viewCharge1 = true;
              this.viewCharge2345 = true;
              this.PaymentForm.patchValue({ comment: this.comment, amount: this.amount });
            }
          });

        });
      });
    } else if (this.senddata.paymentType == "fileNew") {

      this.service.getButtonDetails(this.apiConstant.newFORM_VIEW, this.senddata.requestid).subscribe((data: any) => {
        console.log(data);
        this.currentStatus = data.basicInfo.status;

        let requestJson = {
          "frId": this.senddata.frid,
          "fileNo": this.senddata.requestid,
          "referenceId": "fileNew"
        }
        this.service.getDataService(this.apiConstant.view_Amount, requestJson).subscribe((data: any) => {
          console.log(data);
          let tempArr: any[] = data.data.PaymentDetailsList;
          tempArr.forEach((element) => {
            if ((element.amountType === "File Security Deposite" && this.currentStatus == COMMONCONSTANTS.Status_NocFilled) 
              || (element.amountType === "File Security Deposite" && this.currentStatus == COMMONCONSTANTS.Status_Final_Form_Submit)) {
              this.amount = data.data.paymentCharges.charge1;
              this.charge1 = data.data.paymentCharges.charge1;
              this.comment = element.amountType;
              this.viewCharge1 = true;
              this.viewCharge2345 = false
              this.PaymentForm.patchValue({ comment: this.comment, amount: this.amount });
            } else if (element.amountType === "File Processing Fee" && this.currentStatus == COMMONCONSTANTS.Status_PendingPayment) {
              this.amount = data.data.paymentCharges.charge2 + data.data.paymentCharges.charge3 + data.data.paymentCharges.charge4 + data.data.paymentCharges.charge5;
              this.charge1 = data.data.paymentCharges.charge1;
              this.charge2 = data.data.paymentCharges.charge2;
              this.charge3 = data.data.paymentCharges.charge3;
              this.charge4 = data.data.paymentCharges.charge4;
              this.charge5 = data.data.paymentCharges.charge5;
              this.comment = element.amountType;
              this.viewCharge1 = true;
              this.viewCharge2345 = true;
              this.PaymentForm.patchValue({ comment: this.comment, amount: this.amount });
            }
          });

        });


      });
    }else if (this.senddata.paymentType == "plinthNew"){
      let requestJson = {
        "frId": this.senddata.frid,
        "fileNo": this.senddata.requestid,
        "referenceId": "plinthNew"
      }
      this.service.getDataService(this.apiConstant.view_Amount, requestJson).subscribe((data: any) => {
        console.log(data);
        this.amount = data.data.PaymentDetailsList[0].amount;
              this.charge1 = data.data.PaymentDetailsList[0].amount;
              this.comment = data.data.PaymentDetailsList[0].amountType;
              this.viewCharge1 = true;
              this.viewCharge2345 = false
              this.PaymentForm.patchValue({ comment: this.comment, amount: this.amount });
      });
    }
    
    
    
    
    else if (this.senddata.paymentType == "OC"){

      this.service.getButtonDetails(this.apiConstant.newFORM_VIEW, this.senddata.requestid).subscribe((data: any) => {
        console.log(data);
        this.currentStatus = data.basicInfo.status;

      let requestJson = {
        "frId": this.senddata.frid,
        "fileNo": this.senddata.requestid,
        "referenceId": "OCNew"
      }
      this.service.getDataService(this.apiConstant.view_Amount, requestJson).subscribe((data: any) => {
        console.log(data);
        let tempArr: any[] = data.data.PaymentDetailsList;
        
        tempArr.forEach((element) => {          
          if ((element.amountType === "OC Security Deposite" && this.currentStatus == "Occupancy Applied")
            ||(element.amountType === "OC Security Deposite" && this.currentStatus == "Occupancy Noc Submit")
        ) {
            this.amount = data.data.paymentCharges.charge1;
            this.charge1 = data.data.paymentCharges.charge1;
            this.comment = element.amountType;
            this.viewCharge1 = true;
            this.viewCharge2345 = false
            this.PaymentForm.patchValue({ comment: this.comment, amount: this.amount });
          } else if (element.amountType === "OC Final Payment" && this.currentStatus == "Occupancy Pending For payment") {
            this.amount = data.data.paymentCharges.charge2 + data.data.paymentCharges.charge3 + data.data.paymentCharges.charge4 + data.data.paymentCharges.charge5;
            this.charge1 = data.data.paymentCharges.charge1;
            this.charge2 = data.data.paymentCharges.charge2;
            this.charge3 = data.data.paymentCharges.charge3;
            this.charge4 = data.data.paymentCharges.charge4;
            this.charge5 = data.data.paymentCharges.charge5;
            this.comment = element.amountType;
            this.viewCharge1 = true;
            this.viewCharge2345 = true;
            this.PaymentForm.patchValue({ comment: this.comment, amount: this.amount });
          }
        });

      });
    }
  
  )};


  }


  createForm() {
    this.PaymentForm = this.fb.group({

      comment: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      // fileNo:[this.senddata.requestid , [Validators.required]],
      // frId:[this.senddata.frid , [Validators.required]],
    })
  }




  submitReg() {
    console.log(this.PaymentForm.value);

    if (this.PaymentForm.invalid) {
      alert("Please fill all the details properly..");
      return;
    } else {
      let request = {};
      if (this.senddata.paymentType == "regNew") {
        request = {
          "userName": this.senddata.requestid,
          "amount": this.amount
        }
      } else if (this.senddata.paymentType == "fileNew") {
        request = {
          "fileNo": this.senddata.requestid,
          "frId": this.senddata.frid,
          "amount": this.amount
        }
      }else if (this.senddata.paymentType == "plinthNew") {
        request = {
          "fileNo": this.senddata.requestid,
          "frId": this.senddata.frid,
          "amount": this.amount
        }
      }
      else if (this.senddata.paymentType == "OC") {
        request = {
          "fileNo": this.senddata.requestid,
          "frId": this.senddata.frid,
          "amount": this.amount
        }
      }
      console.log(request, 'request');


      this.service.getDataService(this.apiConstant.prepre_Gateway, request).subscribe((data: any) => {
        console.log(data);
        if (data != null) {

          this.senddata.requestid = this.senddata.requestid;
          this.senddata.frid = this.senddata.frid;
          this.senddata.amount = this.amount;
          this.senddata.paymentId = data.paymentId;
          this.senddata.comment = this.comment;

          this.router.navigate(['paymentReceipt'])

        }

      });


    }

    // //start hierarchy...
    // if(this.currentStatus == 1 || this.currentStatus == 'Final Form Submit' && )

  }





  // letter(){
  //   this.router.navigate(['/paymentLetter'])
  // }


}










