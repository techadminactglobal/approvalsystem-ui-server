import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SendData } from 'src/app/SendData';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { AuthService } from 'src/app/services/auth.service';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-second-form',
  templateUrl: './new-second-form.component.html',
  styleUrls: ['./new-second-form.component.scss'],
})
export class NewSecondFormComponent implements OnInit {
  @ViewChild('myModal') modal!: ElementRef;
  SecondForm!: FormGroup;
  stilt: any;
  apiConstant = API_PATH;
  civil: any[] = [];
  Superintendent: any[] = [];
  Licensed: any[] = [];
  StiltDetail: any;

  constructor(
    private service: commonService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public senddata: SendData
  ) {}

  ngOnInit(): void {
    this.createForm();
    for (let i = 0; i < 5; i++) {
      this.addGeoCoordinate();
    }

    this.service
      .getButtonDetails(
        this.apiConstant.newSecondForm_DropDown,
        'Civil Engineering'
      )
      .subscribe((data: any) => {
        this.civil = data.data;
        console.log(this.civil, 'Civil Engineering');
      });

    this.service
      .getButtonDetails(
        this.apiConstant.newSecondForm_DropDown,
        'Structural Engineering'
      )
      .subscribe((data: any) => {
        this.Superintendent = data.data;
        console.log(this.Superintendent, 'Structural Engineering');
      });

    this.service
      .getButtonDetails(
        this.apiConstant.newSecondForm_DropDown,
        'licensed Engineering'
      )
      .subscribe((data: any) => {
        this.Licensed = data.data;
        console.log(this.Licensed, 'licensed Engineering');
      });
  }

  createFloor() {
    return this.fb.group({
      buitUpArea: ['', [Validators.required]],
      freeFromFar: ['', [Validators.required]],
      LatitudeArea: ['', [Validators.required]],
      LongitudeArea: ['', [Validators.required]],
      netFar: [{ value: '', disabled: true }],
    });
  }

  createForm() {
    this.SecondForm = this.fb.group({
      building: this.fb.array([this.createBuilding()], [Validators.required]),
      parkingFloor: this.fb.array(
        [this.createParking()],
        [Validators.required]
      ),
      groundFloor: this.fb.array([this.createGround()], [Validators.required]),
      StiltDetail: this.fb.group({
        buitUpArea: ['' /* [Validators.required] */],
        freeFromFar: ['' /* [Validators.required] */],
        netFar: ['', { value: '', disabled: true }],
        floor: ['Stilt'],
      }),
      geoCoordinateDetails: this.fb.array(
        [this.createCordinate()],
      ),
      engineerDetails: ['', [Validators.required]],
      superintendentDetails: ['', [Validators.required]],
      civilDetails: ['', [Validators.required]],
      constructionEndDate: ['', [Validators.required]],
      constructionStartDate: ['', [Validators.required]],
      builderDetail: this.fb.group({
        builderName: ['', [Validators.required]],
        builderPhone: [
          '',
          [Validators.required, Validators.pattern('[0-9]{10}')],
        ],
        builderEmail: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
          ],
        ],
      }),
    });
  }

  createBuilding() {
    return this.fb.group({
      buitUpArea: ['', [Validators.required]],
      freeFromFar: ['', [Validators.required]],
      netFar: ['', { value: '', disabled: true }],
      floor: ['Basement-' + this.basement],
    });
  }
  // createCordinate() {
  //   return this.fb.group({
  //     latitude: ['', [Validators.required,  Validators.pattern("/^[-+]?([0-8]?[0-9](\.\d{6})?|90(\.0{6})?)$/")]],
  //     longitude: ['', [Validators.required, Validators.pattern("/^[-+]?(180(\.0+)?|((1[0-7][0-9]|[1-9]?[0-9])(\.\d+)?))$/")]],

  //   });
  // }
  private uniqueValues: Set<string> = new Set();

  createCordinate() {
    return this.fb.group({
      latitude: [
        '',
        [this.uniqueValueValidator('latitude')],
      ],
      longitude: [
        '',
        [this.uniqueValueValidator('longitude')],
      ],
    });
  }

  uniqueValueValidator(controlName: string) {
    return (control: FormControl) => {
      if (!control.value) {
        return null;
      }

      if (this.uniqueValues.has(control.value)) {
        return { duplicateValue: true };

      }

      this.uniqueValues.add(control.value);

      const regex = /^(?:[0-9]{1,2})(\.\d{6})?$/; // allows 1 to 6 decimal places
      if (!regex.test(control.value)) {
        return { invalidLatitudeLongitude: true };
      }

      return null;
    };
  }
  createParking() {
    return this.fb.group({
      buitUpArea: ['', [Validators.required]],
      freeFromFar: ['', [Validators.required]],
      netFar: ['', { value: '', disabled: true }],
      floor: ['Parking-' + this.parking],
    });
  }

  createGround(): FormGroup {
    const floorName = this.ground === 0 ? 'Ground' : 'Floor-' + this.ground; 
    return this.fb.group({
      buitUpArea: ['', [Validators.required]],
      freeFromFar: ['', [Validators.required]],
      netFar: ['', { value: '', disabled: true }],
      floor: [floorName] // Dynamically set the floor name
    });
  }

  createStilt() {
    return this.fb.group({
      buitUpArea: ['', [Validators.required]],
      freeFromFar: ['', [Validators.required]],
      netFar: ['', { value: '', disabled: true }],
      floor: [''],
    });
  }

  get basementFloor(): FormArray {
    return this.SecondForm.get('building') as FormArray;
  }

  get parkingDisplay(): FormArray {
    return this.SecondForm.get('parkingFloor') as FormArray;
  }

  get stiltDisplay(): FormArray {
    return this.SecondForm.get('StiltDetail') as FormArray;
  }

  get groundDetail() {
    return this.SecondForm.get('groundFloor') as FormArray;
  }

  get geoCoordinateDetails() {
    return this.SecondForm.get('geoCoordinateDetails') as FormArray;
  }

  addFloor() {
    if (this.basementFloor.length < 4) {
      this.basement = this.basement + 1;
      this.basementFloor.push(this.createBuilding());
      this.subscribeToChanges(this.basementFloor.length - 1);
    }
  }

  addGeoCoordinate() {
    if (this.geoCoordinateDetails.length < 8) {
      this.geoCoordinateDetails.push(this.createCordinate());
    }
  }

  addParking() {
    if (this.parkingDisplay.length < 3) {
      this.parking = this.parking + 1;
      this.parkingDisplay.push(this.createParking());
      this.subscribeToChangesParking(this.parkingDisplay.length - 1);
    }
  }

  addGround() {
    if (this.groundDetail.length < 9) {
      this.ground = this.ground + 1;
      this.groundDetail.push(this.createGround());
      this.subscribeToChangesGround(this.groundDetail.length - 1);
    }
  }

  removeParking(index: number) {
    this.parkingDisplay.removeAt(index);
  }

  removeGround(index: number) {
    this.groundDetail.removeAt(index);
  }

  removeFloor(index: number) {
    this.basementFloor.removeAt(index);
  }

  removeLati(index: number) {
    this.geoCoordinateDetails.removeAt(index);
  }

  // calculateNetFar(index: number) {
  //   const floor = this.basementFloor.controls[index];
  //   const buitUpArea = parseFloat(floor.get('buitUpArea')!.value) || 0;
  //   const freeFromFar = parseFloat(floor.get('freeFromFar')!.value) || 0;
  //   const netFar = buitUpArea - freeFromFar;
  //   floor.get('netFar')!.setValue(netFar);

  //   const isValid = netFar >= 0;
  //   floor.get('netFar')!.setValidators(isValid ? null : Validators.required);
  // }

  calculateNetFar(index: number) {
    const floor = this.basementFloor.at(index) as FormGroup;
    const buitUpArea = parseFloat(floor.get('buitUpArea')?.value) || 0;
    const freeFromFar = parseFloat(floor.get('freeFromFar')?.value) || 0;
    const netFar = buitUpArea - freeFromFar;

    floor.get('netFar')?.setValue(netFar, { emitEvent: false });

    if (netFar < 0) {
      floor.get('netFar')?.setErrors({ negative: true });
    } else {
      floor.get('netFar')?.setErrors(null);
    }

    floor.get('netFar')?.markAsTouched();
  }

  // calculateNetFARE(index: number) {
  //   const floor = this.parkingDisplay.controls[index];
  //   const buitUpArea = parseFloat(floor.get('buitUpArea')!.value) || 0;
  //   const freeFromFar = parseFloat(floor.get('freeFromFar')!.value) || 0;
  //   const netFar = buitUpArea - freeFromFar;
  //   floor.get('netFar')!.setValue(netFar);

  // }

  calculateNetFARE(index: number): void {
    const floor = this.parkingDisplay.at(index) as FormGroup;
    const buitUpArea = parseFloat(floor.get('buitUpArea')?.value) || 0;
    const freeFromFar = parseFloat(floor.get('freeFromFar')?.value) || 0;
    const netFar = buitUpArea - freeFromFar;

    floor.get('netFar')?.setValue(netFar, { emitEvent: false });

    if (netFar < 0) {
      floor.get('netFar')?.setErrors({ negative: true });
    } else {
      floor.get('netFar')?.setErrors(null);
    }

    floor.get('netFar')?.markAsTouched();
  }

  // calculateNetStilt() {
  //   const stiltDetail = this.SecondForm.get('StiltDetail');
  //   if (stiltDetail) {
  //     const buitUpArea = parseFloat(stiltDetail.get('buitUpArea')?.value) || 0;
  //     const freeFromFar = parseFloat(stiltDetail.get('freeFromFar')?.value) || 0;

  //     const netFar = buitUpArea - freeFromFar;
  //     stiltDetail.get('netFar')?.setValue(netFar);

  //   }
  // }

  calculateNetStilt(): void {
    const stiltDetail = this.SecondForm.get('StiltDetail') as FormGroup;
    if (stiltDetail) {
      const buitUpArea = parseFloat(stiltDetail.get('buitUpArea')?.value) || 0;
      const freeFromFar =
        parseFloat(stiltDetail.get('freeFromFar')?.value) || 0;
      const netFar = buitUpArea - freeFromFar;

      stiltDetail.get('netFar')?.setValue(netFar, { emitEvent: false });

      if (netFar < 0) {
        stiltDetail.get('netFar')?.setErrors({ negative: true });
      } else {
        stiltDetail.get('netFar')?.setErrors(null);
      }

      stiltDetail.get('netFar')?.markAsTouched();
    }
  }

  // calculateNetGROUND(index: number) {
  //   const floor = this.groundDetail.controls[index];
  //   const buitUpArea = parseFloat(floor.get('buitUpArea')!.value) || 0;
  //   const freeFromFar = parseFloat(floor.get('freeFromFar')!.value) || 0;
  //   const netFar = buitUpArea - freeFromFar;
  //   floor.get('netFar')!.setValue(netFar);

  // }
  calculateNetGROUND(index: number): void {
    const floor = this.groundDetail.controls[index] as FormGroup;
    const buitUpArea = parseFloat(floor.get('buitUpArea')?.value) || 0;
    const freeFromFar = parseFloat(floor.get('freeFromFar')?.value) || 0;
    const netFar = buitUpArea - freeFromFar;

    floor.get('netFar')?.setValue(netFar, { emitEvent: false });

    if (netFar < 0) {
      floor.get('netFar')?.setErrors({ negative: true });
    } else {
      floor.get('netFar')?.setErrors(null);
    }

    floor.get('netFar')?.markAsTouched();
  }

  parking = 0;
  ground = 0;
  basement = 0;

  subscribeToChanges(index: number) {
    const floor = this.basementFloor.controls[index];
    floor.get('buitUpArea')!.valueChanges.subscribe(() => {
      this.calculateNetFar(index);
    });
    floor.get('freeFromFar')!.valueChanges.subscribe(() => {
      this.calculateNetFar(index);
    });
  }

  // calculateNetFARE(index: number) {
  //   const floor = this.parkingDisplay.controls[index];
  //   const buitUpArea = parseFloat(floor.get('buitUpArea')!.value) || 0;
  //   const freeFromFar = parseFloat(floor.get('freeFromFar')!.value) || 0;
  //   const netFar = buitUpArea - freeFromFar;
  //   floor.get('netFar')!.setValue(netFar);

  // }

  subscribeToChangesParking(index: number) {
    const floor = this.parkingDisplay.controls[index];
    floor.get('buitUpArea')!.valueChanges.subscribe(() => {
      this.calculateNetFARE(index);
    });
    floor.get('freeFromFar')!.valueChanges.subscribe(() => {
      this.calculateNetFARE(index);
    });
  }

  // calculateNetStilt() {
  //   const stiltDetail = this.SecondForm.get('StiltDetail');

  //   if (stiltDetail) {
  //     const buitUpArea = stiltDetail.get('buitUpArea')?.value;
  //     const freeFromFar = stiltDetail.get('freeFromFar')?.value;

  //     if (buitUpArea !== null && freeFromFar !== null) {
  //       const netFar = buitUpArea - freeFromFar;
  //       stiltDetail.get('netFar')?.setValue(netFar);
  //     }
  //   }
  // }

  // calculateNetGROUND(index: number) {
  //   const floor = this.groundDetail.controls[index];
  //   const buitUpArea = parseFloat(floor.get('buitUpArea')!.value) || 0;
  //   const freeFromFar = parseFloat(floor.get('freeFromFar')!.value) || 0;
  //   const netFar = buitUpArea - freeFromFar;
  //   floor.get('netFar')!.setValue(netFar);
  // }

  subscribeToChangesGround(index: number) {
    const floor = this.groundDetail.controls[index];
    floor.get('buitUpArea')!.valueChanges.subscribe(() => {
      this.calculateNetGROUND(index);
    });
    floor.get('freeFromFar')!.valueChanges.subscribe(() => {
      this.calculateNetGROUND(index);
    });
  }

  dialog: boolean = false;
  datasave: boolean = false;
  hideSubmit: boolean = false;

  submitReg() {
    if (this.SecondForm.invalid) {
      alert('Please fill all the details properly..');
      return;
    }

    const hasNegativeNetFar =
      this.basementFloor.controls.some(
        (control) => control.get('netFar')!.value < 0
      ) ||
      this.parkingDisplay.controls.some(
        (control) => control.get('netFar')!.value < 0
      ) ||
      this.groundDetail.controls.some(
        (control) => control.get('netFar')!.value < 0
      ) ||
      parseFloat(this.SecondForm.get('StiltDetail.netFar')!.value) < 0;

    if (hasNegativeNetFar) {
      alert('Net FAR cannot be negative. Please check your entries.');
      return;
    }

    this.setDataForSecondForm();
    console.log(this.saveForm.value, 'this.saveForm');

    this.service
      .getFileService(this.apiConstant.buldingDetails, this.saveForm.value)
      .subscribe((data: any) => {
        console.log(data, 'response from api...');
        if (data.httpStatus === 'OK') {
          this.senddata.dialog = true;
          this.senddata.datasave = true;
          this.hideSubmit = true;

          this.senddata.docDetails = false;
          this.senddata.formTwo = true;
          this.router.navigate(['/home']);
        } else {
          this.senddata.dialog = true;
          this.senddata.datasave = false;
          this.senddata.hideSubmit = true;
        }
      });
  }

  //// creating the json for api call.......
  formData: any[] = [];
  jsonObject = {};
  setDataForSecondForm() {
    const excludedControls = [
      'geoCoordinateDetails',
      'engineerDetails',
      'superintendentDetails',
      'civilDetails',
      'constructionStartDate',
      'constructionEndDate',
      'builderDetail',
      // Add more controls here if needed
    ];

    const extractControlValues = (control: AbstractControl): any => {
      if (control instanceof FormGroup) {
        const groupData: any = {};
        Object.keys(control.controls).forEach((key) => {
          if (!excludedControls.includes(key)) {
            groupData[key] = extractControlValues(control.get(key)!);
          }
        });
        return groupData;
      } else if (control instanceof FormArray) {
        const arrayData = control.controls.map((c) => extractControlValues(c));
        return arrayData.filter((data) => Object.keys(data).length > 0); // Remove empty objects
      } else {
        return control.value;
      }
    };

    // Clear existing formData
    this.formData = [];

    Object.keys(this.SecondForm.controls).forEach((controlName) => {
      const control = this.SecondForm.get(controlName)!;
      if (!excludedControls.includes(controlName)) {
        this.formData = this.formData.concat(extractControlValues(control));
      }
    });

    // console.log(this.formData);

    this.convertToJSON();
  }

  saveForm!: FormGroup;

  convertToJSON(): any {
    const formData = this.SecondForm.value;

    // Extracting data from form
    const fileNumber = this.senddata.requestid; // Assuming a static value for fileNumber
    const engineerDetails = formData.engineerDetails;
    const superintendentDetails = formData.superintendentDetails;
    const civilDetails = formData.civilDetails;
    const constructionStartDate = formData.constructionStartDate;
    const constructionEndDate = formData.constructionEndDate;
    const builderDetail = {
      builderName: formData.builderDetail.builderName,
      builderPhone: formData.builderDetail.builderPhone,
      builderEmail: formData.builderDetail.builderEmail,
    };

    this.saveForm = this.fb.group({
      fileNumber: [this.senddata.requestid],
      engineerDetails: [engineerDetails],
      superintendentDetails: [superintendentDetails],
      civilDetails: [civilDetails],
      constructionStartDate: [this.formatDateToDDMMYY(constructionStartDate)],
      constructionEndDate: [this.formatDateToDDMMYY(constructionEndDate)],
      builderDetails: this.fb.group({
        builderName: [formData.builderDetail.builderName],
        builderPhone: [formData.builderDetail.builderPhone],
        builderEmail: [formData.builderDetail.builderEmail],
      }),
      buildingFloor: [this.formData],
      geoCoordinate: [this.SecondForm.value.geoCoordinateDetails],
    });

    return this.saveForm;
  }

  formatDateToDDMMYY(date: any): string {
    // const day = String(date.getDate()).padStart(2, '0');
    // const month = String(date.getMonth() + 1).padStart(2, '0');
    // const year = String(date.getFullYear()).slice(-2);
    // return `${day}-${month}-${year}`;
    const timestamp = date.getTime(); // Get the Unix timestamp (milliseconds since Jan 1, 1970)
    return timestamp;
  }

  back() {
    this.router.navigate(['/supportView']);
  }
}
