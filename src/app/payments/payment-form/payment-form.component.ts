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
  planType: any;




  constructor(
    private service: commonService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder, public senddata: SendData) {

  }
   paymentType:any;
   requestId:any;
   frids:any;
   amountType:any;
  ngOnInit(): void {
    this.paymentType = localStorage.getItem('paymentType');
    this.requestId = localStorage.getItem('requestid');
    this.frids = localStorage.getItem('frid');
    this.amountType = localStorage.getItem('amount');
    this.createForm();

    this.service.getButtonDetails(this.apiConstant.Payment_Mode, this.paymentType).subscribe((data: any) => {
      this.PaymentOption = data.data;
      console.log(this.PaymentOption, 'Payment Option');

    });

    if(this.paymentType=="RenewalConsultant"){

      let request: any = { "name": this.requestId }

      this.service.getDataService(this.apiConstant.GET_DETAILS, request).subscribe((data: any) => {



        this.currentStatus = data.consultantDetailModel.statusId;

        let requestJson = {

          "userName": this.requestId,

          "referenceId": "RenewalConsultant"

        }



        this.service.getDataService(this.apiConstant.view_Amount, requestJson).subscribe((data: any) => {

          console.log(data);

          let tempArr: any[] = data.data.PaymentDetailsList;

          tempArr.forEach((element) => {

            if (element.amountType === "Renewal consultant Fee") {

              this.amount = data.data.paymentCharges.charge1;

              this.charge1 = data.data.paymentCharges.charge1;

              this.comment = element.amountType;

              this.viewCharge1 = true;

              this.viewCharge2345 = false

              this.PaymentForm.patchValue({ comment: this.comment, amount: this.amount });

            } 

          });



        });

      });

    



    }else if (this.paymentType == "regNew") {
      let request: any = { "name": this.requestId }
      this.service.getDataService(this.apiConstant.GET_DETAILS, request).subscribe((data: any) => {

        this.currentStatus = data.consultantDetailModel.statusId;
        let requestJson = {
          "userName": this.requestId,
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
    } else if (this.paymentType == "fileNew") {

      this.service.getButtonDetails(this.apiConstant.newFORM_VIEW, this.requestId).subscribe((data: any) => {
        console.log(data);
        this.currentStatus = data.basicInfo.status;
this.planType=data.basicInfo.planType;
        let requestJson = {
          "frId": this.frids,
          "fileNo": this.requestId,
          "referenceId": "fileNew"
        }
        this.service.getDataService(this.apiConstant.view_Amount, requestJson).subscribe((data: any) => {
          console.log(data);
          let tempArr: any[] = data.data.PaymentDetailsList;
          tempArr.forEach((element) => {
            if ((element.amountType === "File Security Deposite" && this.currentStatus == COMMONCONSTANTS.Status_NocFilled && this.planType=="SANCTION") 
              || (element.amountType === "File Security Deposite" && this.currentStatus == COMMONCONSTANTS.Status_Final_Form_Submit&& this.planType=="SANCTION")) {
              this.amount = data.data.paymentCharges.charge1;
              this.charge1 = data.data.paymentCharges.charge1;
              this.comment = element.amountType;
              this.viewCharge1 = true;
              this.viewCharge2345 = false
              this.PaymentForm.patchValue({ comment: this.comment, amount: this.amount});
            } else if ((element.amountType === "File Processing Fee" && this.currentStatus == COMMONCONSTANTS.Status_PendingPayment)
              ||(element.amountType === "File Processing Fee" && this.currentStatus == COMMONCONSTANTS.Status_NocFilled && this.planType!="SANCTION") 
              || (element.amountType === "File Processing Fee" && this.currentStatus == COMMONCONSTANTS.Status_Final_Form_Submit&& this.planType!="SANCTION")) {
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
    }else if (this.paymentType == "plinthNew"){
      let requestJson = {
        "frId": this.frids,
        "fileNo": this.requestId,
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
    
    
    
    
    else if (this.paymentType == "OC"){

      this.service.getButtonDetails(this.apiConstant.newFORM_VIEW, this.requestId).subscribe((data: any) => {
        console.log(data);
        this.currentStatus = data.basicInfo.status;

      let requestJson = {
        "frId": this.frids,
        "fileNo": this.requestId,
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
      if(this.paymentType=="RenewalConsultant"){

        request = {

          "userName": this.requestId,

          "amount": this.amount,

          "comment":this.comment

        }

      }

      if (this.paymentType == "regNew") {
        request = {
          "userName": this.requestId,
          "amount": this.amount
        }
      } else if (this.paymentType == "fileNew") {
        request = {
          "fileNo": this.requestId,
          "frId": this.frids,
          "amount": this.amount
        }
      }else if (this.paymentType == "plinthNew") {
        request = {
          "fileNo": this.requestId,
          "frId": this.frids,
          "amount": this.amount
        }
      }
      else if (this.paymentType == "OC") {
        request = {
          "fileNo": this.requestId,
          "frId": this.frids,
          "amount": this.amount
        }
      }
      console.log(request, 'request');


      this.service.getDataService(this.apiConstant.prepre_Gateway, request).subscribe((data: any) => {
        console.log(data);
        if (data != null) {

          this.requestId = this.requestId;
          this.frids = this.frids;
          // this.senddata.amount = this.amount;
          // localStorage.removeItem('amount');
          // localStorage.removeItem('paymentId');
          // localStorage.removeItem('comment');
          localStorage.setItem('amount', this.amount);
          // this.senddata.paymentId = data.paymentId;
          localStorage.setItem('paymentType',this.paymentType)
         
          localStorage.setItem('paymentId', data.paymentId);
          // this.senddata.comment = this.comment;
        
          localStorage.setItem('comment',this.comment);


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










