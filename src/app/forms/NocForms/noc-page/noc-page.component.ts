import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SendData } from 'src/app/SendData';

@Component({
  selector: 'app-noc-page',
  templateUrl: './noc-page.component.html',
  styleUrls: ['./noc-page.component.scss']
})
export class NocPageComponent {
  
  NocPageForm!: FormGroup;
  
    constructor(
      private router: Router,
      private fb: FormBuilder,
      public senddata: SendData) { }
  
  
  fireForm:boolean = false;
      ngOnInit(): void {
        this.fireForm = this.senddata.fireNoc;
        this.createForm();
  
      }
  
  
      createForm() {
        this.NocPageForm = this.fb.group({
    
          NocPageDetails: this.fb.group({
            fireType: ['2', [Validators.required]],
          
    
          }),
        })
      }
  
  
    NocFire(){
      this.router.navigate(['/fire']);
    }
  
    submit(){
      if(this.senddata.callFrom =="OC"){
        this.router.navigate(['/OccupancyComponentView']);
      }else{
      this.router.navigate(['/viewNocPage']);
    }
    }

    back(){
      this.router.navigate(['/secondView']);
    }
    
}
