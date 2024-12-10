import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { COMMONCONSTANTS } from 'src/app/CONSTANTS/constants';
import { SendData } from 'src/app/SendData';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  sideNav: HTMLElement | null = document.querySelector('.side-nav');
  form: boolean = false;
  debard: boolean = false;
  latitude: any;
  longitude: any;
  latLogMap: boolean = false;
  noc: boolean = false;
  owner:boolean = false;

  constructor(private router: Router, private senddata: SendData) {
    if (localStorage.getItem('hierarchyId') === '1001') {
      this.form = true;
    } else if (localStorage.getItem('hierarchyId') === COMMONCONSTANTS.RegNew_ROLE_ID_JE ||
      localStorage.getItem('hierarchyId') === COMMONCONSTANTS.RegNew_ROLE_ID_AE ||
      localStorage.getItem('hierarchyId') === COMMONCONSTANTS.RegNew_ROLE_ID_AA ||
      localStorage.getItem('hierarchyId') === COMMONCONSTANTS.RegNew_ROLE_ID_SE ||
      localStorage.getItem('hierarchyId') === COMMONCONSTANTS.fileNew_ROLE_ID_JE ||
      localStorage.getItem('hierarchyId') === COMMONCONSTANTS.fileNew_ROLE_ID_AE || localStorage.getItem('hierarchyId') === '301' || 
      localStorage.getItem('hierarchyId') === '302'|| localStorage.getItem('hierarchyId')==='401'|| localStorage.getItem('hierarchyId')==='402'|| localStorage.getItem('hierarchyId')==='403') {
      this.debard = true;
    } else if ( localStorage.getItem('hierarchyId') == 'f-101') {
      this.noc = true;
    }else if( localStorage.getItem('hierarchyId') ==='001') {
      this.owner = true;
    }
  }
  hierarchyId:any;
  hierarchyUserName:any;
  ngOnInit() {
  //  this.hierarchyUserName = localStorage.getItem('hierarchyUserName'); 
  //    this.hierarchyUserName = this.hierarchyUserName;
  //   this.hierarchyId = localStorage.getItem('hierarchyId');
    this.getLocation(); // Call getLocation on initialization
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.latLogMap = this.latitude !== '' && this.longitude !== '';
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
    const addr = `https://www.google.com/maps/place/${this.latitude},${this.longitude}`;
    window.open(addr, '_blank');
  }

  logout() {
    console.log('login clicked');
    this.router.navigate(['/login']);
  }
}
