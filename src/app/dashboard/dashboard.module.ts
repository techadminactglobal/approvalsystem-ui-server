import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from 'src/app/angular-material.module';

import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeparmentalDashboardComponent } from './deparmental-dashboard/deparmental-dashboard.component';
import { DeparmentalRequestViewComponent } from './deparmental-request-view/deparmental-request-view.component';
import { StatDashboardComponent } from '../stat-dashboard/stat-dashboard.component';
import { NewSecondformViewComponent } from '../forms/new-secondform-view/new-secondform-view.component';
import { RegistrationViewComponent } from '../registration/registration-view/registration-view.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormModule } from '../forms/forms.module';
import { RegistrationModule } from '../registration/registration.module';
import { NocDashboardComponent } from './noc-dashboard/noc-dashboard.component';
import { ViewNocPageComponent } from '../forms/NocViewForms/view-noc-page/view-noc-page.component';
import { PlinthComponentViewComponent } from '../Plinth/plinth-component-view/plinth-component-view.component';
import { PlinthModule } from '../Plinth/Plinth.module';
import { OccupancyModule } from '../Occupancy Certificate/occupancy.module';
import { StaticComponentsModule } from '../static-components/static-common.module';

@NgModule({
  declarations: [
    DashboardComponent,
    DeparmentalDashboardComponent,
    DeparmentalRequestViewComponent,
    NocDashboardComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    NgbPaginationModule,
    MatProgressBarModule,
    FormModule,
    StatDashboardComponent,
    RegistrationModule,
    PlinthModule,
    OccupancyModule,
    StaticComponentsModule,
  ],
  exports: [
    DashboardComponent,
    DeparmentalDashboardComponent,
    DeparmentalRequestViewComponent,
  ],
  providers: [DatePipe],
})
export class DashboardModule {}
