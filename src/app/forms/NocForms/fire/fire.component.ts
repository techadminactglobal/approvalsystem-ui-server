import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { COMMONCONSTANTS } from 'src/app/CONSTANTS/constants';
import { SendData } from 'src/app/SendData';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';

@Component({
  selector: 'app-fire',
  templateUrl: './fire.component.html',
  styleUrls: ['./fire.component.scss']
})
export class FireComponent {
  @ViewChild('myModal') modal!: ElementRef;
  constructor(
    private service: commonService,
    private fb: FormBuilder,
    private router:Router,
    public senddata: SendData
  ) {  }


  pArea:any;
  cArea:any;
  cAreaFar:any;
  cPlot:any;
  bHeight:any;
  frontWidth:any;
  areaAffectedInRoadWidening:any;
  mVentilation:any;
  lcSetback:any;
  lcFar:any;
  apiConstant = API_PATH;
  geoDetails:any[]=[];
data :any;
buildingDetails :any[]=[];
  fireForm!: FormGroup;


  ngOnInit(): void {

    this.service.getButtonDetails(this.apiConstant.newFORM_VIEW, this.senddata.requestid).subscribe((data: any) => {
      console.log(data);

      this.pArea = data.plotDetails.pArea;
      this.cArea = data.plotDetails.cArea;
      this.cAreaFar = data.plotDetails.cAreaFar;
      this.bHeight = data.plotDetails.bHeight;
      this.frontWidth = data.plotDetails.frontWidth;
      this.areaAffectedInRoadWidening = data.plotDetails.areaAffectedInRoadWidening;
      this.cPlot = data.plotDetails.cPlot;
      this.mVentilation = data.plotDetails.mVentilation;
      this.lcSetback = data.plotDetails.lcSetback;
      this.lcFar = data.plotDetails.lcFar;
      this.buildForm();
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

      this.buildForm();

    });

    this.buildForm();
  }

  buildForm() {
    this.fireForm = this.fb.group({
      fileNo:[this.senddata.requestid],
      frId:[this.senddata.frid],
      geoDetails: this.fb.array([this.geoDetails]),
      buildingDetails: this.fb.array([this.buildingDetails]),
      siteDetails: this.fb.group({
        pArea:[this.pArea],
        cArea: [this.cArea],
        cAreaFar: [this.cAreaFar],
        bHeight: [this.bHeight],
        frontWidth:[this.frontWidth],
        areaAffectedInRoadWidening:[this.areaAffectedInRoadWidening],
        cPlot :[this.cPlot],
        mVentilation:[this.mVentilation],
        lcSetback :[this.lcSetback],
        lcFar :[this.lcFar]
      }),
      buildingAccessDetails: this.fb.group({
        roadWidth: ['', [Validators.required]],
        gateWidth: ['', [Validators.required]],
        internalRoad: ['', [Validators.required]],
        distInteranlRoad: ['', [Validators.required]],
        deadEnd: ['', [Validators.required]],
        travelDistance: ['', [Validators.required]],
        buildingAccessRemarks: ['']
      }),
      stairCaseDetails: this.fb.group({
        upperFloorStairs: ['', [Validators.required]],
        basementsStairs: ['', [Validators.required]],
        widthStairUpperFloor: ['', [Validators.required]],
        widthStairBasements: ['', [Validators.required]],
        staircaseProvision: [false, [Validators.required]],
        staircaseRemarks: ['']
      }),
      smokeManagementDetails: this.fb.group({
        functionalitySmokeManger: ['', [Validators.required]],
        fireExtinguisherNo:['', [Validators.required]],
        basementAirChanges: [false, [Validators.required]],
        upperFloorAirChange: [false, [Validators.required]],
        freshAirSupply: [false, [Validators.required]],
        exhaustAirDischarge: [false, [Validators.required]],
        smokeManagementRemarks: ['']
      }),
      fireDocDetails: this.fb.array([this.fileTypeForm()]),
      fileRemarks: [''],
      callFrom: [this.senddata.callFrom]
    });


    this.geoDetails.forEach((geoData) => {
      (this.fireForm.get('geoDetails') as FormArray).push(
        this.fb.group({
          latitude: [geoData.latitude],
          longitude: [geoData.longitude]
        })
      );
    });

    this.buildingDetails.forEach((buildingData) => {
      (this.fireForm.get('buildingDetails') as FormArray).push(
        this.fb.group({
          buitUpArea: [buildingData.buitUpArea],
          freeFromFar: [buildingData.freeFromFar],
          netFar: [buildingData.netFar],
        })
      );
    });


  }

  fileTypeForm() {
    return this.fb.group({
      fileName: [''],
      fileUniqueNo: [''],
      fileType: ['']
    });
  }

  fireDocDetailsName:any = 'File name will come here';
  uploadDoc(event: any, arrayName: string) {
    const fileData = event.target.files[0];
  
    const allowedExtensions = ['jpeg', 'jpg', 'pdf'];
    const maxSize = 15728640; 
  
    const fileExtension = fileData.name.split('.').pop()?.toLowerCase();
  
    if (!allowedExtensions.includes(fileExtension)) {
      alert('Please upload a file with JPG, JPEG, or PDF extension.');
      event.target.value = '';
      return;
    }
  
    console.log("File size:", fileData.size);
    if (fileData.size > maxSize) {
      event.target.value = '';
      alert('Please upload a file under ' + (maxSize / (1024 * 1024)) + ' MB.');
      return;
    }
    this.fireDocDetailsName = fileData.name;
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
  
    reader.onload = (event: any) => {
      const inputValue = event.target.result;
  
      const json = {
        "docFileName": fileData.name.split(".")[0],
        "docType": fileExtension, 
        "docByteStream": inputValue.split(",")[1], 
        "docName": fileData.name.split(".")[0]
      };
  
      this.service.postService(this.apiConstant.downloadUUID, json).subscribe((res: any) => {
        console.log("data =================> ", res);
  
        if (!res.docUUID) {
          return;
        }
  
        const formArray = this.fireForm.get(arrayName) as FormArray | null;
        if (formArray) {
          formArray.at(0).patchValue({
            "fileType": fileData.name.split(".")[0] + fileData.name.split(".")[1], 
            "fileName": "Fire Noc Doc",
            "fileUniqueNo": res.docUUID,
            "docByteStream": inputValue.split(",")[1] 
          });
        }
  
        console.log("uuid: " + res.docUUID);
      });
    };
  
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }
  
  

  dialog:boolean=false;
  datasave:boolean = false;
  hideSubmit:boolean = false;

  fireFormSubmit() {
    if (this.fireForm.invalid) {
      alert("Please fill all the details properly..");
      console.log("this.fireForm.value", this.fireForm.value);
      return;
    }else {
    this.service.getSupportiveDoc(this.apiConstant.SaveNocFire,this.fireForm.value).subscribe((data: any) => {
        console.log(data);
      console.log(data, "response from api...");
      if (data.httpStatus === "OK") {
        this.senddata.fireNoc = true;
        this.senddata.dialog=true;
        this.senddata.datasave =true;
        this.hideSubmit = true;

        this.senddata.fireNocForm = true;
        this.senddata.formTwo = false;
        this.router.navigate(['/home']);

      }else{
        this.senddata.dialog=true;
        this.senddata.datasave=false;
        this.hideSubmit = true;
      }
    });
    console.log("this.fireForm.value", this.fireForm.value);
  }
  }

    back(){
      this.router.navigate(['/nocPage']);
    }


}
