import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';

import { DatePipe } from '@angular/common';
import { DsletterComponent } from './dsletter/dsletter.component';


@NgModule({
    declarations: [
        DsletterComponent
    ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatRadioModule
        
    ],
    exports: [
       DsletterComponent
        
    ],
    providers: [DatePipe] 
})
export class LettersModule { }
