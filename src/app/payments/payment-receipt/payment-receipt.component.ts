import { Component, ViewChild, ElementRef } from '@angular/core';
import { SendData } from 'src/app/SendData';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-payment-receipt',
  templateUrl: './payment-receipt.component.html',
  styleUrls: ['./payment-receipt.component.scss']
})
export class PaymentReceiptComponent {

  // @ViewChild('')
  @ViewChild('pdfTable', { static: false }) pdfTable!: ElementRef;


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
  amount: any;
  emails: any;
  paymentUserFor: any;
  charge1: any;
  charge2: any;
  charge3: any;
  charge4: any;
  charge5: any;

  comment: any;
  apiConstant = API_PATH;
  viewCharge1: boolean = false;
  viewCharge2345: boolean = false;
  dsLetter: boolean = false;

  constructor(
    private service: commonService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder, public senddata: SendData) {

  }

  viewBuild:boolean = false;
  ngOnInit(): void {

    // let request ={};
    // this.service.getDataService(this.apiConstant.prepre_Gateway, request).subscribe((data: any) => {
    //   console.log(data);
    // if(data != null){
    let request = {};
    this.paymentUserFor = this.senddata.paymentType;

    if(this.senddata.paymentType=="RenewalConsultant"){
      request = {
        "userName": this.senddata.requestid,
        "amount": this.senddata.amount,
        "paymentId": this.senddata.paymentId,
        "transactionNumber": 754826748656187,
        "status": "Success",
        "paymentRequestFor": this.senddata.comment
      }

    }else if (this.senddata.paymentType == "regNew") {
      this.viewBuild = false;
      request = {
        "userName": this.senddata.requestid,
        "amount": this.senddata.amount,
        "paymentId": this.senddata.paymentId,
        "transactionNumber": 754826748656187,
        "status": "Success",
        "paymentRequestFor": this.senddata.comment
      }
    } else if (this.senddata.paymentType == "fileNew") {
      this.viewBuild= true;
      request = {
        "fileNo": this.senddata.requestid,
        "amount": this.senddata.amount,
        "paymentId": this.senddata.paymentId,
        "transactionNumber": 754826748656187,
        "status": "Success",
        "paymentRequestFor": this.senddata.comment
      }
    } else if (this.senddata.paymentType == "plinthNew") {
      this.viewBuild= true;
      request = {
        "fileNo": this.senddata.requestid,
        "amount": this.senddata.amount,
        "paymentId": this.senddata.paymentId,
        "transactionNumber": 754826748656187,
        "status": "Success",
        "paymentRequestFor": this.senddata.comment
      }
    } else if (this.senddata.paymentType == "OC") {
      this.viewBuild= true;
      request = {
        "fileNo": this.senddata.requestid,
        "amount": this.senddata.amount,
        "paymentId": this.senddata.paymentId,
        "transactionNumber": 754826748656187,
        "status": "Success",
        "paymentRequestFor": this.senddata.comment
      }
    }
    this.service.getDataService(this.apiConstant.update_Gateway, request).subscribe((data: any) => {
      console.log(data);

      if (data != null) {
        // this.hidePaymentButton = true;

        if (this.senddata.paymentType == "regNew" || this.senddata.paymentType=="RenewalConsultant") {
          console.log(data, "generating recipt");

          this.fullName = data.data.BasicDetails.salutation + " " + data.data.BasicDetails.firstName + " " + data.data.BasicDetails.middleName + " " + data.data.BasicDetails.lastName;
          this.address = data.data.AddressDetails.addres + " " + data.data.AddressDetails.district + " " + data.data.AddressDetails.state + " " + data.data.AddressDetails.pinCode;
          this.userName = data.data.PaymentDetails.userName;
          this.paymentDate = data.data.PaymentDetails.paymentSuccessDate;
          this.transactionNo = data.data.PaymentDetails.transactionRefNo;
          this.email = data.data.BasicDetails.email;


          this.amount = data.data.PaymentDetails.amount;
          this.paymentTypeMethod = data.data.PaymentDetails.paymentMethod;
          this.paymentRespect = data.data.PaymentDetails.paymentRespective;
          this.ReceptNo = data.data.PaymentDetails.reciptNo;

          if (this.senddata.comment == "Security Deposite" || this.senddata.comment == "Renewal consultant Fee") {
            this.viewCharge1 = true;
            this.viewCharge2345 = false
          } else if (this.senddata.comment == "Final Payment") {
            this.viewCharge1 = true;
            this.viewCharge2345 = true;
          }
          this.charge1 = data.data.PaymentDetails.charge1;
          this.charge2 = data.data.PaymentDetails.charge2;
          this.charge3 = data.data.PaymentDetails.charge3;
          this.charge4 = data.data.PaymentDetails.charge4;
          this.charge5 = data.data.PaymentDetails.charge5;




          this.professionlType = data.data.BasicDetails.professionalType;
          this.dateofBirth = data.data.BasicDetails.dob;
          this.genderDetails = data.data.BasicDetails.gender;
          this.createdDateDetails = data.data.BasicDetails.createdDate;
          this.contactNoDetails = data.data.BasicDetails.contactNo;









        } else if (this.senddata.paymentType == "fileNew" || this.senddata.paymentType == "plinthNew" || this.senddata.paymentType == "OC") {

          this.paymentDate = data.data.PaymentDetails.paymentSuccessDate;
          this.transactionNo = data.data.PaymentDetails.transactionRefNo;
          this.amount = data.data.PaymentDetails.amount;
          this.paymentTypeMethod = data.data.PaymentDetails.paymentMethod;
          this.paymentRespect = data.data.PaymentDetails.paymentRespective;
          this.ReceptNo = data.data.PaymentDetails.reciptNo;
          this.userName = data.data.PaymentDetails.frId;

          if (this.senddata.comment == "File Security Deposite" || this.senddata.comment == "Plinth Processing Fee" || this.senddata.comment == "OC Security Deposite") {
            this.viewCharge1 = true;
            this.viewCharge2345 = false
          } else if (this.senddata.comment == "File Processing Fee" || this.senddata.comment == "OC Final Payment") {
            this.viewCharge1 = true;
            this.viewCharge2345 = true;
          }
          this.charge1 = data.data.PaymentDetails.charge1;
          this.charge2 = data.data.PaymentDetails.charge2;
          this.charge3 = data.data.PaymentDetails.charge3;
          this.charge4 = data.data.PaymentDetails.charge4;
          this.charge5 = data.data.PaymentDetails.charge5;



          const basicDetails = data.data.BasicDetails;

          let primaryAddress: any = null;
          let secondaryAddress: any = null;

          Object.values(basicDetails).forEach((address: any) => {
            if (address.addressType === "Communication") {
              primaryAddress = address;
            } else if (address.addressType === "Permanent") {
              secondaryAddress = address;
            }
          });

          let addressParts: string[] = [];

          if (primaryAddress) {
            addressParts.push(primaryAddress.address);
            addressParts.push(",");
            addressParts.push(primaryAddress.district);
            addressParts.push(",");
            addressParts.push(primaryAddress.state);
            addressParts.push(",");
            addressParts.push(primaryAddress.pincode);
          }

          if (primaryAddress && secondaryAddress) {
            addressParts.push(" / ");
          }

          if (secondaryAddress) {
            addressParts.push(secondaryAddress.address);
            addressParts.push(",");
            addressParts.push(secondaryAddress.district);
            addressParts.push(",");
            addressParts.push(secondaryAddress.state);
            addressParts.push(",");
            addressParts.push(secondaryAddress.pincode);
          }

          this.address = addressParts.join("");



          let emails: string[] = [];
          Object.values(basicDetails).forEach((applicantDetails: any) => {
            if (applicantDetails.email) {
              emails.push(applicantDetails.email);
            }
          });
          this.email = emails.join(" / ");
          console.log("Emails:", emails);




          let fullNames: string[] = [];
          Object.values(basicDetails).forEach((applicantDetails: any) => {
            if (applicantDetails.firstName) {
              fullNames.push(applicantDetails.salutation + applicantDetails.firstName + applicantDetails.middleName + applicantDetails.lastName);
            }
          });
          this.fullName = fullNames.join(", ");
          console.log("Full Names:", fullNames);



          // let professionalTypes: string[] = [];
           this.professionlType ="Owner";
          // Object.values(basicDetails).forEach((applicantDetails: any) => {
            // if (applicantDetails.professionalType) {
            //   professionalTypes.push(applicantDetails.professionalType);
            // }
          // });
          // this.professionlType = professionalTypes.join(", ");
          // console.log("Professional Types:", professionalTypes);



          // let datesOfBirth: string[] = [];
          // Object.values(basicDetails).forEach((applicantDetails: any) => {
          //   if (applicantDetails.dob) {
          //     const date = new Date(applicantDetails.dob);
          //     // Check if the date is valid
          //     if (!isNaN(date.getTime())) {
          //       // Format to YYYY-MM-DD
          //       const formattedDate = date.toISOString().split('T')[0];
          //       datesOfBirth.push(formattedDate);
          //     }
          //   }
          // });
          // this.dateofBirth = datesOfBirth.join(", ");
          // console.log("Dates of Birth:", datesOfBirth);




          let createdDates: string[] = [];
          Object.values(basicDetails).forEach((applicantDetails: any) => {
            if (applicantDetails.createdDate) {
              createdDates.push(applicantDetails.createdDate);
            }
          });
          this.createdDateDetails = createdDates.join(", ");
          console.log("Created Dates:", createdDates);




          let contactNumbers: string[] = [];
          Object.values(basicDetails).forEach((applicantDetails: any) => {
            if (applicantDetails.phone) {
              contactNumbers.push(applicantDetails.phone);
            }
          });
          this.contactNoDetails = contactNumbers.join(", ");
          console.log("Contact Numbers:", contactNumbers);






        }

      }

      setTimeout(() => {
        this.downloadAsPDF();
        setTimeout(() => {
          if (this.senddata.comment == "Final Payment" || this.senddata.comment == "File Processing Fee" || this.senddata.comment == "OC Final Payment") {
            console.log("redirect to dsletter");
            this.dsLetter = true;
            // this.router.navigate(['/dsLetter']);
          }
        }, 2000);

      }, 1000);
    });
  
   

    // setTimeout(() => {
    //   this.downloadAsPDF();
    //   if(this.senddata.comment == "final payment" || this.senddata.comment == "file processing fee"){
    //     this.router.navigate(['/paymentLetter'])
    //   }
    // }, 2000);

  }


  fileData: any;
  public downloadAsPDF() {
    console.log('download...................')

    const pdfTable = this.pdfTable.nativeElement;

    if (!pdfTable) {
      console.error("PDF table element not found");
      return;
    }

    html2canvas(pdfTable).then((canvas) => {

      const pdf = new jsPDF('p', 'pt', 'letter');
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      pdf.save('paymentReceipt.pdf');

      let dataURL = pdf.output('datauristring');

      // Remove the prefix from the data URL
      dataURL = dataURL.replace(/^data:application\/pdf;filename=generated\.pdf;base64,/, '');

      // Assign the modified data URL to fileData
      this.fileData = dataURL;
      // console.log(this.fileData,"file data....;l....");
      this.saveDoc();

    }).catch((error) => {
      console.error("Error generating PDF:", error);
    });
    this.router.navigate(['/dashboard'])

  }





  // public downloadAsPDF() {
  //   console.log('Downloading PDF...');

  //   const pdfTable = document.getElementById('pdfTable'); // Get the element by ID or ref

  //   if (!pdfTable) {
  //     console.error('PDF table element not found');
  //     return;
  //   }

  //   // Wait for the table content to render, then capture it
  //   setTimeout(() => {
  //     html2canvas(pdfTable).then((canvas) => {
  //       const pdf = new jsPDF('p', 'pt', 'letter');
  //       const imgData = canvas.toDataURL('image/png');
  //       const imgWidth = pdf.internal.pageSize.getWidth();
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //       pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

  //       pdf.save('paymentReceipt.pdf');

  //       console.log('PDF downloaded successfully');
  //     }).catch((error) => {
  //       console.error('Error generating PDF:', error);
  //     });
  //   }, 1000); // Adjust delay as needed based on your content loading time
  // }



  saveDoc() {
    const json = {
      "docFileName": this.senddata.comment,
      "docType": this.senddata.comment,
      "docByteStream": this.fileData,
      "docName": this.senddata.comment

    };

    this.service.postService(this.apiConstant.downloadUUID, json).subscribe((res: any) => {
      console.log("data =================> ", res);
      if (!res.docUUID) {
        return;
      }

      console.log("uuid: " + res.docUUID);
      let json1 = {};
      if (this.senddata.paymentType == "regNew") {
        json1 = {
          "userName": this.senddata.requestid,
          "docUniqueId": res.docUUID,
          "docName": this.senddata.comment,
          "reciptNo": this.ReceptNo
        };
      } else if (this.senddata.paymentType == "fileNew") {
        json1 = {
          "fileNo": this.senddata.requestid,
          "frId": this.senddata.frid,
          "docUniqueId": res.docUUID,
          "docName": this.senddata.comment,
          "reciptNo": this.ReceptNo
        };
      } else if (this.senddata.paymentType == "plinthNew") {
        json1 = {
          "fileNo": this.senddata.requestid,
          "frId": this.senddata.frid,
          "docUniqueId": res.docUUID,
          "docName": this.senddata.comment,
          "reciptNo": this.ReceptNo
        };
      } else if (this.senddata.paymentType == "OC") {
        json1 = {
          "fileNo": this.senddata.requestid,
          "frId": this.senddata.frid,
          "docUniqueId": res.docUUID,
          "docName": this.senddata.comment,
          "reciptNo": this.ReceptNo
        };
      }


      this.service.postService(this.apiConstant.saveReceipt, json1).subscribe((res: any) => {
        console.log("data =================> ", res);

        // if(this.senddata.comment == "")

      });
    });




  }

  RegistrationView() {
    this.senddata.requestid = this.senddata.requestid;
    this.router.navigate(['/registrationView'])
  }

  ViewDashboard() {
    this.senddata.requestid = this.senddata.requestid;
    this.senddata.hierarchyId = this.senddata.hierarchyId;
    this.router.navigate(['/dashboard'])
  }

  ViewPlinthDashboard() {
    this.senddata.requestid = this.senddata.requestid;
    this.senddata.hierarchyId = this.senddata.hierarchyId;
    this.router.navigate(['/plinthDashboard'])
  }

  ViewOCDashboard() {
    this.senddata.requestid = this.senddata.requestid;
    this.senddata.hierarchyId = this.senddata.hierarchyId;
    this.router.navigate(['/OccupancyDashborad'])
  }


}
