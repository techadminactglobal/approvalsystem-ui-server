import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import {
  NgbOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { fromJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { commonService } from 'src/app/services/common.service';
import { ThemeService } from 'src/app/services/theme.service';
import { API_PATH } from 'src/environments/api-constant';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: ' Dashboard', icon: 'dashboard', class: '' },
  {
    path: '/form/new-first-component',
    title: 'Sanction',
    icon: 'unarchive',
    class: '',
  },
  { path: '/plinthDashboard', title: 'Plinth', icon: 'unarchive', class: '' },
  {
    path: '/OccupancyDashborad',
    title: 'Occupancy',
    icon: 'unarchive',
    class: '',
  },
  { path: '/profile', title: 'Profile', icon: 'person', class: '' },
  {
    path: '/staticalDashboard',
    title: 'Statistical MIS',
    icon: 'pie_chart',
    class: '',
  },
  // { path: '/staticalDashboard', title: 'Statistical (MIS)',  icon:'pie_chart', class: '' },
  { path: '/maps', title: 'Location', icon: 'location_on', class: '' },
];

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent implements OnInit {
  menuItems: any[] | undefined;

  latitude: any;
  longitude: any;
  latLogMap: boolean = false;

  // ngOnInit() {
  // }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          if (this.latitude != '' && this.longitude != '') {
            this.latLogMap = true;
          } else this.latLogMap = false;
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  showMap() {
    let addr = 'https://www.google.com/maps/place/';
    addr = addr + this.latitude + ',' + this.longitude;
    window.open(addr, '_blank');
  }

  mdbCollapse = true;
  FIRST_NAME = '';
  LAST_NAME = '';
  login_id = '';
  salutation: any;
  designation = '';
  emailId = '';
  passUpdatedOn: any;
  response: boolean = false;
  userData: any;
  href: string = '';
  apiConstant = API_PATH;
  dashboardSearch: boolean = false;
  revenueSearchSidebar: boolean = false;
  nocDashboardSearch: boolean = true;
  mcdAdminSearch: boolean = false;
  departmentSearch: boolean = false;
  isFreshSenction: boolean = true;
  sideBarName: any;
  isDarkMode = false;
  constructor(
    public router: Router,
    private service: commonService,
    private offcanvasService: NgbOffcanvas,
    private themeService: ThemeService
  ) {
    let data: any = localStorage.getItem('userData');
    data = JSON.parse(data);
    if (data != null) {
      this.response = true;
    } else {
      this.response = false;
    }
    this.userData = data?.mcdApplicationUser;
    this.sideBarName = '';
    this.userData?.loginId == 'Railway-deptt'
      ? 'Railway Dashboard'
      : this.userData?.loginId == 'ce-dmrc'
      ? 'DMRC Dashboard'
      : 'Dashboard';
    this.FIRST_NAME = this.userData?.firstName;
    this.LAST_NAME = this.userData?.lastName;
    this.salutation = this.userData?.salutation;
    this.login_id = this.userData?.login_id;
    this.designation = this.userData?.designation;
    this.emailId = this.userData?.emailId;
    // this.passUpdatedOn = new Date (this.userData?.passUpdatedOn).toISOString().split('T')[0];

    // alert("hello1")
  }
  toggleTheme() {
    console.log('toggleTheme() ');

    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }

  // @HostBinding('style.backgroundColor') c_colorrr = "red";

  // @HostListener('mouseenter') c_onEnterrr() {
  //   this.c_colorrr = "red";
  // }

  // @HostListener('mouseleave') c_onLeaveee() {
  //   this.c_colorrr = "yellow";
  // }
  ngOnInit() {
    this.getLocation();
    this.menuItems = ROUTES.filter((menuItem) => menuItem);

    this.href = this.router.url;

    let checkUserRole: any = localStorage.getItem('userData');
    let localStorageJson = JSON.parse(checkUserRole);
    console.log(
      'localStorageJsonlocalStorageJsonlocalStorageJson',
      localStorageJson
    );
    if (!localStorageJson || localStorageJson == '{}') {
      this.router.navigate([`/login`]);
      return;
    }
    if (localStorageJson.role == '22-11' || localStorageJson.role == '22-12') {
      this.isFreshSenction = false;
    } else if (localStorageJson.role == '22-99') {
      this.revenueSearchSidebar = true;
    }

    console.log('user role', localStorageJson.role);
    if (
      localStorageJson.role == '22-11' ||
      localStorageJson.role == '22-12' ||
      localStorageJson.role == '22-2'
    ) {
      this.dashboardSearch = true;
    }
    if (
      localStorageJson.role == '22-28' ||
      localStorageJson.role == '22-29' ||
      localStorageJson.role == '22-30' ||
      localStorageJson.role == '22-31' ||
      localStorageJson.role == '22-32' ||
      localStorageJson.role == '22-33' ||
      localStorageJson.role == '22-34' ||
      localStorageJson.role == '22-35' ||
      localStorageJson.role == '22-36' ||
      localStorageJson.role == '22-37' ||
      localStorageJson.role == '22-38' ||
      localStorageJson.role == '22-39' ||
      localStorageJson.role == '22-40' ||
      localStorageJson.role == '22-41' ||
      localStorageJson.role == '22-42' ||
      localStorageJson.role == '22-43' ||
      localStorageJson.role == '22-44' ||
      localStorageJson.role == '22-45' ||
      localStorageJson.role == '22-46' ||
      localStorageJson.role == '22-47' ||
      localStorageJson.role == '22-49' ||
      localStorageJson.role == '22-51'
    ) {
      this.nocDashboardSearch = false;
    } else if (
      localStorageJson.role == '22-3' ||
      localStorageJson.role == '22-4' ||
      localStorageJson.role == '22-5' ||
      localStorageJson.role == '22-6' ||
      localStorageJson.role == '22-7' ||
      localStorageJson.role == '22-8' ||
      localStorageJson.role == '22-13' ||
      localStorageJson.role == '22-34'
    ) {
      this.departmentSearch = true;
    } else if (localStorageJson.role == '22-98') {
      this.mcdAdminSearch = true;
    } else {
      // this.hideSearchUserID = true
      console.log('----*******');
    }
  }
  hamburgerToggleClass: boolean = false;
  hamburgerToggle() {
    this.hamburgerToggleClass = !this.hamburgerToggleClass;
    console.log(this.hamburgerToggleClass);
  }

  download(): void {
    // this.downloadfile
    //   .download('assets/DS-Client.zip')
    //   .subscribe(blob => {
    //     const a = document.createElement('a')
    //     const objectUrl = URL.createObjectURL(blob)
    //     a.href = objectUrl
    //     a.download = 'DS-Client.zip';
    //     a.click();
    //     URL.revokeObjectURL(objectUrl);
    //   })
  }
  logout(): void {
    // let userID=`?loginId=${this.userData.biometricId}`
    // console.log(this.apiConstant.logout,userID);
    // this.service.getService(this.apiConstant.logout,`?loginId=${this.userData.biometricId}`).subscribe((res: any) =>{
    //   console.log(res)
    //   // console.log(this.apiConstant.logout,userID)
    // })
    // ?loginId=10027053

    localStorage.removeItem('userData');
    this.router.navigate(['login']);
  }
  ngDoCheck() {}
  closeResult = '';

  open(content: any) {
    this.offcanvasService
      .open(content, { ariaLabelledBy: 'offcanvas-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === OffcanvasDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === OffcanvasDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on the backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getDashboardURL() {
    if (this.userData?.biometricId == 'ce-dmrc') {
      return 'noc-dashboard';
    }
    if (isNaN(parseFloat(this.userData?.biometricId))) {
      return 'dashboard';
    }
    return 'departmentDashboard';
  }
}
