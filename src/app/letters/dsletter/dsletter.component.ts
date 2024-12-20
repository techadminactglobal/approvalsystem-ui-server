import { Component, ViewChild, ElementRef } from '@angular/core';
import { SendData } from 'src/app/SendData';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';
import { Router } from '@angular/router';
import { __values } from 'tslib';
import { DatePipe } from '@angular/common';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-dsletter',
  templateUrl: './dsletter.component.html',
  styleUrls: ['./dsletter.component.scss']
})
export class DsletterComponent {

  @ViewChild('pdfTable', { static: false }) pdfTable!: ElementRef;

  // PaymentLetter!: FormGroup;
  apiConstant = API_PATH;
  dateofBirth: any;
  address: any;
  userName: any;
  fullName: any;
  FileNo: any;
  FrId: any;
  initiatedDate: any;
  planType:any;

  licenseNum: any;
  FileCreatedDate: any;
  siteAddress: any;
  approveName: any;
  workDate: any;
  fileCreatedBy: any;
  HierachyRemark: any;
  RegistrationApproveName: any;
  RegistrationWorkDate: any;
  RegistrationHierachyRemark: any;


  paymentType: any;
  letterType: any;
  currentDate!: Date;


  constructor(
    private service: commonService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public senddata: SendData,
    private datePipe: DatePipe) {

  }
  requestid:any;
  frids:any;
  comment:any;

  ngOnInit(): void {
    this.paymentType = localStorage.getItem('paymentType')
    this.requestid = localStorage.getItem('requestid');
    this.comment = localStorage.getItem('comment');
    this.frids = localStorage.getItem('frid');
 

    this.currentDate = new Date();
    // let request = {};
    // if (this.senddata.paymentType == "regNew") {
    //   request = {
    //     "userName": this.senddata.requestid,
    //     "amount": this.senddata.amount,
    //     "paymentId": this.senddata.paymentId,
    //     "transactionNumber": 1111111111,
    //     "status": "Success",
    //     "paymentRequestFor": this.senddata.comment
    //   }
    // } else if (this.senddata.paymentType == "fileNew") {
    //   request = {
    //     "fileNo": this.senddata.requestid,
    //     "amount": this.senddata.amount,
    //     "paymentId": this.senddata.paymentId,
    //     "transactionNumber": 1111111111,
    //     "status": "Success",
    //     "paymentRequestFor": this.senddata.comment
    //   }
    // }

    let request = {};
    this.paymentType = this.paymentType;
    console.log(this.paymentType,"payment type..");
    
    if (this.paymentType == "regNew") {
      request = {
        "userName": this.requestid
      }
    } else if (this.paymentType == "fileNew" || this.paymentType == "plinthNew" || this.paymentType === "OC") {
      request = {
        "fileNo": this.requestid,
        "frId": this.frids
      }
    }
    this.service.getDataService(this.apiConstant.update_Letter, request).subscribe((data: any) => {
      console.log(data);

      if (data != null) {

        if (this.paymentType == "regNew") {
          console.log(data, "aaaaaa generating letter");
          console.log(data.data.HierarchyDetails, "HierarchyDetails......")

          this.letterType = data.data.HierarchyDetails.hierachyFlowProcess;

          this.userName = data.data.BasicDetails.consultantName;
          this.fullName = data.data.BasicDetails.salutation + " " + data.data.BasicDetails.firstName + " " + data.data.BasicDetails.middleName + " " + data.data.BasicDetails.lastName;
          this.address = data.data.AddressDetails.addres + " " + data.data.AddressDetails.district + " " + data.data.AddressDetails.state + " " + data.data.AddressDetails.pinCode;
          this.dateofBirth = data.data.BasicDetails.dob;
          this.initiatedDate = data.data.BasicDetails.createdDate;
          this.licenseNum = data.data.HierarchyDetails.hierachyUserName;

          this.RegistrationApproveName = data.data.HierarchyDetails.hierachyUserName;
          this.RegistrationWorkDate = data.data.HierarchyDetails.workDate;
          this.RegistrationHierachyRemark = data.data.HierarchyDetails.hierachyRemark;



        } else if (this.paymentType == "fileNew" || this.paymentType == "plinthNew" || this.paymentType == "OC") {

          if (this.paymentType == "plinthNew") {
            this.letterType = "plinthAccept";
            this.paymentType = this.paymentType;
          } else if (this.paymentType == "OC") {
            this.letterType = "OCAccept";
            this.paymentType = this.paymentType;
          } else if(this.paymentType == "fileNew" && !data.data.HierarchyDetails){
            this.letterType = "Accepted && Closed";
          }else{
            this.letterType = data.data.HierarchyDetails.hierachyFlowProcess;
          }

          this.FileNo = data.data.fileDetails.fileNo;
          this.planType=data.data.fileDetails.planType;
          this.FrId = data.data.fileDetails.frId;
          this.fileCreatedBy = data.data.fileDetails.fileCreatedBy;
          this.FileCreatedDate = data.data.fileDetails.fcreatedTime;

          if(!data.data.HierarchyDetails){
            this.approveName = data.data.fileDetails.assignedArchitect,
            this.workDate = new Date();
            this.HierachyRemark = "";
          }else{
          this.approveName = data.data.HierarchyDetails.hierachyUserName;
          this.workDate = data.data.HierarchyDetails.workDate;
          this.HierachyRemark = data.data.HierarchyDetails.hierachyRemark;
          }


          this.siteAddress = data.data.SiteAddress.address + " " + data.data.SiteAddress.district + " " + data.data.SiteAddress.state + " " + data.data.SiteAddress.pinCode;

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
            addressParts.push(primaryAddress.pinCode);
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
            addressParts.push(secondaryAddress.pinCode);
          }

          this.address = addressParts.join("");



          // this.userName = data.data.PaymentDetails.fileNo + " / " + data.data.PaymentDetails.frId;



          let fullNames: string[] = [];
          Object.values(basicDetails).forEach((applicantDetails: any) => {
            if (applicantDetails.firstName) {
              fullNames.push(applicantDetails.salutation + applicantDetails.firstName + applicantDetails.middleName + applicantDetails.lastName);
            }
          });
          this.fullName = fullNames.join(", ");
          console.log("Full Names:", fullNames);



        }

      }

    });


    setTimeout(() => {
      this.letter();
    }, 2000);



  }

  uploadFile(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    var inputValue = ''
    reader.onload = (event: any) => {
      inputValue = event.target.result;




    }
  }



  fileData: any;
  letter() {

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

      // pdf.save('paymentReceipt.pdf');

      let dataURL = pdf.output('datauristring');

      // Remove the prefix from the data URL
      dataURL = dataURL.replace(/^data:application\/pdf;filename=generated\.pdf;base64,/, '');

      // Assign the modified data URL to fileData
      this.fileData = dataURL;
      // console.log(this.fileData,"file data....;l....");
      this.saveLetter();

    }).catch((error) => {
      console.error("Error generating PDF:", error);
    });
  }


  saveLetter() {
    var json:any;
    if(this.paymentType == "plinthNew"){
      json = {
        "docFileName": "Ds letter",
        "docType": "Ds letter",
        "docByteStream": this.fileData,
        "docName": this.senddata.comment
  
      };
    }else{
    json = {
      "docFileName": this.comment,
      "docType": this.comment,
      "docByteStream": this.fileData,
      "docName": this.comment

    };
  }
    console.log("JSON.....: ", json);
    this.service.postService(this.apiConstant.downloadUUID, json).subscribe((res: any) => {
      console.log("data =================> ", res);
      if (!res.docUUID) {
        return;
      }

      console.log("uuid: " + res.docUUID);


      let json1 = {};
      console.log(this.paymentType, "payemtntyoaSDBvjk");

      if (this.paymentType == "regNew") {
        json1 = {
          "userName": this.requestid,
          "letterType": "Letter Accepted",
          "letterUinqueId": res.docUUID
        };
      } else if (this.paymentType == "fileNew") {
        json1 = {
          "fileNo": this.requestid,
          "frId": this.frids,
          "letterType": "Letter Accepted",
          "letterUinqueId": res.docUUID
        };

      } else if (this.paymentType == "plinthNew") {
        json1 = {
          "fileNo": this.requestid,
          "frId": this.frids,
          "letterType": "plinthAccept",
          "letterUinqueId": res.docUUID
        };
      } else if (this.paymentType == "OC") {
        json1 = {
          "fileNo": this.requestid,
          "frId": this.frids,
          "letterType": "OCAccept",
          "letterUinqueId": res.docUUID
        };
      }

      this.service.postService(this.apiConstant.LetterSave, json1).subscribe((res: any) => {
        console.log("vishal data =================> ", res);
        setTimeout(() => {
          if (this.paymentType == "OC") {
            this.router.navigate(['/OccupancyDashborad']);
          } else if (this.paymentType == "OC") {
            this.router.navigate(['/departmentDashboard']);
          }else{
            this.router.navigate(['/dashboard'])
          }
        }, 2000);
      });


    });















  }
  // let reader = new FileReader();
  // // reader.readAsDataURL(file);
  // var fileData = ''
  // reader.onload = (event: any) => {
  //   fileData = event.target.result;

  //   // const json = {
  //   //   "docFileName": fileData.name.split(".")[0],
  //   //   "docContentType": fileData.name.split(".")[1],
  //   //   "docByteStream": inputValue.split(",")[1],
  //   //   "docName": fileData.name.split(".")[0]
  //   // }

  //       const json = {
  //       "docFileName": this.senddata.comment,
  //       "docType": this.senddata.comment,
  //       "docByteStream": this.fileData,
  //       "docName": this.senddata.comment

  //     };
  //     console.log("Logging fileData:", this.fileData);

  //   this.service.postService(this.apiConstant.downloadUUID, json).subscribe((res: any) => {
  //         console.log("data =================> ", res);
  //       if (!res.docUUID) {
  //         return;
  //       }

  //       console.log("uuid:letter.... " + res.docUUID);

  //     let json1 = {};
  //     console.log(this.senddata.paymentType,"payemtntyoaSDBvjk");

  //     if (this.senddata.paymentType == "regNew") {
  //       json1 = {
  //         "letterType":"Letter Accepted"
  //       };
  //     } else if (this.senddata.paymentType == "fileNew") {
  //       json1 = {
  //         "fileNo": this.senddata.requestid,
  //         "frId": this.senddata.frid,
  //         "letterType":"Letter Accepted",
  //         "letterUinqueId":res.docUUID
  //         };
  //         this.service.postService(this.apiConstant.LetterSave, json1).subscribe((res: any) => {
  //           console.log("vishal data =================> ", res);

  //         });
  //     }
  //   });


  // }



















  //   const json = {
  //     "docFileName": this.senddata.comment,
  //     "docType": this.senddata.comment,
  //     "docByteStream": this.fileData,
  //     "docName": this.senddata.comment

  //   };
  //   console.log("Logging fileData:", this.fileData);


  //   this.service.postService(this.apiConstant.downloadUUID, json).subscribe((res: any) => {
  //     console.log("data =================> ", res);
  //     if (!res.docUUID) {
  //       return;
  //     }

  //     console.log("uuid:letter.... " + res.docUUID);

  //   let json1 = {};
  //   console.log(this.senddata.paymentType,"payemtntyoaSDBvjk");

  //   if (this.senddata.paymentType == "regNew") {
  //     json1 = {
  //       "letterType":"Letter Accepted"
  //     };
  //   } else if (this.senddata.paymentType == "fileNew") {
  //     json1 = {
  //       "fileNo": this.senddata.requestid,
  //       "frId": this.senddata.frid,
  //       "letterType":"Letter Accepted",
  //       "letterUinqueId":res.docUUID
  //       };
  //       this.service.postService(this.apiConstant.LetterSave, json1).subscribe((res: any) => {
  //         console.log("vishal data =================> ", res);

  //       });
  //   }

  // });





  // }


}
