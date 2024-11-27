import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SendData } from 'src/app/SendData';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray,ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { AuthService } from 'src/app/services/auth.service';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';
import { Router } from '@angular/router';
import { __values } from 'tslib';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';

declare var bootstrap: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
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
  form: any;

  
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


  registration = "";
  proff: boolean = false;
  apiConstant = API_PATH;
  attechmentDocument!: FormGroup;
  uploadedFiles = {
    photo: '',
    licensedCert: '',
    educationalCert: ''
  };
  registrationForm!: FormGroup;
  zones: any[] = [];
  selectedZones: string[] = []; // To store selected zones
  
  constructor(
    private service: commonService,
    private authService: AuthService,
    private router: Router,
    private fb:FormBuilder,public senddata: SendData,private sanitizer: DomSanitizer) { }

  ProfessionalCategory = [
    { value: 'Architect', viewValue: 'Architect' },
    { value: 'Supervisor', viewValue: 'Supervisor' },
    { value: 'Engineer', viewValue: 'Engineer' },
    { value: 'Structural Engineer', viewValue: 'Structural Engineer' }
  ];

  salutation = [
    { value: 'Mr.', viewValue: 'Mr.' },
    { value: 'Ms.', viewValue: 'Ms.' },
    { value: 'Dr.', viewValue: 'Dr.' }
  ];

  ngOnInit(): void {
    this.generateCaptcha();
    this.createForm();
    this.getZones();

  }

  createForm(){
   this.registrationForm = new FormGroup({
    consultantDetailModel: this.fb.group({
      salutation: ['', [Validators.required]],
      userType: new FormControl('C'),
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
     
      dob: ['', [Validators.required, minAgeValidator(20)]],
      gender: ['', [Validators.required]],
      professionalType: ['', [Validators.required]],
      zoneDetails: ['', [Validators.required]],  // This binds to the dropdown value
      buildingType: ['', [Validators.required]],
      licensedNo: [''],
      validTo: [''],
      validFrom: [''],
      certificateNo: ['', [Validators.required]],
      addharNo: ['', [Validators.required, Validators.pattern("[0-9]{12}")]],
      email: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")]],
      contactNo: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      // userName: ['', [Validators.required]],
      // authPwd: ['', [Validators.required]],
        // Password1: ['', [Validators.required]],
      }),
      address: this.fb.group({
        state: ['', [Validators.required]],
        district: ['', [Validators.required]],
        pinCode: ['', [Validators.required, Validators.pattern("[0-9]{6}")]],
        addres: ['', [Validators.required]],
        // authPwd: ['', [Validators.required]],
        authPwd: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/)]],
        // userName: ['', [Validators.required]],
        confirmPassword :['',[Validators.required]]
      }),

      supportiveDoc: this.fb.group({
        photoName: this.fb.array([this.fileTypeForm()], [Validators.required]),
        licensedCertificatename: this.fb.array([this.fileTypeForm()]),
        educationalCertificatename:this.fb.array([this.fileTypeForm()]),
      }),
      captcha: new FormControl ('', [Validators.required])
      
    });
      
    this.registrationForm.get(['consultantDetailModel','professionalType'])?.valueChanges.subscribe((value) =>{
      console.log("log==="+value);
      if(value == 'Architect'){
        this.registrationForm.get(['consultantDetailModel','licensedNo'])?.addValidators([Validators.required]);
        this.registrationForm.get(['consultantDetailModel','licensedNo'])?.updateValueAndValidity();

        this.registrationForm.get(['consultantDetailModel','validTo'])?.addValidators([Validators.required]);
        this.registrationForm.get(['consultantDetailModel','validTo'])?.updateValueAndValidity();

        this.registrationForm.get(['consultantDetailModel','validFrom'])?.addValidators([Validators.required]);
        this.registrationForm.get(['consultantDetailModel','validFrom'])?.updateValueAndValidity();

        this.registrationForm.get(['consultantDetailModel','certificateNo'])?.clearValidators();
        this.registrationForm.get(['consultantDetailModel','certificateNo'])?.updateValueAndValidity();
        this.registrationForm.get(['consultantDetailModel','certificateNo'])?.setValue('');

        this.registrationForm.get(['supportiveDoc','licensedCertificatename'])?.addValidators([Validators.required]);
        this.registrationForm.get(['supportiveDoc','licensedCertificatename'])?.updateValueAndValidity();

      }else{
        this.registrationForm.get(['consultantDetailModel','licensedNo'])?.clearValidators();
        this.registrationForm.get(['consultantDetailModel','licensedNo'])?.updateValueAndValidity();
        this.registrationForm.get(['consultantDetailModel','licensedNo'])?.setValue('');
        
        this.registrationForm.get(['consultantDetailModel','validTo'])?.clearValidators();
        this.registrationForm.get(['consultantDetailModel','validTo'])?.updateValueAndValidity();
        this.registrationForm.get(['consultantDetailModel','validTo'])?.setValue('');
        
        this.registrationForm.get(['consultantDetailModel','validFrom'])?.clearValidators();
        this.registrationForm.get(['consultantDetailModel','validFrom'])?.updateValueAndValidity();
        this.registrationForm.get(['consultantDetailModel','validFrom'])?.setValue('');

        this.registrationForm.get(['supportiveDoc','licensedCertificatename'])?.clearValidators();
        this.registrationForm.get(['supportiveDoc','licensedCertificatename'])?.updateValueAndValidity();
        this.registrationForm.get(['supportiveDoc','licensedCertificatename'])?.setValue('');

        this.registrationForm.get(['supportiveDoc','educationalCertificatename'])?.addValidators([Validators.required]);
        this.registrationForm.get(['supportiveDoc','educationalCertificatename'])?.updateValueAndValidity();


        this.registrationForm.get(['consultantDetailModel','certificateNo'])?.addValidators([Validators.required]);
        this.registrationForm.get(['consultantDetailModel','certificateNo'])?.updateValueAndValidity();
      }
    })

  
  }

  isPassword:any="";
  isTrue:boolean= false;

  validatePass(event: KeyboardEvent) {
    const password = this.registrationForm.value.address.authPwd;
    const confirmPassword = (event.target as HTMLInputElement).value;

    if (password === confirmPassword) {
        this.isPassword = "Password is matched";
        this.isTrue = true;
    } else {
        this.isPassword = "Password does not match";
        this.isTrue = false;
    }
}



  // Function to get zones from the API
  getZones(): void {
    this.service.getButtonDetails(this.apiConstant.zoneDetails, "").subscribe(
      (response: any) => {
        // Log the response to ensure we're getting the correct data
        console.log('API Response:', response);

        // Check the response structure and extract zones
        if (response.httpStatus === 'OK' && Array.isArray(response.data)) {
          this.zones = response.data;
          console.log('Zones data:', this.zones); // Log zones to check
        } else {
          console.error('Invalid data structure or response');
        }
      },
      (error) => {
        console.error('Error fetching zones:', error);
      }
    );
  }

 // Function to handle selecting or deselecting all zones
selectAllZones() {
  if (this.isAllSelectedZones()) {
    // If all zones are already selected, unselect all
    this.selectedZones = [];
  } else {
    // Otherwise, select all zones
    this.selectedZones = this.zones.map(zone => zone.zoneName);
  }

  // Update the form control with the selected zones
  this.form.get('zoneDetails')?.setValue(this.selectedZones);
}

// Getter to access selected zones from the form
get selectedZonesFromForm() {
  return this.form.get('zoneDetails')?.value; // This will return an array of selected zone names
}

// Function to check if all zones are selected (for toggling Select/Deselect All)
isAllSelectedZones(): boolean {
  return this.selectedZones.length === this.zones.length;
}


  // Array of building types
  buildingType = [
    { "buildingTypeId": 1, "buildingTypeName": "Residential" },
    { "buildingTypeId": 2, "buildingTypeName": "Commercial" },
    { "buildingTypeId": 3, "buildingTypeName": "Industrial" },
    { "buildingTypeId": 40, "buildingTypeName": "Other" }
  ];

  // Model for selected building types
  selectedBuildingTypes: string[] = [];

  // Function to select all building types
  selectAll() {
    this.selectedBuildingTypes = this.buildingType.map(bt => bt.buildingTypeName);
  }

  // Function to deselect all building types
  deselectAll() {
    this.selectedBuildingTypes = [];
  }

  // Check if all options are selected
  isAllSelected(): boolean {
    return this.selectedBuildingTypes.length === this.buildingType.length;
  }



  fileTypeForm() {
    return this.fb.group({
      docType: [''],
      // docFileName: ['', Validators.required],
      docName: [''],
      docUniqueId: [''],
      // docByteStream: [''],
    });
  }

  PhotoName:any = 'File name will come here';
  licensedName:any = 'File name will come here';
  educationalName:any = 'File name will come here';
  photoPreview: string | null = null;
  isPreviewModalOpen: boolean = false;
  // For managing preview and file names
  educationalPreview: SafeResourceUrl | null = null;  // Using SafeResourceUrl for PDF
isEducationalPreviewModalOpen: boolean = false;
educationalFileType: string | null = null;



 // Method to handle file upload
 uploadDoc(event: any, arrayName: string, extensions = ['jpeg', 'jpg', 'pdf']) {
  const fileData = event.target.files[0];
  let allowedExtensions: string[] = [];
  let maxSize: number;

  // Define file types and max size based on arrayName
  if (arrayName === 'licensedCertificatename' || arrayName === 'educationalCertificatename') {
    allowedExtensions = ['pdf', 'jpeg'];
    maxSize = 10485760;  // 10 MB
  } else {
    allowedExtensions = ['jpeg', 'jpg'];
    maxSize = 2097152;  // 2 MB
  }

  // Get file extension
  const fileExtension = fileData.name.split('.').pop()?.toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    alert(`Please upload a file with ${allowedExtensions.join(' or ')} extension.`);
    event.target.value = '';
    return;
  }

  // Check file size
  if (fileData.size > maxSize) {
    alert(`Please upload a file under ${(maxSize / (1024 * 1024)).toFixed(2)} MB.`);
    event.target.value = '';
    return;
  }

  // Assign file name based on arrayName
  if (arrayName === 'educationalCertificatename') {
    this.educationalName = fileData.name.split('.')[0] + '.' + fileData.name.split('.')[1];
  } else if (arrayName === 'licensedCertificatename') {
    this.licensedName = fileData.name.split('.')[0] + '.' + fileData.name.split('.')[1];
  } else {
    this.PhotoName = fileData.name.split('.')[0] + '.' + fileData.name.split('.')[1];
  }

  // Reset form control
  // this.registrationForm.get(['supportiveDoc', arrayName])?.reset();

  // Check file type and size validity
  if (!this.checkFileType(event, extensions)) {
    event.target.value = '';
    this.registrationForm.get(['supportiveDoc', arrayName])?.reset();
    return;
  }

   // Assign file name based on arrayName
   if (arrayName === 'educationalCertificatename') {
    this.educationalName = fileData.name;
  } else if (arrayName === 'licensedCertificatename') {
    this.licensedName = fileData.name;
  } else {
    this.PhotoName = fileData.name;
  }
    

   // Create FileReader to generate preview
   const reader = new FileReader();
   reader.readAsDataURL(fileData);  // Read file as base64
   reader.onload = (e: any) => {
     const inputValue = e.target.result;  // Base64 result

     // Preview handling based on file type
     if (arrayName === 'photoName') {
      this.photoPreview = inputValue;  // Update the preview only for photoName
    }
    if (arrayName === 'educationalCertificatename') {
      // Set the educational file type
      this.educationalFileType = fileExtension;

      // For PDFs, check if the file is PDF and create a Blob URL
      if (fileExtension === 'pdf') {
        // Use DomSanitizer to safely handle the Blob URL for PDF
        this.educationalPreview = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(fileData));  // Sanitize the URL
      } else {
        this.educationalPreview = inputValue;  // Base64 for images
      }
    }
    // Prepare data for the server
    const json = {
      "docFileName": fileData.name.split(".")[0],
      "docType": fileData.name.split(".")[1],
      "docByteStream": inputValue.split(",")[1], // Base64 content
      "docName": fileData.name.split(".")[0]
    };

    // Upload the file via service (API call)
    this.service.postService(this.apiConstant.downloadUUID, json).subscribe((res: any) => {
      console.log("data =================> ", res);
      if (!res.docUUID) return;

      const formArray = this.registrationForm.get(['supportiveDoc', arrayName]) as FormArray;
      if (formArray) {
        formArray.at(0).patchValue({
          "docType": fileData.name.split(".")[0] + "." + fileData.name.split(".")[1],
          "docName": arrayName,
          "docUniqueId": res.docUUID,
          "docByteStream": inputValue.split(",")[1],
        });
      }
      console.log("uuid: " + res.docUUID);
    });
  };
}

// Method to check if the file type is valid
checkFileType(event: any, extensions = ['jpg', 'jpeg', 'pdf']) {
  const fileData = event.target.files[0];
  if (!fileData) return false;

  const ext = fileData.name.split('.').slice(-1)[0].toLowerCase();
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

 // Open the modal to show image preview
 togglePreview() {
  this.isPreviewModalOpen = !this.isPreviewModalOpen;
}
  // Toggle modal visibility for educational preview
  toggleEducationalPreview() {
    this.isEducationalPreviewModalOpen = !this.isEducationalPreviewModalOpen;
  }

// Close the educational certificate preview modal
closeEducationalPreviewModal() {
  this.isEducationalPreviewModalOpen = false;
}


   // Close the image preview modal
   closePreviewModal() {
    this.isPreviewModalOpen = false;
  }

  // Delete the educational certificate and reset the preview
deleteEducationalCertificate() {
  this.educationalPreview = null;
  this.educationalName = 'File name will come here';
  // Reset form control and close modal
  this.isEducationalPreviewModalOpen = false;
}

  // Delete the uploaded photo and reset the form
  deletePhoto() {
    // Remove the photo preview and reset the file name
    this.photoPreview = null;
    this.PhotoName = '';
    this.registrationForm.get('supportiveDoc.photoName')?.reset('');
    this.PhotoName = 'File name will come here';
    // this.registrationForm.get(['supportiveDoc.photoName'])?.clearValidators();
    // this.registrationForm.get(['supportiveDoc.photoName'])?.updateValueAndValidity();
    // this.registrationForm.get(['supportiveDoc.photoName'])?.setValue('');
    
    // Close the modal immediately after deletion
    this.isPreviewModalOpen = false;

  }

///////////deleted file


  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
  waiting:boolean = false;
  datasave:boolean = false;
  dataNotSave:boolean = false;
  hideSubmit:boolean = false;
  userName:any;
  dialog:boolean=false;


  submitReg() {
    this.registrationForm.markAllAsTouched();
    this.validateCaptcha();

    if (this.registrationForm.invalid || !this.isCaptchaValid) {
      alert("Please fill all the details properly and verify the captcha.");
      return;
    }

    this.waiting = true;

    console.log(this.registrationForm.value,"registration Value");
    
    this.authService.getSaveDetails(this.registrationForm.value).subscribe((res: any) => {
      console.log(res);

      if (res.data != null) {
        this.userName = res.data.Details.consultantName;
        this.senddata.requestid = res.data.Details.consultantName;
        this.senddata.datasave = true;

        this.senddata.regForm = true;
        this.router.navigate(['/home']);

      } else {
        this.dataNotSave = true;
      }

      this.waiting = false;
      this.hideSubmit = true;
    }, error => {
      console.error('Error during submission:', error);
      this.waiting = false;
      this.dataNotSave = true;
    });
  }

 
  // isUserNameAvaliable:any = '';
  isAvaliable:boolean = false;

  // CheckUserName(event : any){

  //   var text = event.target.value;
  //   if(text.length >= 3){
  //     const json = {
  //       "userName": text
  //     };
      
  //   this.authService.getIsUserDetails(json).subscribe((res: any) => {
  //     console.log(res);
  //     if(res.message == 'User name is Avaliable..'){
  //       this.isAvaliable = false
  //       this.isUserNameAvaliable = 'User name is Avaliable..';
  //     }else if(res.message == 'User name is Not Avaliable..'){
  //       this.isAvaliable = true;
  //       this.isUserNameAvaliable = 'User name is Not Avaliable..';
  //     }

  //   });
  //   }
    
  // }


  onProfChange(event: string): void {
    if (event === "Architect") {
      this.proff = true;
      console.log("click architi" + event);
    }
    else {
      this.proff = false;
      console.log("click othher" + event);

    }
  }



  // +++++++++++++++++++++++++++++++++++++++++++++

  captchaString: string = '';
  userInput: string = '';
  isCaptchaValid: boolean = false;
  hidePassword: boolean = true;
  
  
  passwordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }


  
  generateCaptcha(): void {
    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const captchaLength = 6; // You can adjust the length of the captcha string

    let captcha = '';
    for (let i = 0; i < captchaLength; i++) {
      const randomIndex = Math.floor(Math.random() * possibleCharacters.length);
      captcha += possibleCharacters.charAt(randomIndex);
    }

    this.captchaString = captcha;
  }

  validateCaptcha(): void {
    if (this.registrationForm.value.captcha === this.captchaString) {
      this.isCaptchaValid = true;
      
    } else {
      this.isCaptchaValid = false;
      alert('CAPTCHA is invalid. Please try again.');
    }

    this.generateCaptcha();
    this.userInput = '';
  }


}
//CUSTOM DOB VALIDATOR
function minAgeValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const dob = control.value;
    if (!dob) return null; // return null if no value is provided

    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < minAge) {
      return { minAge: true };
    }

    return null;
  }};