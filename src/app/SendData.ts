import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class SendData {
    amount: any;
  paymentId: any;
  comment: any;
  viewDsWork: any;
  status: any;
  fireNoc: boolean=false;
  NocDept:boolean=false;
  NocDeptDashboard: boolean=false;
  callFrom: any='';
  dwgReupload: boolean=false;
  ownerSave: boolean = false;
  ownerApplicant: boolean=false;
  architectView: boolean = false;
  debard:boolean=false;
  expired :boolean=false;

    constructor () { }

    public datatemp= 0;
    public requestid:any =0 ;
    public frid:any =0;
    public paymentFor:any;
    public paymentType :any;

    // 145	21052024-0001

    public hierarchyId:any ;
    public hierarchyUserName:any;
    public professionalType:any;

    public totalSize =0;
    public pendingSize =0;
    public approveSize =0;
    public rejectSize =0;

    dialog:boolean=false;
    datasave :boolean=false;
    hideSubmit:boolean=false;

    formOne:boolean=false;
    docDetails: boolean=false;
    formTwo:boolean =false;
    fireNocForm:boolean = false;
    regForm: boolean = false;
    plinthForm:boolean = false;
    OCForm: boolean = false;

}