import {
  Component,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Chart, ChartType, registerables } from 'chart.js'; // Ensure ChartType is imported
import { commonService } from 'src/app/services/common.service';
import { SendData } from 'src/app/SendData';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { API_PATH } from 'src/environments/api-constant';
import { ChangeDetectorRef } from '@angular/core';


// Register Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-stats-mis',
  templateUrl: './stats-mis.component.html',
  styleUrls: ['./stats-mis.component.scss'],
})
export class StatsMisComponent implements AfterViewInit {
/*   startDateControl = new FormControl('');
  endDateControl = new FormControl(''); */

  @ViewChildren('chart') chartElements!: QueryList<ElementRef>;
  charts: { type: ChartType; data: any }[] = [];
  apiConstant = API_PATH;
  consultantDetails: any;

  constructor(private service: commonService, private route: Router,
    private fb: FormBuilder ,private cd: ChangeDetectorRef) {}


  ngOnInit(): void {
    this.createForm();
    this.viewConsultantReport();
    this.viewNocReport();
    this. viewDistricReport();
    this. viewrequestReport();
    setTimeout(() => {
      // Define a type for valid chart types
      this.charts = [
        {
          type: 'bar',
          data: {
            labels: [''],
            datasets: [
              {
                label: 'All',
                data: [this.requestdetailsDetails.sanctionAll],
                backgroundColor: 'blue',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 0.2,
                barThickness: 70, 
                categoryPercentage: 1.0,  // Ensure bars take up all space in the category
                barPercentage: 0.9,  // Control the width of the bars
              },
              {
                label: 'Approve',
                data: [this.requestdetailsDetails.sanctionApprove],
                backgroundColor: 'green',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 0.2,
                barThickness: 70,
                categoryPercentage: 1.0,  // Ensure bars take up all space in the category
                barPercentage: 0.9,  // Control the width of the bars
              },
              {
                label: 'Reject',
                data: [this.requestdetailsDetails.sanctionReject],
                backgroundColor: 'Red',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 0.2,
                barThickness: 70,
                categoryPercentage: 1.0,  // Ensure bars take up all space in the category
                barPercentage: 0.9,  // Control the width of the bars
              },
              
              {
                label: 'Pending',
                data: [
                  this.requestdetailsDetails.sanctionAll - (this.requestdetailsDetails.sanctionApprove + this.requestdetailsDetails.sanctionReject),
                ],
                backgroundColor: 'yellow',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 0.2,
                barThickness: 70,
                categoryPercentage: 1.0,  // Ensure bars take up all space in the category
                barPercentage: 0.9,  // Control the width of the bars
              },
            ],
          },
       
        },
        {
          type: 'bar',
          data: {
            labels: [' '],
            datasets: [
              {
                label: 'All',
                data: [this.requestdetailsDetails.OcAll],
                backgroundColor: 'blue',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 0.2,
                barThickness: 70,
                categoryPercentage: 1.0,  // Ensure bars take up all space in the category
                barPercentage: 0.9,  // Control the width of the bars
              },
              {
                label: 'Approve',
                data: [this.requestdetailsDetails.OcApprove],
                backgroundColor: 'green',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 0.2,
                barThickness: 70,
                categoryPercentage: 1.0,  // Ensure bars take up all space in the category
                barPercentage: 0.9,  // Control the width of the bars
              },
              {
                label: 'Reject',
                data: [this.requestdetailsDetails.OcReject],
                backgroundColor: 'Red',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 0.2,
                barThickness: 70,
                categoryPercentage: 1.0,  // Ensure bars take up all space in the category
                barPercentage: 0.9,  // Control the width of the bars
              },
              {
                label: 'Pending',
                data: [
                  this.requestdetailsDetails.OcAll - (this.requestdetailsDetails.OcApprove + this.requestdetailsDetails.OcReject),
                ],
                backgroundColor: 'yellow',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 0.2,
                barThickness: 70,
                
              },
            ],
          },
         
        },
        
        
        {
          type: 'bar', // Change from 'line' to 'bar' for bar chart
          data: {
            labels: ['Forest', 'Metro', 'Fire', 'Water'], // Categories/labels
            datasets: [
              {
                label: 'Dept.',
                data: [
                  this.nocdetailsDetails.nocWorkTraceForest, 
                  this.nocdetailsDetails.nocWorkTraceMetro, 
                  this.nocdetailsDetails.nocWorkTraceFire, 
                  this.nocdetailsDetails.nocWorkTraceWater
                ], // Department data values
                backgroundColor: 'blue',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth:  0.2,
              },
              {
                label: 'Approve',
                data: [
                  this.nocdetailsDetails.nocWorkTraceApproveForest, 
                  this.nocdetailsDetails.nocWorkTraceApproveMetro, 
                  this.nocdetailsDetails.nocWorkTraceApproveFire, 
                  this.nocdetailsDetails.nocWorkTraceApproveWater
                ], // Approved data values
                backgroundColor: 'green',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth:  0.2,
              },
              {
                label: 'Reject',
                data: [
                  this.nocdetailsDetails.nocWorkTraceRejectForest, 
                  this.nocdetailsDetails.nocWorkTraceRejectMetro, 
                  this.nocdetailsDetails.nocWorkTraceRejectFire, 
                  this.nocdetailsDetails.nocWorkTraceRejectWater
                ], // Rejected data values
                backgroundColor: 'Red',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 0.2,
              },
              {
                label: 'Pending',
                data: [
                  this.nocdetailsDetails.nocWorkTraceForest - (this.nocdetailsDetails.nocWorkTraceApproveForest + this.nocdetailsDetails.nocWorkTraceRejectForest),
                  this.nocdetailsDetails.nocWorkTraceMetro - (this.nocdetailsDetails.nocWorkTraceApproveMetro + this.nocdetailsDetails.nocWorkTraceRejectMetro),
                  this.nocdetailsDetails.nocWorkTraceFire - (this.nocdetailsDetails.nocWorkTraceApproveFire + this.nocdetailsDetails.nocWorkTraceRejectFire),
                  this.nocdetailsDetails.nocWorkTraceWater - (this.nocdetailsDetails.nocWorkTraceApproveWater + this.nocdetailsDetails.nocWorkTraceRejectWater)
                ], // Pending data values (calculated)
                backgroundColor: 'yellow',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 0.2,
              }
            ]
          },
        },
        {
          type: 'bar',
          data: {
            labels: [' Architect', 'Supervisior', 'Engineer', ' Structural Engineer'], // Set appropriate labels
            datasets: [
              {
                label: 'All',
                data: [
                  this.consultantDetails.consultantDetailsAllAE,
                  this.consultantDetails.consultantDetailsAllCE,
                  this.consultantDetails.consultantDetailsAllLE,
                  this.consultantDetails.consultantDetailsAllSE,
                ],
                backgroundColor: 'blue',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth:  0.2,
              },{
                label: 'Approve',
                data: [
                  this.consultantDetails.consultantDetailsApproveAE,
                  this.consultantDetails.consultantDetailsApproveCE,
                  this.consultantDetails.consultantDetailsApproveLE,
                  this.consultantDetails.consultantDetailsApproveSE,
                ],
                backgroundColor: 'green',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth:  0.2,
              },
              {
                label: 'Reject',
                data: [
                  this.consultantDetails.consultantDetailsRejectAE,
                  this.consultantDetails.consultantDetailsRejectCE,
                  this.consultantDetails.consultantDetailsRejectLE,
                  this.consultantDetails.consultantDetailsRejectSE,
                ],
                backgroundColor: 'Red',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 0.2,
              },
              {
                label: 'Pending',
                data: [
                  this.consultantDetails.consultantDetailsAllAE - (this.consultantDetails.consultantDetailsApproveAE + this.consultantDetails.consultantDetailsRejectAE),
                  this.consultantDetails.consultantDetailsAllCE - (this.consultantDetails.consultantDetailsApproveCE + this.consultantDetails.consultantDetailsRejectCE),
                  this.consultantDetails.consultantDetailsAllLE - (this.consultantDetails.consultantDetailsApproveLE + this.consultantDetails.consultantDetailsRejectLE),
                  this.consultantDetails.consultantDetailsAllSE - (this.consultantDetails.consultantDetailsApproveSE + this.consultantDetails.consultantDetailsRejectSE),
                ],
                backgroundColor: 'yellow',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 0.2,
              },
            ],
          },
        },

       
        
     /*    {
          type: 'radar',
          data: {
            labels: ['Eating', 'Drinking', 'Sleeping', 'Working', 'Playing'],
            datasets: [
              {
                label: 'Activity',
                data: [65, 59, 90, 81, 56],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
        }, */
      ];
    }, 1000);
  }

  searchForm!: FormGroup;
  createForm() {
    this.searchForm = new FormGroup({
      date: this.fb.group({
      startDateControl: ['', [Validators.required]],
      endDateControl: ['', [Validators.required]],
      }),
    });
  }

  viewConsultantReport(): Promise<any> {
    let Json = 'startDate=' + this.startDate + '&endDate=' + this.endDate;
    return this.service.getButtonDetails(this.apiConstant.PublicConsultantReports, Json)
      .toPromise()
      .then((data: any) => {
        console.log(data, 'data....');
        if (data.httpStatus === 'OK') {
          this.consultantDetails = data.data;
        }
      });
  }
  

  nocdetailsDetails: any = {};
  viewNocReport() {
    let Json = 'startDate=' + this.startDate + '&endDate=' + this.endDate;
    this.service
      .getButtonDetails(this.apiConstant.PublicNocReports, Json)
      .subscribe((data: any) => {
        console.log(data, 'data....');
        if (data.httpStatus == 'OK') {
          this.nocdetailsDetails = data.data;
        }
      });
  }
  districdetailsDetails: any = {};
  pieChartConfig: any;
  viewDistricReport() {
    let Json = 'startDate=' + this.startDate + '&endDate=' + this.endDate + "&distic" + "";
    this.service
        .getButtonDetails(this.apiConstant.DistricReport, Json)
        .subscribe((data: any) => {
            console.log(data, 'data....');
            if (data.httpStatus == 'OK') {
                this.districdetailsDetails = data.data.distic;
                this.updatePieChart();
            }
        });
}

updatePieChart() {
  const districtData = this.districdetailsDetails;

  // Preparing data for the pie chart
  const labels = Object.keys(districtData);
  const dataValues = Object.values(districtData);
  const backgroundColors = labels.map(() => this.getRandomColor());
  const borderColors = backgroundColors; // Use the same colors for borders

  // Pie chart configuration
  this.pieChartConfig = {
      type: 'pie',
      data: {
          labels: labels,
          datasets: [
              {
                  label: '# of Votes',
                  data: dataValues,
                  backgroundColor: backgroundColors,
                  borderColor: borderColors,
                  borderWidth: 1,
              },
          ],
      },
  };

  // Initialize or update your chart here using the pieChartConfig
}

getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

  requestdetailsDetails: any = {};
  viewrequestReport() {
    let Json = 'startDate=' + this.startDate + '&endDate=' + this.endDate + "&type" + "";
    this.service
      .getButtonDetails(this.apiConstant.Requestreport, Json)
      .subscribe((data: any) => {
        console.log(data, 'data....');
        if (data.httpStatus == 'OK') {
          this.requestdetailsDetails = data.data;
        }
      });
  }

  


  ngAfterViewInit() {
    setTimeout(() => {
      this.charts.forEach((chartConfig, index) => {
        const ctx = document.getElementById(`chart-${index}`) as HTMLCanvasElement;
        new Chart(ctx, {
          type: chartConfig.type,
          data: chartConfig.data,
          options: {
            responsive: true,
            maintainAspectRatio: false, // This allows the chart to fill its container
            // You can customize other options here
          },
        });
      });
    }, 2000);
  }

  startDate:any="";
  endDate:any="";
  formateDate(){
    const startDate = this.searchForm.value.date.startDateControl;
    const endDate = this.searchForm.value.date.endDateControl;

    const formatDate = (date: Date | null): string | null => {
        if (!date) return null; // Handle null case
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}.000`;
    };
    this.startDate = formatDate(startDate);
    this.endDate =  formatDate(endDate);
  }
  updateCharts() {
    setTimeout(() => {
      this.charts.forEach((chartConfig, index) => {
        const ctx = document.getElementById(`chart-${index}`) as HTMLCanvasElement;
  
        // Check if the chart has valid data
        if (ctx && chartConfig.data.datasets.some((dataset: { data: any[] }) => dataset.data.some(value => value > 0))) {
          new Chart(ctx, {
            type: chartConfig.type,
            data: chartConfig.data,
            options: {
              responsive: true,
              maintainAspectRatio: false,
            },
          });
        } else {
          // Display a message in the chart area if there's no data
          this.displayNoDataMessage(`chart-${index}`, 'No data available for this chart.');
        }
      });
    }, 1000);
  }
  
  displayNoDataMessage(chartIdOrMessage: string, message?: string) {
    const chartContainer = document.getElementById(chartIdOrMessage)?.parentElement; // Assuming the chart is wrapped in a parent element
    if (message) {
      // Clear the canvas or replace it with a message if both parameters are provided
      if (chartContainer) {
        chartContainer.innerHTML = `<div style="text-align: center; color: red;">${message}</div>`;
      }
    } else {
      // If only a message is provided, log it to the console
      console.log(chartIdOrMessage);
    }
  }
  
  onSearch() {
    this.formateDate();
    console.log(this.startDate, this.endDate);
  
    // Fetch all reports concurrently
    Promise.all([
      this.viewConsultantReport(),
      this.viewNocReport(),
      this.viewDistricReport(),
      this.viewrequestReport()
    ])
    .then(() => {
      // After all data is fetched, set the charts
      this.setChartData();
      this.updateCharts();
    })
    .catch((error) => {
      console.error('Error fetching reports:', error);
    });
  }
  
  setChartData() {
    const hasData = (data: number[]) => data.some(value => value > 0);
    this.charts = []; // Initialize charts array
     // Sanction Chart Data
     const pieData = [
      this.requestdetailsDetails.sanctionAll
     ];
   
     if (hasData(pieData)) {
       this.charts.push({
         type: 'bar',
           data: {
             labels: [''], // Set appropriate labels
             datasets: [
               {
                 label: 'All',
                 data: [
                   this.requestdetailsDetails.sanctionAll,
   
                 ],
                 backgroundColor: 'blue',
                 borderColor: 'rgba(255, 99, 132, 1)',
                 borderWidth: 0.2,
                barThickness: 70,
               },{
                 label: 'Approve',
                 data: [
                   this.requestdetailsDetails.sanctionApprove
                 
                 ],
                 backgroundColor: 'green',
                 borderColor: 'rgba(255, 99, 132, 1)',
                 borderWidth: 0.2,
                 barThickness: 70,
               },
               {
                 label: 'Reject',
                 data: [
                   this.requestdetailsDetails.sanctionReject
                 
                 ],
                 backgroundColor: 'Red',
                 borderColor: 'rgba(255, 99, 132, 1)',
                 borderWidth: 0.2,
                barThickness: 70,
               },
               {
                 label: 'Pending',
                 data: [
                  this.requestdetailsDetails.sanctionAll +  (this.requestdetailsDetails.sanctionApprove -  this.requestdetailsDetails.sanctionReject),
                 
           
                 ],
                 backgroundColor: 'yellow',
                 borderColor: 'rgba(255, 99, 132, 1)',
                 borderWidth: 0.2,
                 barThickness: 70,
               },
             ],
           },
 
       });
     } else {
       this.displayNoDataMessage('pieChart', 'No data available for the pie chart.');
     }
      
// Oc Chart Data
const doughnutData = [
  this.requestdetailsDetails.OcAll,

];

// Rename the pending data variable
const pendingDataArray = [
  this.requestdetailsDetails.OcPending, 
];

if (hasData(doughnutData) || hasData(pendingDataArray)) {
  this.charts.push({
    type: 'bar',
    data: {
      labels: [' '], // Set appropriate labels
      datasets: [
        {
          label: 'All',
          data: [
            this.requestdetailsDetails.OcAll,

          ],
          backgroundColor: 'blue',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 0.2,
          barThickness: 70,
        },{
          label: 'Approve',
          data: [
            this.requestdetailsDetails.OcApprove,
          
          ],
          backgroundColor: 'green',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 0.2,
          barThickness: 70,
        },
        {
          label: 'Reject',
          data: [
            this.requestdetailsDetails.OcReject,
          
          ],
          backgroundColor: 'Red',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 0.2,
          barThickness: 70,
        },
        {
          label: 'Pending',
          data: [
           this.requestdetailsDetails.OcAll -  (this.requestdetailsDetails.OcApprove +  this.requestdetailsDetails.OcReject),
          
    
          ],
          backgroundColor: 'yellow',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 0.2,
          barThickness: 70,
        },
      ],
    },

  });
} else {
  this.displayNoDataMessage('doughnutChart', 'No data available for the doughnut chart.');
}

 // Noc Chart Data
 const lineData = [
  this.nocdetailsDetails.nocWorkTraceForest,
  this.nocdetailsDetails.nocWorkTraceMetro,
  this.nocdetailsDetails.nocWorkTraceFire,
  this.nocdetailsDetails.nocWorkTraceWater,
];

if (hasData(lineData)) {
  this.charts.push({
    type: 'bar', // Change from 'line' to 'bar' for bar chart
    data: {
      labels: ['Forest', 'Metro', 'Fire', 'Water'], // Categories/labels
      datasets: [
        {
          label: 'Dept.',
          data: [
            this.nocdetailsDetails.nocWorkTraceForest, 
            this.nocdetailsDetails.nocWorkTraceMetro, 
            this.nocdetailsDetails.nocWorkTraceFire, 
            this.nocdetailsDetails.nocWorkTraceWater
          ], // Department data values
          backgroundColor: 'blue',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth:  0.2,
        },
        {
          label: 'Approve',
          data: [
            this.nocdetailsDetails.nocWorkTraceApproveForest, 
            this.nocdetailsDetails.nocWorkTraceApproveMetro, 
            this.nocdetailsDetails.nocWorkTraceApproveFire, 
            this.nocdetailsDetails.nocWorkTraceApproveWater
          ], // Approved data values
          backgroundColor: 'green',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth:  0.2,
        },
        {
          label: 'Reject',
          data: [
            this.nocdetailsDetails.nocWorkTraceRejectForest, 
            this.nocdetailsDetails.nocWorkTraceRejectMetro, 
            this.nocdetailsDetails.nocWorkTraceRejectFire, 
            this.nocdetailsDetails.nocWorkTraceRejectWater
          ], // Rejected data values
          backgroundColor: 'Red',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 0.2,
        },
        {
          label: 'Pending',
          data: [
            this.nocdetailsDetails.nocWorkTraceForest - (this.nocdetailsDetails.nocWorkTraceApproveForest + this.nocdetailsDetails.nocWorkTraceRejectForest),
            this.nocdetailsDetails.nocWorkTraceMetro - (this.nocdetailsDetails.nocWorkTraceApproveMetro + this.nocdetailsDetails.nocWorkTraceRejectMetro),
            this.nocdetailsDetails.nocWorkTraceFire - (this.nocdetailsDetails.nocWorkTraceApproveFire + this.nocdetailsDetails.nocWorkTraceRejectFire),
            this.nocdetailsDetails.nocWorkTraceWater - (this.nocdetailsDetails.nocWorkTraceApproveWater + this.nocdetailsDetails.nocWorkTraceRejectWater)
          ], // Pending data values (calculated)
          backgroundColor: 'yellow',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 0.2,
        }
      ]
    },

  });
} else {
  this.displayNoDataMessage('lineChart', 'No data available for the line chart.');
}

   
    // Consultant Chart Data
    const allData = [
      this.consultantDetails.consultantDetailsAllAE,
      this.consultantDetails.consultantDetailsAllCE,
      this.consultantDetails.consultantDetailsAllLE,
      this.consultantDetails.consultantDetailsAllSE,
    ];
  
    const approveData = [
      this.consultantDetails.consultantDetailsApproveAE,
      this.consultantDetails.consultantDetailsApproveCE,
      this.consultantDetails.consultantDetailsApproveLE,
      this.consultantDetails.consultantDetailsApproveSE,
    ];
  
    const rejectData = [
      this.consultantDetails.consultantDetailsRejectAE,
      this.consultantDetails.consultantDetailsRejectCE,
      this.consultantDetails.consultantDetailsRejectLE,
      this.consultantDetails.consultantDetailsRejectSE,
    ];
  
    const pendingData = allData.map((value, index) =>
      value - approveData[index] + rejectData[index]
    );
  
    if (hasData(allData) || hasData(approveData) || hasData(rejectData) || hasData(pendingData)) {
      this.charts.push({
        type: 'bar',
        data: {
          labels: [' Architect', 'Supervisior', 'Engineer', ' Structural Engineer'],
          datasets: [
            {
              label: 'All',
              data: allData,
              backgroundColor: 'blue',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 0.2,
            },
            {
              label: 'Approve',
              data: approveData,
              backgroundColor: 'green',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 0.2,
            },
            {
              label: 'Reject',
              data: rejectData,
              backgroundColor: 'red',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 0.2,
            },
            {
              label: 'Pending',
              data: pendingData,
              backgroundColor: 'yellow',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 0.2,
            },
          ],
        },
      });
    } else {
      this.displayNoDataMessage('barChart', 'No data available for the bar chart.');
    }
  
   
 



  
    // If no charts were added, display a message instead
    if (this.charts.length === 0) {
      this.displayNoDataMessage('No data available for any charts.');
    }
  }

  back(){
    this.route.navigate(['/login']);
  }
}
