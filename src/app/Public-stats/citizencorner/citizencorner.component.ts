import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SendData } from 'src/app/SendData';
import { AuthService } from 'src/app/services/auth.service';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';

@Component({
  selector: 'app-citizencorner',
  templateUrl: './citizencorner.component.html',
  styleUrls: ['./citizencorner.component.scss']
})
export class CitizencornerComponent implements OnInit {
  complaintForm!: FormGroup; // Define the FormGroup
  apiConstant = API_PATH; // Initialize the API path
  route: any;

  constructor(
    private service: commonService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public senddata: SendData
  ) {}

  ngOnInit(): void {
    this.createForm(); 
  }

  createForm() {
    this.complaintForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phNumber: ['', [ // Updated form control name to phNumber
        Validators.required,
        Validators.pattern('^(?:[789]\\d{9})$') // Validates Indian mobile numbers
      ]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    this.complaintForm.markAllAsTouched();
    if (this.complaintForm.invalid) {
      alert('Please fill all the details properly');
      console.log(this.complaintForm.value, "complaint value not correct");
      return;
    }
  
    // Prepare data to match the API structure
    const dataToSend = {
      name: this.complaintForm.value.name,
      email: this.complaintForm.value.email,
      phNumber: this.complaintForm.value.phNumber,
      message: this.complaintForm.value.message
    };
  
    console.log(dataToSend, "complaint value"); // Log valid form values
  
    this.service.postService(this.apiConstant.ComplainRaise, dataToSend).subscribe({
      next: (res: any) => {
        console.log('Response:', res);
        // Log the message from the API response
        console.log('API Message:', res.message);
  
        alert('✅ Thank you for contacting us! Our team will connect with you shortly.'); // Show success message
        if (res.httpStatus === 'OK') {
          this.complaintForm.reset(); // Clear the form fields
        }
  
        // Refresh the page after a short delay
        setTimeout(() => {
          window.location.reload(); // Refresh the page
        }, 1000); // Delay in milliseconds (1000 = 1 second)
      },
     
    });
  }

  viewPdf(filePath: string) {
    window.open(filePath, '_blank');
  }
  back(){
    this.router.navigate(['/login']);
  }
}
