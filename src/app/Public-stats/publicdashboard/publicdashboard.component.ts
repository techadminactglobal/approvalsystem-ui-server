import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { commonService } from 'src/app/services/common.service';
import * as LoginActions from '../../actions/auth.actions';
import { API_PATH } from 'src/environments/api-constant';
import { HttpClient } from '@angular/common/http';
import e from 'cors';
import { SendData } from 'src/app/SendData';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { COMMONCONSTANTS } from 'src/app/CONSTANTS/constants';

@Component({
  selector: 'app-publicdashboard',
  templateUrl: './publicdashboard.component.html',
  styleUrls: ['./publicdashboard.component.scss'],
})
export class PublicdashboardComponent {
  farId: any;
  details: Object | undefined;
  table: any;
  data: any;
  lastDeptTypeEntry: any;
  onSearch() {
    throw new Error('Method not implemented.');
  }
  totalFilesCreated: any;
  totalFilesApproved: any;
  totalFilesReject:any;
  totalFilesPendingApproval: any;
  totalRegisteredConsultants: any;

  apiConstant: any = API_PATH;
  pieChartData: any;
  pieChartColors: any;
  searchTerm: any;
  filteredItems: any;

  constructor(
    private senddata: SendData,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private service: commonService,
    private toastr: ToastrService,
    private apiService: commonService
  ) {}

  dataOut: boolean = false;
  searchForm!: FormGroup;

  ngOnInit() {
    this.registeredConsultants();
    this.fileDetails();
    this.createForm();
 /*    setTimeout(() => {
      this.createPieChart();
    }, 1000); */
  }

  createForm() {
    this.searchForm = new FormGroup({
      FarId: this.fb.group({
        frId: ['', [Validators.required]],
      }),
    });
  }

  basicDeatils: any;
  siteLocationDetails: any;
  applicantDetails: any;
  plotDetails: any;
  workHierarchyTrace: any;
  letter: any;
  viewLetter: boolean = false;
  searchFarId() {
    // console.log(
    //   this.searchForm.value.FarId.frId,
    //   'far id for public dashboard'
    // );

    this.service
      .getDeptDashboard(
        this.apiConstant.SerarcByFrIdPublicDashboard,
        this.searchForm.value.FarId.frId
      )
      .subscribe((res: any) => {
        console.log(res);
        this.basicDeatils = res.data.basicInfo;
        this.siteLocationDetails = res.data.siteLocationDetails;
        this.applicantDetails = res.data.applicantDetails;
        this.plotDetails = res.data.plotDetails;
        // this.workHierarchyTrace = res.data.workHierarchyTrace;
        this.dataOut = true;

        if (res.data.workHierarchyTrace.length > 0) {
          this.lastDeptTypeEntry =
            res.data.workHierarchyTrace[res.data.workHierarchyTrace.length - 1];
        }
        console.log(this.lastDeptTypeEntry, 'detpt details');

        if (res.data.workHierarchyTraceDetails.length>0) {
          this.letter = res.data.workHierarchyTraceDetails.OccupancyCertificateDoc.letterApprovedDs;
          this.viewLetter = true;
        } else if (res.data.basicInfo.letterApprovedDs != null) {
          this.letter = res.data.basicInfo.letterApprovedDs;
          this.viewLetter = true;
        } else {
          this.viewLetter = false;
        }

      });
    // this.findLastDeptType();
  }

  // findLastDeptType() {
  //   if (this.workHierarchyTrace.length > 0) {
  //     this.lastDeptTypeEntry =
  //       this.workHierarchyTrace[this.workHierarchyTrace.length - 1];
  //   }
  //   console.log(this.lastDeptTypeEntry, 'detpt details');
  // }

  openLicensePdf(event: any) {
    let request: any = {
      docUUID: this.letter,
      // "docUUID": 84bf552a-4547-462f-9732-63fc9e4142fa
    };

    this.service
      .getHierarchyService(this.apiConstant.viewUUID, request)
      .subscribe((data: any) => {
        const byteString = atob(data.docByteStream);
        const byteArray = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
          byteArray[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        window.open(url, '_blank');
      });
  }

  registeredConsultants() {
    this.service
      .getDeptDashboard(this.apiConstant.findAllNumber, 'getAllFileRecord')
      .subscribe((res: any) => {
        console.log(res);
        this.totalFilesApproved = res.data.approved;
        this.totalFilesCreated = res.data.Total;
        this.totalFilesPendingApproval = res.data.pending;
        this.totalFilesReject = this.totalFilesCreated - (this.totalFilesApproved + this.totalFilesPendingApproval);
      /*   this.createPieChart(); */
      });
  }

  fileDetails() {
    this.service
      .getDeptDashboard(this.apiConstant.findAllNumber, 'getConsultantDetails')
      .subscribe((res: any) => {
        console.log(res);
        this.totalRegisteredConsultants = res.data;
      });
  }

/*   createPieChart() {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    if (ctx) {
      const chartCtx = ctx.getContext('2d');
      if (chartCtx) {
        const chart = new Chart(chartCtx, {
          type: 'pie',
          data: {
            labels: [
              'Total files created',
              'Total files approved',
              'Total files pending for approval',
              // 'Total registered consultants',
            ],
            datasets: [
              {
                label: 'Status',
                data: [
                  this.totalFilesCreated,
                  this.totalFilesApproved,
                  this.totalFilesPendingApproval,
                  // this.totalRegisteredConsultants,
                ],
                backgroundColor: [
                  'yellow',
                  'pink',
                  'green',
                  'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                  'black',
                  'black',
                  'black',
                  'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
              },
            },
          },
        });
      } else {
        console.error('Failed to get 2D context');
      }
    } else {
      console.error('Failed to get canvas element');
    }
  } */


  back(){
    this.router.navigate(['/login']);
  }

}
