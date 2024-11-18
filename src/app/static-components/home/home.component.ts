import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { SendData } from 'src/app/SendData';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	animations: [
		trigger('fadeInOut', [
			state('void', style({ opacity: 0 })),
			transition(':enter, :leave', [
				animate('300ms')
			])
		])
	]
})
export class HomeComponent {
	@ViewChild('myModal') modal!: ElementRef;
	@ViewChild('tabGroup')
	tabGroup: any;

	active: any;
	disabled = true;

	onNavChange(changeEvent: NgbNavChangeEvent) {
		if (changeEvent.nextId === 3) {
			changeEvent.preventDefault();
		}
	}

	toggleDisabled() {
		this.disabled = !this.disabled;
		if (this.disabled) {
			this.active = 1;
		}
	}


	constructor(
		public senddata: SendData,
		private router: Router
	) {

	}



	//Registration Form
	reFill() {
		this.router.navigate(['/registration']);
	}

	login() {
		this.router.navigate(['/login']);
	}

	ViewData() {
		this.senddata.requestid = this.senddata.requestid;
		console.log(this.senddata.requestid, "lllllllll")
		this.router.navigate(["/registrationView"]);
	}

	payment() {
		this.senddata.requestid = this.senddata.requestid;
		this.senddata.paymentType = "regNew";
		this.router.navigate(["/payment"]);
	}


	//For First Form
	Detail() {
		this.senddata.requestid = this.senddata.requestid;
		this.router.navigate(['/NewFormView']);
	}

	Dashboard() {
		this.senddata.hierarchyUserName = this.senddata.hierarchyUserName;
		this.router.navigate(['/dashboard']);
	}

	internalDashboard() {
		this.senddata.hierarchyUserName = this.senddata.hierarchyUserName;
		this.senddata.debard = false;
		this.router.navigate(['/departmentDashboard']);
	}


	//For Doc Details
	viewDocument() {
		this.router.navigate(['/supportView']);
	}

	SecondForm() {
		this.router.navigate(['/senondForm']);
	}


	//For Second Form
	viewData() {
		this.router.navigate(['/secondView']);

	}
	NocForm() {
		this.router.navigate(['/nocPage']);
	}


	//Fire Noc 
	Ok() {
		this.router.navigate(['/nocPage']);
	}


	//Plinth Form
	viewDetails(){
		this.senddata.requestid = this.senddata.requestid;
		this.senddata.frid = this.senddata.frid;
		this.router.navigate(['/plintComponentView']);
	}
  
	pay(){
	  this.senddata.paymentType = "plinthNew";
	  this.router.navigate(['/payment']);
	}

	//Occupancy Form
	viewOcDetails(){
		this.senddata.requestid = this.senddata.requestid;
		this.senddata.frid = this.senddata.frid;
		this.router.navigate(['/OccupancyComponentView']);
	}
  
	NocFill(){
	//   this.senddata.paymentType = "plinthNew";
	  this.router.navigate(['/nocPage']);
	}


	DashboardReuplad(){
		this.senddata.hierarchyUserName=this.senddata.hierarchyUserName;
		this.router.navigate(['/dashboard']);
	  }

	  OwnerDashboard(){
		this.senddata.hierarchyUserName = this.senddata.hierarchyUserName;
		this.router.navigate(['/OwnerDashboard']);
	  }

	ngOnInit(): void {
		this.senddata.hierarchyUserName = this.senddata.hierarchyUserName;
		if(this.senddata.OCForm == true){
			this.senddata.plinthForm = false;
			this.senddata.fireNocForm = false;
			this.senddata.formTwo = false;
			this.senddata.docDetails = false;
			this.senddata.formOne = false;
			this.senddata.regForm = false;
			this.senddata.dwgReupload = false;
		}else if(this.senddata.plinthForm == true){
			this.senddata.fireNocForm = false;
			this.senddata.formTwo = false;
			this.senddata.docDetails = false;
			this.senddata.formOne = false;
			this.senddata.regForm = false;
			this.senddata.dwgReupload = false;
		}else if(this.senddata.fireNocForm == true){
			this.senddata.plinthForm = false;
			this.senddata.formTwo = false;
			this.senddata.docDetails = false;
			this.senddata.formOne = false;
			this.senddata.regForm = false;
			this.senddata.dwgReupload = false;
		}else if(this.senddata.formTwo == true){
			this.senddata.docDetails = false;
			this.senddata.formOne = false;
			this.senddata.regForm = false;
			this.senddata.dwgReupload = false;
		}else if(this.senddata.docDetails == true){
			this.senddata.formOne = false;
			this.senddata.regForm = false;
			this.senddata.dwgReupload = false;
		}else if(this.senddata.formOne == true){
			this.senddata.ownerSave = false;
			this.senddata.ownerApplicant = false;
			this.senddata.regForm = false;
			this.senddata.dwgReupload = false;
		}else if(this.senddata.dwgReupload == true){
			this.senddata.regForm = false;
			this.senddata.formOne = false;
		}else if (this.senddata.ownerApplicant == true){
			this.senddata.ownerSave = false;
		}
	}

}