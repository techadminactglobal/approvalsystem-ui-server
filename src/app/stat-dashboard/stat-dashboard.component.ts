import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { commonService } from '../services/common.service';
import { API_PATH } from 'src/environments/api-constant';
import { SendData } from '../SendData';

@Component({
  selector: 'app-stat-dashboard',
  standalone: true,
  templateUrl: './stat-dashboard.component.html',
  styleUrls: ['./stat-dashboard.component.scss']
})
export class StatDashboardComponent {

  chart: any;

  constructor(private service: commonService, private senddata: SendData) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.totalApprove();
      this.totalPending();
      this.totalReject();
      Chart.defaults.datasets.bar.maxBarThickness = 150;
      this.chart = this.createBar();
    }, 1000);
  }

  createBar() {
    console.log(this.approvedSize + " -- " + this.rejectedSize + " --- " + this.pendingSize)
    var total = this.approvedSize + this.rejectedSize + this.pendingSize;
    this.chart = new Chart("MyChart", {
      type: 'bar',

      data: {
        labels: ['Total', 'Pending', 'Approval', 'Rejected'],
        datasets: [

          {
            label: "Pending",
            data: [],
            backgroundColor: ['orange']
          },
          {
            label: "Total",
            data: [total, this.pendingSize, this.approvedSize, this.rejectedSize],
            backgroundColor: ['black', 'orange', 'green', 'red']
          },
          {
            label: "Approval",
            data: [],
            backgroundColor: ['green'],
          },
          {
            label: "Rejected",
            data: [],
            backgroundColor: ['red'],
          }
        ]
      },
      options: {
        aspectRatio: 1.6
      }

    });
  }

  apiConstant = API_PATH;
  pendingSize: number = 0;
  approvedSize: number = 0;
  rejectedSize: number = 0;
  totalPending() {
    // this.service.getDeptDashboard(this.apiConstant.GET_DEPT_DASHBOARD + "?hierarchyRole=", this.senddata.hierarchyId).subscribe((res: any) => {
    //   if (res.data != null) {
    //     this.pendingSize = res.data.length;
    //     console.log(this.pendingSize, "kkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    //   }
    // })
    this.pendingSize = this.senddata.pendingSize;
    console.log(this.pendingSize, "kkkkkkkkkkkkkkkkkkkkkkkkkkkk");
  }

  totalApprove() {
    // this.service.getDeptDashboard(this.apiConstant.GET_DEPT_APPROVE_DASHBOARD + "?hierarchyRole=", this.senddata.hierarchyId).subscribe((res: any) => {
    //   if (res.data != null) {
    //     this.approvedSize = res.data.length;
    //     console.log(this.approvedSize, "sssssssssssssssssss");

    //   }
    // })
    this.approvedSize = this.senddata.approveSize;
    console.log(this.approvedSize, "kkkkkkkkkkkkkkkkkkkkkkkkkkkk");
  }

  totalReject() {
    // this.service.getDeptDashboard(this.apiConstant.GET_DEPT_REJECT_DASHBOARD + "?hierarchyRole=", this.senddata.hierarchyId).subscribe((res: any) => {
    //   if (res.data != null) {
    //     this.rejectedSize = res.data.length;
    //     console.log(this.rejectedSize, "fffffffffffffffffff");
    //   }
    // })
    this.rejectedSize = this.senddata.rejectSize;
    console.log(this.rejectedSize, "kkkkkkkkkkkkkkkkkkkkkkkkkkkk");
  }





}
