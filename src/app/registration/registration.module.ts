import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'src/app/angular-material.module';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { FormModule } from '../forms/forms.module';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationViewComponent } from './registration-view/registration-view.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { OwnerRegistrationComponent } from './owner-registration/owner-registration.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OwnerDashboardComponent } from './owner-dashboard/owner-dashboard.component';
import { MatListModule } from '@angular/material/list';
import { OwnerApplicantDetialsComponent } from '../forms/owner-applicant-detials/owner-applicant-detials.component';
import { StaticComponentsModule } from '../static-components/static-common.module';


@NgModule({
    declarations: [
        RegistrationComponent,
        RegistrationViewComponent,
        OwnerRegistrationComponent,
        OwnerDashboardComponent
    ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatProgressBarModule,
        RouterLink,
        FormsModule,
        MatCheckboxModule,
        FormModule,
        MatExpansionModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatListModule,
        StaticComponentsModule
    ],
    exports: [
        RegistrationComponent,
        RegistrationViewComponent,
        OwnerDashboardComponent
    ],
    providers: []
})
export class RegistrationModule { }
