import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { SendData } from 'src/app/SendData';
import { AuthService } from 'src/app/services/auth.service';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-owner-registration',
  templateUrl: './owner-registration.component.html',
  styleUrls: ['./owner-registration.component.scss']
})
export class OwnerRegistrationComponent implements OnInit {
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


  registrationForm!: FormGroup;
  salutationOptions = [
    { value: 'Mr', viewValue: 'Mr.' },
    { value: 'Mrs', viewValue: 'Mrs.' },
    { value: 'Ms', viewValue: 'Ms.' },
  ];
  hideSubmit: boolean = false;

  constructor(private fb: FormBuilder, private service: commonService,
    private router: Router,public senddata: SendData,private sanitizer: DomSanitizer) {
    this.registrationForm = this.fb.group({
      salutation: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      addharNo: ['', [Validators.required, Validators.pattern("[0-9]{12}")]],
      dob: ['', [Validators.required]],
      gender: ['', Validators.required],
      permanentAddress: this.fb.group({
        address: ['', Validators.required],
        block: ['', Validators.required],
        state: ['', Validators.required],
        district: ['', Validators.required],
      
        pincode: ['', [Validators.required, Validators.pattern("[0-9]{6}")]],
        landmark: [''],
      }),
      communicationAddress: this.fb.group({
        address: ['', Validators.required],
        block: ['', Validators.required],
        state: ['', Validators.required],
        district: ['', Validators.required],
      
        pincode: ['', [Validators.required, Validators.pattern("[0-9]{6}")]],
        landmark: [''],
      }),
      isSameAddress: [false],
      photoName: this.fb.array([this.fileTypeForm()], [Validators.required]),
      educationalCertificatename:this.fb.array([this.fileTypeForm()]),
      password: ['', [Validators.required, this.passwordValidator]],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.registrationForm.get('isSameAddress')?.valueChanges.subscribe((value) => {
      if (value) {
        const permanentAddress = this.registrationForm.get('permanentAddress')?.value;
        this.registrationForm.get('communicationAddress')?.patchValue(permanentAddress);
      } else {
        // Optionally reset the communication address fields if unchecked
        this.registrationForm.get('communicationAddress')?.reset();
      }
    });
  }
  

  hidePassword: boolean = true;
  
  apiConstant = API_PATH;
  
  passwordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  isPassword:any="";
  isTrue:boolean= false;

  validatePass(event: KeyboardEvent) {
    const password = this.registrationForm.value.password;
    const confirmPassword = (event.target as HTMLInputElement).value;

    if (password === confirmPassword) {
        this.isPassword = "Password is matched";
        this.isTrue = true;
    } else {
        this.isPassword = "Password does not match";
        this.isTrue = false;
    }
}

  passwordValidator(control: AbstractControl) {
    const value = control.value;
    if (!value) return null;

    const valid = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
    return valid ? null : { invalidPassword: true };
  }

  onFileChange(event: any, field: string) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log(`${field} file:`, file);
        this.registrationForm.patchValue({ [field]: file });
      };
      reader.readAsDataURL(file);
    }
  }
  today: Date = new Date(); // Sets today's date
  
  onSubmit() {
    this.registrationForm.markAllAsTouched();
    const password = this.registrationForm.value.password;
    const confPassword = this.registrationForm.value.confirmPassword;
    if (this.registrationForm.invalid) {
      alert("Please fill all the details properly.");
      console.log(this.registrationForm.value);
      
      return;
    }else if(password != confPassword){
      alert("Your password does't matched.");
      return;
    }
      this.service.postService(this.apiConstant.SaveOwnerDetails, this.registrationForm.value).subscribe((res: any) => {
        console.log(res);

        if (res.httpStatus === "OK") {
          this.senddata.dialog = true;
          this.senddata.datasave = true;
          this.hideSubmit = true;
  
          this.senddata.ownerSave = true;
          this.router.navigate(['/home']);
        } else {
          this.senddata.dialog = true;
          this.senddata.datasave = true;
          this.senddata.hideSubmit = true;
        }
  
      });
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
  educationalName:any = 'File name will come here';
  photoPreview: string | null = null;
  isPreviewModalOpen: boolean = false;
  educationalPreview: SafeResourceUrl | null = null;  // Using SafeResourceUrl for PDF
  isEducationalPreviewModalOpen: boolean = false;
  educationalFileType: string | null = null;

  uploadDoc(
    event: any,
    arrayName:string,
    extensions = ['jpeg', 'jpg', 'pdf']
  ) {
    const fileData = event.target.files[0];
    let allowedExtensions: string[];
    let maxSize: number;

    if (arrayName === 'educationalCertificatename') {
      allowedExtensions = ['pdf', 'jpeg'];
      maxSize = 10485760; 
    } else {
      allowedExtensions = ['jpeg', 'jpg'];
      maxSize = 2097152; 
    }
 
    const fileExtension = fileData.name.split('.').pop()?.toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      if (arrayName === 'educationalCertificatename') {
        alert('Please upload a file with PDF or JPEG extension.');
      } else {
        alert('Please upload a file with JPG or JPEG extension.');
      }
      event.target.value = '';
      return;
    }
  

    console.log("File size:", fileData.size);
    if (fileData.size > maxSize) {
      event.target.value = '';
      // alert('Please upload a file under 10 MB.');
      alert('Please upload a file under ' + (maxSize / (1024 * 1024)) + ' MB.');
      return;
    }



  // Assign file name based on arrayName
  if (arrayName === 'educationalCertificatename') {
    this.educationalName = fileData.name.split('.')[0] + '.' + fileData.name.split('.')[1];
  } else {
    this.PhotoName = fileData.name.split('.')[0] + '.' + fileData.name.split('.')[1];
  }

  
    if (fileData.size > 15728640) {
      event.target.value = '';
      alert('Please Upload under 2 MB File');
      return;
    }
    this.registrationForm.get([arrayName])?.reset();
  
    if (!this.checkFileType(event, extensions)) {
      event.target.value = '';
      this.registrationForm.get([arrayName])?.reset();
      return;
    }

     // Assign file name based on arrayName
   if (arrayName === 'educationalCertificatename') {
    this.educationalName = fileData.name;
  } else {
    this.PhotoName = fileData.name;
  }
  
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
  
    reader.onload = (event: any) => {
      const inputValue = event.target.result;
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
  
      const json = {
        "docFileName": fileData.name.split(".")[0],
        "docType": fileData.name.split(".")[1],
        "docByteStream": inputValue.split(",")[1],
        "docName": fileData.name.split(".")[0]
      };
  
      this.service.postService(this.apiConstant.downloadUUID, json).subscribe((res: any) => {
        console.log("data =================> ", res);
        if (!res.docUUID) {
          return;
        }
  
        const formArray = this.registrationForm.get([arrayName]) as FormArray;
        console.log("formArray"+formArray);
        if (formArray) {
        formArray.at(0).patchValue({
          // docType: ['', Validators.required],
          // docFileName: ['', Validators.required],
          // docName: ['', Validators.required],
          // docUniqueId: ['', Validators.required],
          // docByteStream: [''],
          // "docFileName": fileData.name.split(".")[0],
          "docType": fileData.name.split(".")[0] + "." + fileData.name.split(".")[1],
          "docName": arrayName,
          "docUniqueId": res.docUUID,
          "docByteStream": inputValue.split(",")[1],
        });
      }
  
        console.log("uuid: " + res.docUUID);
        // console.log(this.registrationForm.value.supportiveDoc?.photoName);
      });
    };
  }
  
  
  checkFileType(event: any, extensions = ['jpg', 'jpeg', 'pdf']) {
    var fileData = event.target.files[0];
    if (!fileData) return false;
    var ext = fileData.name.split('.').slice(-1)[0];
  console.log(ext);

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

  
}