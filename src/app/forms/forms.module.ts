import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from 'src/app/angular-material.module';


import { ReactiveFormsModule } from '@angular/forms';
import { NewFirstFormComponent } from './new-first-form/new-first-form.component';
import { SupportFileDocumentComponent } from './support-file-document/support-file-document/support-file-document.component';
import { NewFormViewComponent } from './new-form-view/new-form-view.component';
import { SupportFileViewComponent } from './support-file-view/support-file-view.component';
import { PhotographnameModalComponent } from './photographname-modal/photographname-modal.component';
import { NewSecondFormComponent } from './new-second-form/new-second-form.component';
import { NewSecondformViewComponent } from './new-secondform-view/new-secondform-view.component';
import {MatRadioModule} from '@angular/material/radio';
import { DatePipe } from '@angular/common';
import { FireComponent } from './NocForms/fire/fire.component';
import { NocPageComponent } from './NocForms/noc-page/noc-page.component';
import { ViewFireComponent } from './NocViewForms/view-fire/view-fire.component';
import { ViewNocPageComponent } from './NocViewForms/view-noc-page/view-noc-page.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { OwnerApplicantDetialsComponent } from './owner-applicant-detials/owner-applicant-detials.component';


@NgModule({
    declarations: [
        NewFirstFormComponent,
        SupportFileDocumentComponent,
        NewFormViewComponent,
        SupportFileViewComponent,
        PhotographnameModalComponent,
        NewSecondFormComponent,
        NewSecondformViewComponent,
        FireComponent,
        NocPageComponent,
        ViewFireComponent,
        ViewNocPageComponent,
        OwnerApplicantDetialsComponent
    ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        // FormsModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatExpansionModule,
    ],
    exports: [
        FireComponent,
        SupportFileDocumentComponent,
        NewFormViewComponent,
        SupportFileViewComponent,
        NewSecondFormComponent,
        NewSecondformViewComponent,
        ViewFireComponent,
        ViewNocPageComponent
    ],
    providers: [DatePipe] 
})
export class FormModule { }
