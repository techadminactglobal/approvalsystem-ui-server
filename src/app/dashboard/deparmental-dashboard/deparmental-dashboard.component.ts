import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { commonService } from 'src/app/services/common.service';
// import { MatPaginator } from '@angular/material/paginator';
import { MatPaginator, PageEvent } from '@angular/material/paginator'; 
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { API_PATH } from 'src/environments/api-constant';
import { SendData } from 'src/app/SendData';
import { Router } from '@angular/router';
@Component({
  selector: 'app-deparmental-dashboard',
  templateUrl: './deparmental-dashboard.component.html',
  styleUrls: ['./deparmental-dashboard.component.scss']
})
export class DeparmentalDashboardComponent implements AfterViewInit {
  dataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = ['serialNumber','Reference Id', 'Request type', 'Created By', 'statusId', 'createdDate', 'hierachyId', 'details'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: commonService,
    private router: Router, private senddata: SendData) { }

  ngOnInit() {

    this.viewDashboard();


    this.service.getDeptDashboard(this.apiConstant.GET_DEPT_APPROVE_DASHBOARD + "?hierarchyRole=", this.senddata.hierarchyId).subscribe((res: any) => {
      console.log(res);
      if (res.data != null) {
        this.approvedSize = res.data.length;
        this.senddata.approveSize = res.data.length;
        
        this.approveData = res.data;
        console.log(this.approveData);
        
      }
    })

    this.service.getDeptDashboard(this.apiConstant.GET_DEPT_REJECT_DASHBOARD + "?hierarchyRole=", this.senddata.hierarchyId).subscribe((res: any) => {
      console.log(res);
      if (res.data != null) {
        this.rejectedSize = res.data.length;
        this.senddata.rejectSize = res.data.length;
        console.log(this.rejectedSize);
        this.rejectData = res.data;
        console.log(this.rejectData);
        
      }
    })

    setTimeout(() => {
      this.totalSize = this.approvedSize + this.pendingSize +this.rejectedSize;
      this.senddata.totalSize = this.totalSize;
    }, 1000);

    let data: any = localStorage.getItem('userData');
    data = JSON.parse(data);
    
  }

  totalSize:any;
  approveData:any;
  rejectData:any;
  apiConstant = API_PATH;
  dataArray: any;

  // viewDashboard() {
  //   // let request: any = { "hierarchyRole": this.senddata.roleId }

  //   this.service.getDeptDashboard(this.apiConstant.GET_DEPT_DASHBOARD + "?hierarchyRole=", this.senddata.hierarchyId).subscribe((res: any) => {
  //     console.log(res);
  //     if (res.data != null) {
  //       this.dataArray = res.data;
  //       console.log(this.dataArray);
  //     }
  //   })
  // }

  viewDashboard() {
    this.service.getDeptDashboard(this.apiConstant.GET_DEPT_DASHBOARD + "?hierarchyRole=", this.senddata.hierarchyId).subscribe((res: any) => {
      console.log(res);
      if (res.data != null) {
        // this.dataArray = res.data;
        this.pendingSize = res.data.length;
        this.senddata.pendingSize = res.data.length;
        this.dataArray = res.data.map((item: any, index: number) => {
          return { ...item, serialNumber: index + 1 };
        });
        this.dataSource = new MatTableDataSource(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort; 
        console.log(this.dataArray);
      
      }
    })
  }

  isNameEmpty(element: any): boolean {
    return !element.salutation || !element.firstName || !element.lastName;
  }


  viewDetail(consultantName: string , fileNo: any , hierarchyId:string , frId:string) {
    if(hierarchyId == "regNew"){
    console.log(consultantName);
    this.senddata.paymentFor = hierarchyId;
    this.senddata.requestid = consultantName;
    this.router.navigate(['/deptRequestView']);
    }else if(hierarchyId =="fileNew"){
      console.log(fileNo);
      this.senddata.paymentFor = hierarchyId;
      this.senddata.requestid = fileNo;
      this.senddata.frid = frId;
      this.router.navigate(['/deptRequestView'])
    }else if (hierarchyId =="plinthNew"){
      console.log(fileNo);
      this.senddata.paymentFor = hierarchyId;
      this.senddata.requestid = fileNo;
      this.senddata.frid = frId;
      this.senddata.callFrom ="Dept",
      this.router.navigate(['/deptRequestView']);
    }else if (hierarchyId =="OCNew"){
      console.log(fileNo);
      this.senddata.paymentFor = hierarchyId;
      this.senddata.requestid = fileNo;
      this.senddata.frid = frId;
      this.router.navigate(['/deptRequestView']);
    }
  }

  ngAfterViewInit(): void {
    // this.viewDashboard();
    // this.sortChange(event);

  }

  sortChange(event: any) {
    this.dataSource.data = this.dataSource.data.reverse();
  }


  getRouterLink(moduleType: string, status: string, reqId: string): string {
    let route = ''
    if (status.endsWith("New")) {
      route = 'viewFormOne/' + reqId;
    }
    else if (status.endsWith("assed")) {
      route = 'formTwo'
    } else if (status.endsWith("aid")) {
      route = 'release'
    }
    // route = 'viewFormOne/' + reqId;
    // else if (status == '20') {
    //   route = 'formTwo'
    // }
    // route = 'formTwo/' + '';
    if (moduleType == '1') {
      return 'saralBuildingPlan/' + route
    }
    if (moduleType == '3') {
      return 'upto500BuildingPlan/' + route
    }
    if (moduleType == '4') {
      return 'sanctionBuildingPlan/' + route
    }
    return ''

  }

  onPageChange(event: PageEvent) {
    console.log('Page changed:', event);
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    const newData = this.dataArray.slice(startIndex, endIndex);
    console.log('New data for page:', newData);
    this.dataSource = new MatTableDataSource<any>(newData);
  }
  
  
  pendingSize:any = 0;
  approvedSize:any = 0;
  rejectedSize:any = 0;
  totalPending(){
    this.service.getDeptDashboard(this.apiConstant.GET_DEPT_DASHBOARD + "?hierarchyRole=", this.senddata.hierarchyId).subscribe((res: any) => {
      console.log(res);
      if (res.data != null) {
        // this.pendingSize = res.data.length;
        // console.log(this.pendingSize);
        // this.dataArray;
        // console.log(this.dataArray);
        // this.dataArray.push(res.data);

       
          this.pendingSize = res.data.length;
          this.dataArray = res.data.map((item: any, index: number) => {
            return { ...item, serialNumber: index + 1 };
          });
          this.dataSource = new MatTableDataSource(this.dataArray);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort; 
          console.log(this.dataArray);

          
      }
    })
  }

  totalApprove(){
    this.dataArray = [];
    this.dataArray = this.approveData.map((item: any, index: number) => {
        return { 
          ...item, serialNumber: index + 1 
        };
    });

    this.dataSource = new MatTableDataSource(this.dataArray);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }

  totalReject(){
    this.dataArray = [];
    console.log(this.dataArray)
    
    this.dataArray = this.rejectData.map((item: any, index: number) => {
        return { 
          ...item, serialNumber: index + 1 
        };
    });

    this.dataSource = new MatTableDataSource(this.dataArray);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}



