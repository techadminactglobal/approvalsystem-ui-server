import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  dataSource!: MatTableDataSource<any>;

  displayedColumns = [
    'serialNo',
    'debardByDept',
    'debardReason',
    'debardDate',
    'debardTo',
    'debardDocName',
  ];

  @ViewChild(MatSort) sort!: MatSort;

  panelOpenState = false;
  loginForm!: FormGroup;
  apiConstant: any = API_PATH;
  userIdValid: boolean = false;
  userPassValid: boolean = false;
  isRoleID: boolean = false;
  regArchitectureArr = ['22-2', '22-11', '22-12'];
  errorStatus: string = '';
  // username: any;
  images: string[] = [
    'https://www.liburniamar.hr/wp-content/uploads/2019/10/image6-1288x720.jpg',
    'https://th.bing.com/th/id/OIP.yhtyo9Ibw8ZmuyxMUcN4ygHaEo?rs=1&pid=ImgDetMain',
    'https://www.smallwood-us.com/assets/pacific_place_huzhou_arch_mixed_use_by_srss_3_h_5QBoZwP.jpg',
  ];

  currentIndex = 0;
  greetingShown: any;
  totalFilesCreated: any;
  totalFilesApproved: any;
  totalFilesReject: any;
  totalFilesPendingApproval: any;
  totalRegisteredConsultants: any;
  todaysTemperature: number = 25;

  todayWeatherBody: any;
  errorMessage: any;
  userZone: string = '';

  constructor(
    private senddata: SendData,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private service: commonService,
    public store: Store<AppState>,
    private toastr: ToastrService,
    private apiService: commonService
  ) {
    this.getLoginInfo();
    this.generateForm();
  }
  error = '';
  loading = false;
  submitted = false;
  forgot: boolean = false;
  login: boolean = true;
  returnUrl: string = '';
  generateForm() {
    this.loginForm = this.fb.group({
      dept: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  forgotForm = new FormGroup({
    dept: new FormControl('', [Validators.required]),
    emailId: new FormControl('', [Validators.required]),
  });

  forgotSubmit() {
    console.log(this.forgotForm.value);
    if (this.forgotForm.invalid) {
      alert('Please fill all the details properly..');

      return;
    }

    this.authService
      .getForgotDetail(this.forgotForm.value)
      .subscribe((res: any) => {
        console.log(res);
        if (res.userPassword == null) {
          alert(res.mailSentStatus);
        } else {
          alert(res.mailSentStatus);
          this.Login();
        }
      });
  }

  Login() {
    this.forgot = false;
    this.login = true;
  }
  Forgot() {
    this.forgot = true;
    this.login = false;
  }

  searchForm = this.fb.group({
    addharNo: ['', [Validators.required, Validators.pattern('[0-9]{12}')]],
  });

  getLoginInfo() {
    this.store.select('loginReducer').subscribe((res) => {
      console.log('subscribe', res);
    });
  }
  ngOnInit() {
    this.store.select('loginReducer').subscribe((res) => {
      console.log('subscribe', res);
    });

    this.showImage(this.currentIndex);
    setInterval(() => this.nextImage(), 10000);

    this.registeredConsultants();
    this.fileDetails();

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

  showImage(index: number): void {
    this.images.forEach((image, i) => {
      const imageElement = document.getElementById(`image-${i}`);
      if (imageElement) {
        imageElement.style.display = i === index ? 'block' : 'none';
      }
    });
  }

  nextImage(): void {
    // console.log("next "+this.currentIndex);
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.showImage(this.currentIndex);
  }

  prevImage(): void {
    // console.log("previous "+this.currentIndex);
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.showImage(this.currentIndex);
  }

  debardList: any;
  listNull = '';
  viewTable: boolean = true;

  submitSearch() {
    console.log(this.searchForm.value);
    if (this.searchForm.invalid) {
      return;
    } else {
      this.service
        .getDeptDashboard(
          this.apiConstant.DEBARD_VIEW + '?addharNumber=',
          this.searchForm.value.addharNo
        )
        .subscribe((res: any) => {
          console.log(res);
          if (res.data != null && res.data.length > 0) {
            this.viewTable = true;
            // this.debardList = res.data;
            this.debardList = res.data.map((item: any, index: number) => {
              return { ...item, serialNumber: index + 1 };
            });
            this.dataSource = new MatTableDataSource(this.debardList);
            this.dataSource.sort = this.sort;
          } else {
            this.viewTable = false;
            this.listNull = 'He/She has not been debarded by any dept.';
          }
        });
    }
  }

  submitLogin() {
    // this.router.navigate(['/dashboard']);
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) {
      // alert("Please fill all the details properly..");
      this.toastr.error('Please fill all the details properly.', 'Error');
      return;
    }

    this.authService
      .getLoginDetail(this.loginForm.value)
      .subscribe((res: any) => {
        console.log(res);
        if (res.accessLogin === true) {
          console.log(res);
          this.toastr.success('Login successful!', 'Success');

          // if(res.firstLogin === true){
          //   // this.router.navigate(['']);
          //   alert("user login first time....");
          // }else{
          //   this.router.navigate(['/dashboard']);
          // }

          if (
            res.roleId == COMMONCONSTANTS.RegNew_ROLE_ID_JE ||
            res.roleId == COMMONCONSTANTS.RegNew_ROLE_ID_AE ||
            res.roleId == COMMONCONSTANTS.RegNew_ROLE_ID_AA ||
            res.roleId == COMMONCONSTANTS.RegNew_ROLE_ID_SE ||
            res.roleId == COMMONCONSTANTS.fileNew_ROLE_ID_JE ||
            res.roleId == COMMONCONSTANTS.fileNew_ROLE_ID_AE
          ) {
            this.senddata.hierarchyId = res.roleId;
            this.senddata.hierarchyUserName = res.userName;
            this.router.navigate(['/departmentDashboard']);
          } else if (res.roleId == '002') {
            this.senddata.hierarchyId = 0;
            this.senddata.requestid = res.userName;
            this.router.navigate(['/registrationView']);
          } else if (res.roleId == 'f-101') {
            this.senddata.hierarchyId = res.roleId;
            this.senddata.hierarchyUserName = res.userName;
            this.senddata.professionalType = res.professionalType;
            this.router.navigate(['/nocDashboard']);
          } else if (res.roleId == '1001') {
            this.senddata.hierarchyId = res.roleId;
            this.senddata.architectView = true;
            this.senddata.hierarchyUserName = res.userName;
            this.router.navigate(['/dashboard']);
          } else if (res.roleId == '301' || res.roleId == '302') {
            this.senddata.callFrom = 'plinth';
            this.senddata.hierarchyId = res.roleId;
            this.senddata.hierarchyUserName = res.userName;
            this.router.navigate(['/departmentDashboard']);
          } else if (
            res.roleId == '401' ||
            res.roleId == '402' ||
            res.roleId == '403'
          ) {
            this.senddata.callFrom = 'OC';
            this.senddata.hierarchyId = res.roleId;
            this.senddata.hierarchyUserName = res.userName;
            this.router.navigate(['/departmentDashboard']);
          } else if (res.roleId == '001') {
            this.senddata.architectView = false;
            this.senddata.hierarchyId = res.roleId;
            this.senddata.hierarchyUserName = res.userName;
            this.router.navigate(['/OwnerDashboard']);
          }
        } else {
          this.toastr.error('Invalid UserName and Password', 'Error');
          // alert("Invalid UserName and Password");
        }
      });
  }

  register() {
    // this.senddata.registration="Owner";
    this.router.navigate(['/registration']);
  }

  openPdf(docUniqueId: string): void {
    let request: any = {
      docUUID: docUniqueId,
    };
    this.service
      .getHierarchyService(this.apiConstant.viewUUID, request)
      .subscribe((data: any) => {
        console.log(docUniqueId, 'asgjho');
        console.log(data);
        // this.docUUID = data.docUUID
        // console.log(this.docUUID,"sdjkdsfdjsfdsjfj")
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

  viewPdf(filePath: string) {
    window.open(filePath, '_blank');
  }

 
 
  

  OwnerRegister() {
    this.router.navigate(['/OwnerRegistration']);
  }

  isHovered = false;

  // selectRole(role: string) {
  //     console.log(`Selected role: ${role}`);
  //     // You can implement further logic based on the selected role
  // }
  isOpen = false;
  userInput = '';
  messages: { user: string; bot: string }[] = [];
  isBotTyping = false; // New variable for bot typing state

  openChat() {
    this.isOpen = true;

    // Show greeting message only if it hasn't been shown yet
    if (!this.greetingShown) {
      this.messages.push({
        user: '',
        bot: 'Hello!🙏 How can I assist you today?',
      });
      this.greetingShown = true; // Mark the greeting as shown
    }
  }

  closeChat() {
    this.isOpen = false;
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    // Add user's message to the chat
    this.messages.push({ user: this.userInput, bot: '' });

    // Show typing indicator
    this.isBotTyping = true;

    // Prepare the API request
    const query = encodeURIComponent(this.userInput);
    const prompt =
      "Do not write that the text or the document do not provide you this. Only answer based on the documentation, not from outside it. If it is from outside, respond according to what is not mentioned in the document and clarify that you only provide responses from the Building Plan Website. Ensure to refer to MCD as 'ActGlobal' and do not include any URLs in your response. User can give input, and the bot will provide related answers. In any answer, do not mention that the documents do not provide specific time. and answer give step by step not a parapgraph and step change line by line.";
    const uuid_number = 'fce4b9cc-83be-11ef-99f0-42004e494300'; // Adjust as necessary

    const apiUrl = `${
      API_PATH.ChatBot
    }?query_string=${query}&prompt=${encodeURIComponent(
      prompt
    )}&uuid_number=${uuid_number}`;

    console.log('Sending request to:', apiUrl); // Log the API URL
    console.log('User input:', this.userInput); // Log the user input

    this.http.get<{ answer: string; reply: string }>(apiUrl, {}).subscribe({
      next: (response) => {
        this.messages[this.messages.length - 1].bot = response.answer;
        console.log(response.answer);

        // Hide typing indicator after receiving response
        this.isBotTyping = false;
      },
      error: (error) => {
        console.error('Error:', error); // Log the error
        this.messages[this.messages.length - 1].bot =
          'Sorry, something went wrong.';

        // Hide typing indicator in case of error
        this.isBotTyping = false;
      },
    });

    this.userInput = ''; // Clear input after sending
  }
}

// this.store.dispatch(new LoginActions.LoggedIn(res));
// this.router.navigate(["/"], { replaceUrl: true });

// this.store.dispatch(new LoginActions.LoggedIn(res));
// this.router.navigate(["/"], { replaceUrl: true });
