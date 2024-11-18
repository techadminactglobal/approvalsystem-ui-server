import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './static-components/home/home.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { LoginComponent } from './static-components/login/login.component';
import { PaymentFormComponent } from './payments/payment-form/payment-form.component';
import { DeparmentalDashboardComponent } from './dashboard/deparmental-dashboard/deparmental-dashboard.component';
import { NewFirstFormComponent } from './forms/new-first-form/new-first-form.component';
import { RegistrationComponent } from './registration/registration/registration.component';
import { RegistrationViewComponent } from './registration/registration-view/registration-view.component';
import { DeparmentalRequestViewComponent } from './dashboard/deparmental-request-view/deparmental-request-view.component';
import { NewFormViewComponent } from './forms/new-form-view/new-form-view.component';
import { SupportFileDocumentComponent } from './forms/support-file-document/support-file-document/support-file-document.component';
import { SupportFileViewComponent } from './forms/support-file-view/support-file-view.component';
import { NewSecondFormComponent } from './forms/new-second-form/new-second-form.component';
import { NewSecondformViewComponent } from './forms/new-secondform-view/new-secondform-view.component';
import { PaymentReceiptComponent } from './payments/payment-receipt/payment-receipt.component';
import { DsletterComponent } from './letters/dsletter/dsletter.component';
import { FireComponent } from './forms/NocForms/fire/fire.component';
import { NocPageComponent } from './forms/NocForms/noc-page/noc-page.component';
import { ViewFireComponent } from './forms/NocViewForms/view-fire/view-fire.component';
import { ViewNocPageComponent } from './forms/NocViewForms/view-noc-page/view-noc-page.component';
import { NocDashboardComponent } from './dashboard/noc-dashboard/noc-dashboard.component';
import { PlinthDashboardComponent } from './Plinth/plinth-dashboard/plinth-dashboard.component';
import { PlintComponentComponent } from './Plinth/plint-component/plint-component.component';
import { PlinthComponentViewComponent } from './Plinth/plinth-component-view/plinth-component-view.component';
import { StatDashboardComponent } from './stat-dashboard/stat-dashboard.component';
import { OccupancyDashboradComponent } from './Occupancy Certificate/occupancy-dashborad/occupancy-dashborad.component';
import { OccupancyComponentComponent } from './Occupancy Certificate/occupancy-component/occupancy-component.component';
import { OccupancyComponentViewComponent } from './Occupancy Certificate/occupancy-component-view/occupancy-component-view.component';
import { OwnerRegistrationComponent } from './registration/owner-registration/owner-registration.component';
import { OwnerDashboardComponent } from './registration/owner-dashboard/owner-dashboard.component';
import { OwnerApplicantDetialsComponent } from './forms/owner-applicant-detials/owner-applicant-detials.component';
import { PublicdashboardComponent } from './Public-stats/publicdashboard/publicdashboard.component';
import { DebarredComponent } from './Public-stats/debarred/debarred.component';
import { DebareddashboardComponent } from './Public-stats/debareddashboard/debareddashboard.component';
import { StatsMisComponent } from './Public-stats/stats-mis/stats-mis.component';
import { CitizencornerComponent } from './Public-stats/citizencorner/citizencorner.component';
import { ProfessionalComponent } from './Public-stats/professional/professional.component';
import { SanctionreviseComponent } from './Plinth/sanctionrevise/sanctionrevise.component';
import { AddaletrationComponent } from './Plinth/addaletration/addaletration.component';
import { RevalidationComponent } from './Plinth/revalidation/revalidation.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    title: 'registration',
  },
  {
    path: 'registrationView',
    component: RegistrationViewComponent,
    title: 'registrationView',
  },
  {
    path: 'NewFormView',
    component: NewFormViewComponent,
    title: 'NewFormView',
  },
  {
    path: 'SupportFileDocument',
    component: SupportFileDocumentComponent,
    title: 'SupportFileDocument',
  },
  {
    path: 'deptRequestView',
    component: DeparmentalRequestViewComponent,
    title: 'deptRequestView',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    title: 'registration',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'supportView',
    component: SupportFileViewComponent,
    title: 'supportFileView',
  },
  {
    path: 'secondView',
    component: NewSecondformViewComponent,
    title: 'secondFileView',
  },
  {
    path: 'paymentReceipt',
    component: PaymentReceiptComponent,
    title: 'paymentReceipt',
  },
  {
    path: 'senondForm',
    component: NewSecondFormComponent,
    title: 'SecondForm',
  },

  {
    path: 'payment',
    component: PaymentFormComponent,
    title: 'Payment',
  },
  {
    path: 'departmentDashboard',
    component: DeparmentalDashboardComponent,
    title: 'Department Dashboard',
  },
  {
    path: 'dsLetter',
    component: DsletterComponent,
    title: 'Ds Letter',
  },
  {
    path: 'form/new-first-component',
    component: NewFirstFormComponent,
    title: 'New First Form',
  },
  {
    path: 'nocPage',
    component: NocPageComponent,
    title: 'Noc Page',
  },
  {
    path: 'fire',
    component: FireComponent,
    title: 'Fire Noc',
  },
  {
    path: 'viewNocPage',
    component: ViewNocPageComponent,
    title: 'View Noc Page',
  },
  {
    path: 'viewFire',
    component: ViewFireComponent,
    title: 'View Fire Noc',
  },
  {
    path: 'nocDashboard',
    component: NocDashboardComponent,
    title: 'Noc Dashboard',
  },
  {
    path: 'plinthDashboard',
    component: PlinthDashboardComponent,
    title: 'Plinth Dashboard',
  },
  {
    path: 'plinthComponent',
    component: PlintComponentComponent,
    title: 'Plinth Component',
  },
  {
    path: 'plintComponentView',
    component: PlinthComponentViewComponent,
    title: 'Plint Component View',
  },
  {
    path: 'staticalDashboard',
    component: StatDashboardComponent,
    title: 'Statical Dashboard',
  },
  {
    path: 'OccupancyDashborad',
    component: OccupancyDashboradComponent,
    title: 'Occupancy Dashborad',
  },
  {
    path: 'OccupancyComponent',
    component: OccupancyComponentComponent,
    title: 'Occupancy Component',
  },
  {
    path: 'OccupancyComponentView',
    component: OccupancyComponentViewComponent,
    title: 'Occupancy Component View',
  },
  {
    path: 'OwnerRegistration',
    component: OwnerRegistrationComponent,
    title: 'Owner Registration',
  },
  {
    path: 'OwnerDashboard',
    component: OwnerDashboardComponent,
    title: 'Owner Dashboard',
  },
  {
    path: 'OwnerApplicantDetials',
    component: OwnerApplicantDetialsComponent,
    title: 'Owner Applicant Detials',
  },
  {
    path: 'publicdashboard',
    component: PublicdashboardComponent,
    title: 'Public dashboard',
  },{
    path: 'debarred',
    component: DebarredComponent,
    title: 'Debarred'
  },
  {
    path: 'PublicDebardList',
    component: DebareddashboardComponent,
    title: 'Public Debard List'
  },
  {
    path: 'Publicstaticmis',
    component: StatsMisComponent,
    title: 'Public static mis'
  },
  {
    path: 'CitizenCorner',
    component: CitizencornerComponent,
    title: 'Citizen Corner Details'
  },
  {
    path: 'AllProfessionalsDetails',
    component: ProfessionalComponent,
    title: ' All Professionals Details '
  },
  {
    path: 'SanctionRevise',
    component: SanctionreviseComponent,
    title: ' Sanction Revise '
  },
  {
    path: 'Addition&Alteration',
    component: AddaletrationComponent,
    title: 'Addition & Alteration'
  },
  {
    path: 'Revalidation',
    component: RevalidationComponent,
    title: 'Revalidation'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
