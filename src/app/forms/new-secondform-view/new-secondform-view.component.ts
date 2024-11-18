import { AfterViewInit, Component } from '@angular/core';
import { SendData } from 'src/app/SendData';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';
import { Router } from '@angular/router';
import { COMMONCONSTANTS } from 'src/app/CONSTANTS/constants';

@Component({
  selector: 'app-new-secondform-view',
  templateUrl: './new-secondform-view.component.html',
  styleUrls: ['./new-secondform-view.component.scss']
})
export class NewSecondformViewComponent {


  apiConstant = API_PATH;

  constructor(private service: commonService, public senddata: SendData, private router: Router) { 

    // this.userName = this.senddata.requestid;
  }

noc:boolean=false;
buildingDetails :any[]=[];
geoDetails:any[]=[];
data :any;

  ngOnInit(): void {

    this.service.getButtonDetails(this.apiConstant.newFORM_VIEW, this.senddata.requestid).subscribe((data: any) => {
      if(data.basicInfo.status == COMMONCONSTANTS.Status_Final_Form_Submit 
        // || data.basicInfo.status == COMMONCONSTANTS.Status_Form_Submitted_GIS_Pending
        ){
this.noc = true;
      }
    });

    let request = {
      "fileNo": this.senddata.requestid,
      "frId": this.senddata.frid
    }
    this.service.getSecondViewDetails(this.apiConstant.SecondFORM_VIEW, request).subscribe((data: any) => {
      console.log(data, "okkkkk");
      this.data=data.data.fileRecord;
      this.geoDetails=data.data.geoCoordinate;
      this.buildingDetails = data.data.buildingFloorDetails;

     
      console.log(this.buildingDetails,"buider");



    });

  }


  
  NocForm(){
    this.router.navigate(['/nocPage']);
  }

  back(){
    this.router.navigate(['/dashboard']);
  }
  

}
