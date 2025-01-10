import { AfterViewInit, Component } from '@angular/core';
import { SendData } from 'src/app/SendData';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';
import { Router } from '@angular/router';
import { COMMONCONSTANTS } from 'src/app/CONSTANTS/constants';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { FormControl } from '@angular/forms';


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

  observationControl = new FormControl('');

  noc: boolean = false;
  buildingDetails: any[] = [];
  geoDetails: any[] = [];
  inspectionDocs: any[] = [];
  copyOfInspectionDocs: any[] = [];
  ocObservationDocs:any[]=[];
  observation: any;
  ocObsertion:any;
  isEmptyObervation: boolean = false;
  isEmptyOCObervation:boolean=false;
  data: any;
  requestId: any;
  frids: any;
  ownerCall: any;
  storeUrls: any[] = [];

  ngOnInit(): void {
    this.requestId = localStorage.getItem('requestid');
    this.frids = localStorage.getItem('frid');
    this.ownerCall = localStorage.getItem("ownerCall");
    this.ownerCall = this.ownerCall == null ? 'false' : this.ownerCall;

    console.log(this.requestId, this.frids, "data is get on file 2........");

    this.service.getButtonDetails(this.apiConstant.newFORM_VIEW, this.requestId).subscribe((data: any) => {
      if (data.basicInfo.status == COMMONCONSTANTS.Status_Final_Form_Submit
        // || data.basicInfo.status == COMMONCONSTANTS.Status_Form_Submitted_GIS_Pending
      ) {
        this.noc = true;
      }
    });

    let request = {
      "fileNo": this.requestId,
      "frId": this.frids
    }

    this.service
      .getSecondViewDetails(this.apiConstant.SecondFORM_VIEW, request)
      .subscribe(
        (data: any) => {
          this.data = data.data.fileRecord;
          this.geoDetails = data.data.geoCoordinate;
          this.inspectionDocs = data.data.inspectionImages || [];
          this.ocObservationDocs = data.data.inspectionImagesForOc || [];
          console.log(this.inspectionDocs, "muiyyuitfy8gyufykugfuguyg");
          
        
          if (this.inspectionDocs.length === 0) {
            this.isEmptyObervation = true;
          } else {
            this.observation = this.inspectionDocs[0].observations;
            
            this.loadImageUrls();
          }
          if (this.ocObservationDocs.length === 0) {
            this.isEmptyOCObervation = true;
            console.log(this.isEmptyOCObervation +"mmmmmmm");
            
          } else {
            this.ocObsertion = this.ocObservationDocs[0].observations;
            console.log(this.ocObsertion+"ooooooooo");
            
            
            this.loadImageUrlsForOC();
          }

          
          this.buildingDetails = data.data.buildingFloorDetails;
        },
        (error) => {
          console.error('Error fetching initial data:', error);
        }
      );
  }
  loadImageUrls(): void {
    const requests = this.inspectionDocs.map((doc) => {
      const request = { docUUID: doc.docUUID };
      return this.service.getHierarchyService(this.apiConstant.viewUUID, request).pipe(
        map((data: any) => {
          if (data && data.docByteStream) {
            try {
              const byteCharacters = atob(data.docByteStream);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Adjust based on the content type
              const url = window.URL.createObjectURL(blob);
              return { docUUID: doc.docUUID, url, format: 'image/jpeg' };
            } catch (error) {
              console.error('Error processing image data for docUUID:', doc.docUUID, error);
              return null;
            }
          }
          return null;
        })
      );
    });

    forkJoin(requests).subscribe(
      (responses) => {
        responses.forEach((response, index) => {
          if (response) {
            this.inspectionDocs[index].url = response.url;
            this.inspectionDocs[index].format = response.format;
          } else {
            console.error('No valid data returned for document UUID:', this.inspectionDocs[index].docUUID);
          }
        });
      },
      (error) => {
        console.error('Error fetching image data:', error);
      }
    );
  }

  loadImageUrlsForOC(): void {
    const requests = this.ocObservationDocs.map((doc) => {
      const request = { docUUID: doc.docUUID };
      return this.service.getHierarchyService(this.apiConstant.viewUUID, request).pipe(
        map((data: any) => {
          if (data && data.docByteStream) {
            try {
              const byteCharacters = atob(data.docByteStream);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Adjust based on the content type
              const url = window.URL.createObjectURL(blob);
              return { docUUID: doc.docUUID, url, format: 'image/jpeg' };
            } catch (error) {
              console.error('Error processing image data for docUUID:', doc.docUUID, error);
              return null;
            }
          }
          return null;
        })
      );
    });

    forkJoin(requests).subscribe(
      (responses) => {
        responses.forEach((response, index) => {
          if (response) {
            this.ocObservationDocs[index].url = response.url;
            this.ocObservationDocs[index].format = response.format;
          } else {
            console.error('No valid data returned for document UUID:', this.ocObservationDocs[index].docUUID);
          }
        });
      },
      (error) => {
        console.error('Error fetching image data:', error);
      }
    );
  }

  getDownloadName(doc: { format: string; docUUID: string }): string {
    if (doc.format === 'application/pdf') {
      return 'document.pdf';
    } else if (doc.format === 'image/jpeg') {
      return 'siteImage.jpeg';
    } else if (doc.format === 'image/jpg') {
      return 'siteImage.jpg';
    } else {
      return 'file';
    }
  }



  onObservationChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.observation = target.value;
    console.log(this.observation + "kkkkkkkkkkkkkkkkkkkkkk");
  }

  onOcObservationChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.ocObsertion = target.value;
    console.log(this.ocObsertion + "kkkkkkkkkkkkkkkkkkkkkk");
  }

  value: any
  updateObservation() {

    this.value = [{ "observations": this.observation, "fileNo": this.requestId,"docRelate":"plinthNew" }];

    console.log(JSON.stringify(this.value) + "oooooooooooooooooooo");

    this.service.postService(this.apiConstant.updateObservation, this.value)
      .subscribe(
        response => {
          console.log('API call success:', response);
          this.router.navigate(['/departmentDashboard']);
        },
        error => {
          console.error('API call failed:', error);
        }
      );


  }
  ocValue:any;
  updateObservationForOc() {

    this.ocValue = [{ "observations": this.ocObsertion, "fileNo": this.requestId,"docRelate":"OCNew" }];

    console.log(JSON.stringify(this.ocValue) + "oooooooooooooooooooo");

    this.service.postService(this.apiConstant.updateObservation, this.ocValue)
      .subscribe(
        response => {
          console.log('API call success:', response);
          this.router.navigate(['/departmentDashboard']);
        },
        error => {
          console.error('API call failed:', error);
        }
      );


  }




  NocForm() {
    this.router.navigate(['/nocPage']);
  }

  back() {
    this.router.navigate(['/dashboard']);
  }


}
