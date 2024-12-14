import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { commonService } from 'src/app/services/common.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';
import { API_PATH } from 'src/environments/api-constant';
import { AuthService } from 'src/app/services/auth.service';
import { SendData } from 'src/app/SendData';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-new-first-form',
  templateUrl: './new-first-form.component.html',
  styleUrls: ['./new-first-form.component.scss']
})
export class NewFirstFormComponent {
ngModel: any;
 
onCancel() {
throw new Error('Method not implemented.');
}
  @ViewChild('myModal') modal!: ElementRef;
  AP = ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Kadapa", "Krishna", "Kurnool", "Prakasam", "Nellore", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari"];
  AR = ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kra Daadi", "Kurung Kumey", "Lohit", "Longding", "Lower Dibang Valley", "Lower Subansiri", "Namsai", "Papum Pare", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang", "Itanagar"];
  AS = ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup Metropolitan", "Kamrup (Rural)", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Dima Hasao", "Sivasagar", "Sonitpur", "South Salmara Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"];
  BR = ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"];
  CT = ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Janjgir Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"];
  GA = ["North Goa", "South Goa"];
  GJ = ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"];
  HR = ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Mewat", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"];
  HP = ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"];
  JK = ["Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kargil", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Leh", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"];
  JH = ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"];
  KA = ["Bagalkot", "Bangalore Rural", "Bangalore Urban", "Belgaum", "Bellary", "Bidar", "Vijayapura", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Gulbarga", "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysore", "Raichur", "Ramanagara", "Shimoga", "Tumkur", "Udupi", "Uttara Kannada", "Yadgir"];
  KL = ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"];
  MP = ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna",
    "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"];
  MH = ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"];
  MN = ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"];
  ML = ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"];
  MZ = ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip", "Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"];
  NL = ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"];
  OR = ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Debagarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundergarh"];
  PB = ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Firozpur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Mohali", "Muktsar", "Pathankot", "Patiala", "Rupnagar", "Sangrur", "Shaheed Bhagat Singh Nagar", "Tarn Taran"];
  RJ = ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Ganganagar", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Tonk", "Udaipur"];
  SK = ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"];
  TN = ["Ariyalur", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivaganga", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruur", "Vellore", "Viluppuram", "Virudhunagar"];
  TG = ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar", "Jogulamba", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem", "Mahabubabad", "Mahbubnagar", "Mancherial", "Medak", "Medchal", "Nagarkurnool", "Nalgonda", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Ranga Reddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"];
  TR = ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"];
  UP = ["Agra", "Aligarh", "Allahabad", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"];
  UT = ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri", "Pithoragarh", "Rudraprayag", "Tehri", "Udham Singh Nagar", "Uttarkashi"];
  WB = ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"];
  AN = ["Nicobar", "North Middle Andaman", "South Andaman"];
  CH = ["Chandigarh"];
  DN = ["Dadra Nagar Haveli"];
  DD = ["Daman", "Diu"];
  DL = ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"];
  LD = ["Lakshadweep"];
  PY = ["Karaikal", "Mahe", "Puducherry", "Yanam"];

  optionsList: any;
statesList: any;

  
  onStateChange(event: MatSelectChange): void {
    const selectedValue = event.value;
    console.log('Selected State:', selectedValue);

    switch (selectedValue) {
      case "AP":
        this.optionsList = this.AP;
        break;
      case "AR":
        this.optionsList = this.AR;
        break;
      case "AS":
        this.optionsList = this.AS;
        break;
      case "BR":
        this.optionsList = this.BR;
        break;
      case "CT":
        this.optionsList = this.CT;
        break;
      case "GA":
        this.optionsList = this.GA;
        break;
      case "GJ":
        this.optionsList = this.GJ;
        break;
      case "HR":
        this.optionsList = this.HR;
        break;
      case "HP":
        this.optionsList = this.HP;
        break;
      case "JK":
        this.optionsList = this.JK;
        break;
      case "JH":
        this.optionsList = this.JH;
        break;
      case "KA":
        this.optionsList = this.KA;
        break;
      case "KL":
        this.optionsList = this.KL;
        break;
      case "MP":
        this.optionsList = this.MP;
        break;
      case "MH":
        this.optionsList = this.MH;
        break;
      case "MN":
        this.optionsList = this.MN;
        break;
      case "ML":
        this.optionsList = this.ML;
        break;
      case "MZ":
        this.optionsList = this.MZ;
        break;
      case "NL":
        this.optionsList = this.NL;
        break;
      case "OR":
        this.optionsList = this.OR;
        break;
      case "PB":
        this.optionsList = this.PB;
        break;
      case "RJ":
        this.optionsList = this.RJ;
        break;
      case "SK":
        this.optionsList = this.SK;
        break;
      case "TN":
        this.optionsList = this.TN;
        break;
      case "TG":
        this.optionsList = this.TG;
        break;
      case "TR":
        this.optionsList = this.TR;
        break;
      case "UP":
        this.optionsList = this.UP;
        break;
      case "UT":
        this.optionsList = this.UT;
        break;
      case "WB":
        this.optionsList = this.WB;
        break;
      case "AN":
        this.optionsList = this.AN;
        break;
      case "CH":
        this.optionsList = this.CH;
        break;
      case "DN":
        this.optionsList = this.DN;
        break;
      case "DD":
        this.optionsList = this.DD;
        break;
      case "DL":
        this.optionsList = this.DL;
        break;
      case "LD":
        this.optionsList = this.LD;
        break;
      case "PY":
        this.optionsList = this.PY;
        break;
    }
  }

  FROM_TITLE = ''
  FORM_NAME = "SANCTION";
  ROUTES: any = {
    'SARAL': 'saralBuildingPlan',
    'UPTO500': 'upto500BuildingPlan',
    'SANCTION': 'sanctionBuildingPlan'
  }
  underRoadWidening: boolean = false;
  owners = 1
  apiConstant = API_PATH;
  // planType: any = [{ id: 1, name: 'Fresh' }];
 


buildingSubType: any;
findBuildingSubType(buildingId:string){
  this.service.getButtonDetails(this.apiConstant.FindBuildingSubTpe, buildingId).subscribe((res: any) => {
    console.log(res);
    this.buildingSubType = res.data;
  });
}

  natureType: any = [{
    "typeId": 1,
    "typeName": "New",
  }, {
    "typeId": 2,
    "typeName": "Revised",
  }];

  // ownerType = [
  //   {
  //     "lable": "Single owner",
  //     "type": "S"
  //   },
  //   {
  //     "lable": "Multiple owners",
  //     "type": "M"
  //   },
  // ]

  subType = [
    {
      "lable": "House",
      "type": 1
    },
    {
      "lable": "Apartment",
      "type": 2
    },
    {
      "lable": "Villa",
      "type": 3
    },
    {
      "lable": "Bunglow",
      "type": 4
    },
  ]

  requestID: any = 0;

  newForm!: FormGroup;

  constructor(
    private service: commonService,
    private fb: FormBuilder,
    public dialogRef: MatDialog,
    public datepipe: DatePipe,
    private authService: AuthService,
    public senddata: SendData, private router: Router
  ) {

  }
  
  
  hierarchyUserName:any;
frId:any;
  
planType: any;
buildingType: any 
pAreaMaxValue: number = 0;
  ngOnInit(): void {

    // if (this.senddata.hierarchyUserName?.toLowerCase().startsWith('ca')) {
    //   this.planType= [{
    //     "planTypeName": "SARAL",
    //   },{
    //     "planTypeName": "UPTO500",
    //   },{
    //     "planTypeName": "SANCTION",
    //   },
    // ];
    // }
    // else if (this.senddata.hierarchyUserName?.toLowerCase().startsWith('e')) {
    //   this.planType= [{
    //     "planTypeName": "SARAL",
    //   },{
    //     "planTypeName": "UPTO500",
    //   }
    // ];
    // } else {
    //   this.planType= [{
    //     "planTypeName": "SARAL",
    //   }
    // ];
    // }

    
    if (localStorage.getItem("hierarchyUserName")?.toLowerCase().startsWith('ca')) {
      this.planType = [
        { "planTypeName": "SARAL"},
        { "planTypeName": "UPTO500"},
        { "planTypeName": "SANCTION" }
      ];
      // this.pAreaMaxValue = 9999999;  // No limit on plot area for 'ca'
    } else if (localStorage.getItem("hierarchyUserName")?.toLowerCase().startsWith('e')) {
      this.planType = [
        { "planTypeName": "SARAL"},
        { "planTypeName": "UPTO500" }
      ];
      // this.pAreaMaxValue = 500;  // Maximum plot area of 500 for 'e'
    } else if (localStorage.getItem("hierarchyUserName")?.toLowerCase().startsWith('s')) {
      this.planType = [
        { "planTypeName": "SARAL" }
      ];
      // this.pAreaMaxValue = 250;  // Maximum plot area of 250 for 's'
    }
  
    // Rebuild form to apply dynamic validation
    this.buildForm();
  
  
 


    this.getZones();
    this.getColonies(this.wards);
    this.getWards(this.zones);    
    this.hierarchyUserName = localStorage.getItem('hierarchyUserName');
    this.frId = localStorage.getItem('frid');
    this.FORM_NAME = this.getFormName();
    this.buildForm()
    this.newForm.get(["plotDetails", "pArea"])?.valueChanges.subscribe(() => {
      console.log("adeww");

      this.calculateNpArea();
    });
    this.newForm.get(["plotDetails", "areaAffectedInRoadWidening"])?.valueChanges.subscribe(() => {
      this.calculateNpArea();
    });
  }

  calculateNpArea() {
    const pArea = this.newForm.get(['plotDetails', 'pArea'])?.value;
    const areaAffectedInRoadWidening = this.newForm?.get(['plotDetails', 'areaAffectedInRoadWidening'])?.value;


    const npArea = pArea - areaAffectedInRoadWidening;

    // Set the calculated value to npArea control
    console.log(pArea, areaAffectedInRoadWidening, npArea);
    this.newForm.get(['plotDetails', 'npArea'])?.setValue(npArea);

    console.log(this.newForm.get(['plotDetails'])?.value);

  }

  getFormName() {
    if (this.router.url.includes("saralBuildingPlan")) {
      this.FROM_TITLE = 'Saral Scheme Building Plan'
      return 'SARAL'
    } else if (this.router.url.includes("upto500BuildingPlan")) {
      this.FROM_TITLE = 'Upto 500 Scheme Building Plan'
      return 'UPTO500'
    } else if (this.router.url.includes("sanctionBuildingPlan")) {
      this.FROM_TITLE = 'Sanction Scheme of Building Plan'
      return 'SANCTION'
    }
    return 'SANCTION'
  }

  hideShowDataFun(data: any) {
    if (data === 'underRoadWideningYes') {
      this.underRoadWidening = true;
    } else if (data === 'underRoadWideningNo') {
      this.underRoadWidening = false;
    }
  }

  // isSameAddress = false;
  // copyAddress() {
  //   this.isSameAddress = !this.isSameAddress;

  //   if (this.isSameAddress) {
  //     const primaryValues = this.newForm.get('applicantDetails.0.primaryAddress')!.value;
  //     this.newForm.get('applicantDetails.0.secondaryAddress')!.patchValue(primaryValues);
  //   } else {
  //     this.newForm.get('applicantDetails.0.secondaryAddress')!.reset();
  //   }
  // }

  buildForm() {
    this.newForm = this.fb.group({
      basicInfo: this.fb.group({
        bCategory: ['', [Validators.required]],
        natureOfProject: ['', [Validators.required]],
        bSubCategory: ['', [Validators.required]],
        consultantLoginId: [this.hierarchyUserName, [Validators.required]],
        frId: [this.frId, [Validators.required]],
        recordId: [''],
        planType: ['', [Validators.required]],
      }),
      siteLocationDetails: this.fb.group({
        landMark: [''],
        state: ['', [Validators.required]],
        district: ['', [Validators.required]],
        pinCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
        address: ['', [Validators.required]],
        blockNumber: ['', [Validators.required]],
        zone:['', [Validators.required]],
        ward:['', [Validators.required]],
        colony:['', [Validators.required]],
        
      }),
      // applicantInfo: this.fb.group({
      //   oType: ['', [Validators.required]],
      //   noOfOwners: ['', [Validators.required, Validators.min(1), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
      // }),
      // applicantDetails: this.fb.array([this.createOwner()], [Validators.required]),
      plotDetails: this.fb.group({
        cPlot: [false, [Validators.required]],
        pArea: ['', [
          Validators.required, 
          Validators.pattern(/^(?:\d*[0-9](?:\.[0-9]{1,3})?|\.[0-9]{1,3})$/), // Validate number with decimal places
          Validators.max(this.pAreaMaxValue) // Dynamic max value
        ]
      ],
        areaAffectedInRoadWidening: ['', Validators.pattern(/^(?:\d*[0-9](?:\.[0-9]{1,3})?|\.[0-9]{1,3})$/)],
        npArea: ['', [Validators.required, Validators.pattern(/^(?:\d*[0-9](?:\.[0-9]{1,3})?|\.[0-9]{1,3})$/)]],
        lcSetback: [false],
        lcFar: [false],
        mVentilation: [false],
        cArea: ['', [Validators.required, Validators.pattern(/^(?:\d*[0-9](?:\.[0-9]{1,3})?|\.[0-9]{1,3})$/)]],
        cAreaFar: ['', [Validators.required, Validators.pattern(/^(?:\d*[0-9](?:\.[0-9]{1,3})?|\.[0-9]{1,3})$/)]],
        frontWidth: ['', [Validators.required, Validators.pattern(/^(?:\d*[0-9](?:\.[0-9]{1,3})?|\.[0-9]{1,3})$/)]],
        bHeight: ['', [Validators.required, Validators.pattern(/^(?:\d*[0-9](?:\.[0-9]{1,3})?|\.[0-9]{1,3})$/)]],
      }),

      fileDocDetails: this.fb.array([this.fileTypeForm()], [Validators.required]),

    });
    this.updatePlotAreaValidator();

  }

  // createOwner() {
  //   return this.fb.group({
  //     aadharNum: ['', [Validators.pattern(/^\d{12}$/), Validators.required]],
  //     name: ['', [Validators.required]],
  //     contactNumber:  ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
  //     dob: ['', [Validators.required]],
  //     email: ['', [Validators.required, Validators.email]],
  //     isPrimary: [false],
  //     primaryAddress : this.fb.group({
  //       address: ['', [Validators.required]],
  //       landMark: ['', [Validators.required]],
  //       state: ['', [Validators.required]],
  //       district: ['', [Validators.required]],
  //       blockNumber: ['', [Validators.required]],
  //       pinCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  //     }),
  //     secondaryAddress : this.fb.group({
  //       address: [''],
  //       landMark: [''],
  //       state: [''],
  //       district: [''],
  //       blockNumber: [''],
  //       pinCode: ['', [Validators.pattern(/^\d{6}$/)]],
  //     }),
  //   })
  // }

  fileTypeForm() {
    return this.fb.group({
      frName: ['', Validators.required],
      frUniqueNo: ['', Validators.required],
      frType: ['', Validators.required]
    });
  }

  dialog: boolean = false;
  datasave: boolean = false;
  hideSubmit: boolean = false;
  fileNo: any;
  frid: any;
  createdBy: any;
  newFormSubmit() {
    // this.senddata.hierarchyUserName = this.senddata.hierarchyUserName;
    if (this.newForm.invalid) {
      console.log(this.newForm.value);

      const nparea = this.newForm.value.plotDetails.npArea;
      if (nparea < 0) {
        alert("Plot area must be greater then Area affected under road widening");
      }

      alert("Please fill all the details properly..");
      return;
    }
    console.log("this.newForm.value", this.newForm.value);

    this.service.getFileService(this.apiConstant.form_Data, this.newForm.value).subscribe((data: any) => {
      console.log(data);

        localStorage.removeItem('frid');
        localStorage.removeItem('requestid');
        // localStorage.removeItem('hierarchyUserName');
        localStorage.setItem('frid', data.data.frId);
        localStorage.setItem('requestid', data.data.fileNo);
        // localStorage.setItem('hierarchyUserName', this.hierarchyUserName);
        // this.senddata.frid = data.data.frId;
        // this.senddata.requestid = data.data.fileNo;
        // this.senddata.hierarchyUserName = data.data.createdBy;
        if (data.httpStatus === 'OK') {
        this.senddata.dialog = true;
        this.senddata.datasave = true;
        this.hideSubmit = true;
        this.fileNo = data.data.fileNo;
        this.frid = data.data.frId;
        this.createdBy = data.data.createdBy;

        this.senddata.formOne = true;
        this.router.navigate(['/home']);
      } else {
        this.senddata.dialog = true;
        this.senddata.datasave = true;
        this.senddata.hideSubmit = true;
      }

    });

  }


  get file_record(): FormArray {
    return this.newForm.get('fileDocDetails') as FormArray;
  }

  get owner_list(): FormArray {
    return this.newForm.get('applicantDetails') as FormArray;
  }


  checkFileType(event: any, extensions = ['pdf', 'PDF']) {
    var fileData = event.target.files[0];
    if (!fileData) return false;
    var ext = fileData.name.split('.').slice(-1)[0];

    if (!extensions.includes(ext)) {
      alert('File type is incorrect.');
      return false;
    }
    if (fileData.size > 15728640) {
      alert('File Size must be below 15MB.');
      return false;
    }
    return true;
  }

  uploadAttechedFileDwg(
    event: any,
    fileName: any,
    index: number,
    extensions = ['dwg']
  ) {
    var fileData = event.target.files[0];
    if (fileData.size > 15728640) {
      event.target.value = '';
      // this.myForm.patchValue({
      //   [name]: '',
      // });
      alert('Please Upload under 15 MB File');
      return;
    }
    if (!this.checkFileType(event, extensions)) {
      event.target.value = '';
      (this.newForm.get([fileName]) as FormArray)
        ?.at(index)
        .patchValue({
          fr_name: '',
          fr_unique_no: '',
        });
      return;
    }

    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    var inputValue = ''
    reader.onload = (event: any) => {
      inputValue = event.target.result;

      const json = {
        "docFileName": fileData.name.split(".")[0],
        "docContentType": fileData.name.split(".")[1],
        "docByteStream": inputValue.split(",")[1],
        "docName": fileData.name.split(".")[0]
      }

      this.service.postService(this.apiConstant.downloadUUID, json).subscribe((res: any) => {
        console.log("data =================> ", res);
        if (!res.docUUID) {
          return
        }
        (this.newForm.get([fileName]) as FormArray)?.at(index).patchValue({
          "frName": fileData.name.split(".")[0],
          "frUniqueNo": res.docUUID,
          "frType": fileData.name.split(".")[1]
        })
        console.log(this.newForm.value);

      })
    }

  }

  AlldataSubmit() {
    if (this.newForm.invalid) {
      return;
    } else {
      // this.spinerLoader = true;
      // this.dialogRef.open(SubmitDialogComponent, {
      //   disableClose: true, // This option prevents closing the dialog by clicking outside
      // });
      let data: any = localStorage.getItem('userData');
      data = JSON.parse(data);
      // this.apiConstant.submitSaralForm1
      // http://172.18.1.175:9011/obps/save/sanctionform
      this.service
        .postService(this.apiConstant.NEW_SAVE_FIRST_FORM_API, this.newForm.value)
        .subscribe(
          (res: any) => {
            // this.spinerLoader = true;
            // this.dialogRef.open(SubmitDialogComponent, {
            //   disableClose: true, // This option prevents closing the dialog by clicking outside
            // });
            console.log('successfull--res', res.data);
            this.requestID = res.data.obp_building_plan_req.buildingPlanReqDetailId;
            console.log('requestID', this.requestID);
            if (this.requestID > 0) {
              console.log("request id: " + this.requestID)
              this.dialogRef.closeAll();
              // this.dialogRef.open(SubmitDialogComponent, {
              //   disableClose: true, // This option prevents closing the dialog by clicking outside
              // });
            }
          },
          (error) => {
            // this.spinerLoader = true;
            // this.dialogRef.open(SubmitDialogComponent, {
            //   disableClose: true, // This option prevents closing the dialog by clicking outside
            // });
          }
        );
    }
  }

  // incrementOwner() {
  //   if (this.newForm.value.applicantInfo.oType !== "M") return;
  //   this.owners += 1;
  //   (this.newForm.get(["applicantDetails"]) as FormArray).push(this.createOwner());
  // }
  // decrementOwner() {
  //   if (this.newForm.value.applicantInfo.oType == "S") return

  //   if (this.owners == 1) return
  //   this.owners -= 1;
  //   (this.newForm.get(["applicantDetails"]) as FormArray).removeAt(this.owners)
  // }

  // deleteOwner(index: number) {
  //   (this.newForm.get(["applicantDetails"]) as FormArray).removeAt(index)
  //   this.owners -= 1;

  // }

  back(){
    this.router.navigate(['/dashboard']);
  }
 


  // zones: any;
  // selectedZone: string = ''; 
  // getZones(): void {
  //   this.service.getButtonDetails(this.apiConstant.zoneDetails, "").subscribe(
  //     (response: any) => {
  //       // Log the response to ensure we're getting the correct data
  //       console.log('API Response:', response);

  //       // Check the response structure and extract zones
  //       if (response.httpStatus === 'OK' && Array.isArray(response.data)) {
  //         this.zones = response.data;
  //         console.log('Zones data:', this.zones); // Log zones to check
  //       } else {
  //         console.error('Invalid data structure or response');
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching zones:', error);
  //     }
  //   );
  // }

  // onZoneChange(event: any): void {
  //   const selectedZone = event.value;
  //   console.log('Selected Zone:', selectedZone);
  // }

 zones: any = [];
wards: any = [];
colonies: any = [];
selectedZone: string = ''; 
selectedWard: string = ''; 
selectedColony: string = ''; 
getZones(): void {
  this.service.getButtonDetails(this.apiConstant.zoneDetails, "").subscribe(
    (response: any) => {
      console.log('API Response for Zones:', response);

      // Check the response structure and extract zones
      if (response.httpStatus === 'OK' && Array.isArray(response.data)) {
        this.zones = response.data;
        console.log('Zones data:', this.zones); // Log zones to check
      } else {
        console.error('Invalid data structure or response for Zones');
      }
    },
    (error) => {
      console.error('Error fetching zones:', error);
    }
  );
}

// Fetch Wards based on the selected Zone
getWards(zoneId: string): void {
  this.service.getButtonDetails(this.apiConstant.wardDetails, zoneId).subscribe(
    (response: any) => {
      console.log('API Response for Wards:', response);

      if (response.httpStatus === 'OK') {
        this.wards = response.data;
        console.log('Wards data:', this.wards);
      } else {
        console.error('Invalid data structure or response for Wards');
      }
    },
    (error) => {
      console.error('Error fetching wards:', error);
    }
  );
}

// Fetch Colonies based on the selected Ward
getColonies(wardId: string): void {
  this.service.getButtonDetails(this.apiConstant.colonyDetails, wardId).subscribe(
    (response: any) => {
      console.log('API Response for Colonies:', response);

      if (response.httpStatus === 'OK' && Array.isArray(response.data)) {
        this.colonies = response.data;
        console.log('Colonies data:', this.colonies);
      } else {
        console.error('Invalid data structure or response for Colonies');
      }
    },
    (error) => {
      console.error('Error fetching colonies:', error);
    }
  );
}
onZoneChange(event: any): void {
  const selectedZoneId = event.value;
  console.log('Selected Zone ID:', selectedZoneId);
  const selectedZone = this.zones.find((zone: { zoneName: any; }) => zone.zoneName === selectedZoneId);
  
  if (selectedZone) {
    this.selectedZone = selectedZone.zoneGenerateId;
    console.log('Selected Zone Name:', selectedZone);
    this.newForm.get('siteLocationDetails')?.get('zone')?.setValue(selectedZone.zoneName);
  }
  if(this.selectedZone){
    this.getWards(this.selectedZone);
  }
  console.log("Form Value After Ward Change:", this.newForm.value);

}

onWardChange(event: any): void {
  const selectedWardId = event.value;
  console.log("Selected Ward ID:", selectedWardId);
  
  // Check the selectedWard object
  const selectedWard = this.wards.find((ward: { wardName: any }) => ward.wardName === selectedWardId);
  if (selectedWard) {
    this.selectedWard=selectedWard.wardId;
    console.log("Selected Ward: ", selectedWard);
    this.newForm.get('siteLocationDetails')?.get('ward')?.setValue(selectedWard.wardName);
  }

  if (this.selectedWard) {
    this.getColonies(this.selectedWard);
  }
  
  console.log("Form Value After Ward Change:", this.newForm.value);
}

// findPlanType(event: any): void {
//   const plan = event.value;
//   // const planType = this.newForm?.get(['basicInfo', 'planType'])?.value;
// console.log(plan,"plangyutfugu")
//   if (plan==="SARAL"){
//     this.pAreaMaxValue = 250; 
//   }else if (plan==="UPTO500"){
//     this.pAreaMaxValue = 500; 
//   }else if (plan==="SANCTION") {
//     this.pAreaMaxValue = 9999999; 
//   }
// }
updatePlotAreaValidator(): void {
  const plotAreaControl = this.newForm.get('plotDetails.pArea');

  // Remove existing validators and set the new ones
  plotAreaControl?.clearValidators();

  plotAreaControl?.setValidators([
    Validators.required,
    Validators.pattern(/^(?:\d*[0-9](?:\.[0-9]{1,3})?|\.[0-9]{1,3})$/), // Validate number with decimal places
    Validators.max(this.pAreaMaxValue) // Apply dynamic max value
  ]);

  // Manually trigger validation after updating the validators
  plotAreaControl?.updateValueAndValidity();
}


findPlanType(event: any): void {
  const plan = event.value;
  console.log(plan, "plan");

  if (plan === "SARAL") {
    this.pAreaMaxValue = 250; 
    
    this.buildingType= [{
      "buildingTypeId": 1,
      "buildingTypeName": "Residential",
    }
    ];
  } else if (plan === "UPTO500") {
    this.pAreaMaxValue = 500; 
    
    this.buildingType= [{
      "buildingTypeId": 1,
      "buildingTypeName": "Residential",
    }
    ];
  } else if (plan === "SANCTION") {
    this.pAreaMaxValue = 9999999; 
    this.buildingType= [{
      "buildingTypeId": 1,
      "buildingTypeName": "Residential",
    },{
      "buildingTypeId": 2,
      "buildingTypeName": "Commercial",
    },{
      "buildingTypeId": 3,
      "buildingTypeName": "Industrial",
    },{
      "buildingTypeId": 40,
      "buildingTypeName": "Other",
    },
    ];
  }

  // Update the validator for the pArea control
  this.updatePlotAreaValidator();
}

}
