import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'src/app/angular-material.module';


import { ReactiveFormsModule } from '@angular/forms';

import { PaymentFormComponent } from './payment-form/payment-form.component';
import {MatRadioModule} from '@angular/material/radio';
import { PaymentReceiptComponent } from './payment-receipt/payment-receipt.component';
import { FormModule } from '../forms/forms.module';
import { LettersModule } from "../letters/letters.module";
import { DsletterComponent } from '../letters/dsletter/dsletter.component';


@NgModule({
    declarations: [
        PaymentFormComponent,
        PaymentReceiptComponent
    ],
    exports: [
        PaymentFormComponent,
        PaymentReceiptComponent,
        DsletterComponent
    ],
    providers: [],
    imports: [
        CommonModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        MatRadioModule,
        LettersModule
    ]
})
export class PaymentModule { }
