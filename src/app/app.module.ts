import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StaticComponentsModule } from './static-components/static-common.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material.module';
import { MatTabsModule } from '@angular/material/tabs';
import {
  NgbModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './static-components/home/home.component';
import { DecimalPipe, NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentModule } from './payments/payment.module';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './static-components/login/login.component';
import { reducers } from './reducers';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { PhotographModalComponent } from './pages/photograph-modal/photograph-modal.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { ToastrModule } from 'ngx-toastr';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { FormModule } from './forms/forms.module';
import { LettersModule } from './letters/letters.module';
import { RegistrationModule } from './registration/registration.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ModalopenComponent } from './modal/modalopen/modalopen.component';
import { PlinthModule } from './Plinth/Plinth.module';
import { StatDashboardComponent } from './stat-dashboard/stat-dashboard.component';
import { OccupancyModule } from './Occupancy Certificate/occupancy.module';
import { PublicdashboardComponent } from './Public-stats/publicdashboard/publicdashboard.component';
import { DebarredComponent } from './Public-stats/debarred/debarred.component';
import { DebareddashboardComponent } from './Public-stats/debareddashboard/debareddashboard.component';
import { StatsMisComponent } from './Public-stats/stats-mis/stats-mis.component';
import { CitizencornerComponent } from './Public-stats/citizencorner/citizencorner.component';
import { ProfessionalComponent } from './Public-stats/professional/professional.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PhotographModalComponent,
    ModalopenComponent,
    PublicdashboardComponent,
    DebarredComponent,
    DebareddashboardComponent,
    StatsMisComponent,
    CitizencornerComponent,
    ProfessionalComponent
  ],
  imports: [
    BrowserModule,
    MatGridListModule,
    RouterModule,
    StaticComponentsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AppRoutingModule,
    MatTabsModule,
    NgbModule,
    DecimalPipe,
    MatPaginatorModule,
    NgFor,
    NgbTypeaheadModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    StoreModule.forRoot(reducers),
    MatExpansionModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    CommonModule,
    PaymentModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 15000, // 15 seconds
      progressBar: true,
    }),
    FormModule,
    LettersModule,
    RegistrationModule,
    DashboardModule,
    PlinthModule,
    OccupancyModule,
    MatSnackBarModule
  ],
  exports: [
    HomeComponent,
    LoginComponent,
    MatDialogModule,
    PhotographModalComponent,
    DebarredComponent
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
