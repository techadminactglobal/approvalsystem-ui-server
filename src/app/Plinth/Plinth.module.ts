import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { PlinthDashboardComponent } from './plinth-dashboard/plinth-dashboard.component';
import { StatDashboardComponent } from '../stat-dashboard/stat-dashboard.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { AppModule } from '../app.module';
import { CommonModule, DatePipe } from '@angular/common';
import { PlintComponentComponent } from './plint-component/plint-component.component';
import { FormModule } from '../forms/forms.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { PlinthComponentViewComponent } from './plinth-component-view/plinth-component-view.component';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { StaticComponentsModule } from '../static-components/static-common.module';
import { SanctionreviseComponent } from './sanctionrevise/sanctionrevise.component';
import { AddaletrationComponent } from './addaletration/addaletration.component';
import { RevalidationComponent } from './revalidation/revalidation.component';

@NgModule({
  declarations: [
    PlinthDashboardComponent,
    PlintComponentComponent,
    PlinthComponentViewComponent,
    SanctionreviseComponent,
    AddaletrationComponent,
    RevalidationComponent,
  ],
  exports: [
    PlinthDashboardComponent,
    MatExpansionModule,
    PlinthComponentViewComponent,
  ],
  providers: [DatePipe],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    MatRadioModule,
    StatDashboardComponent,
    FormModule,
    MatExpansionModule,
    StaticComponentsModule,
  ],
})
export class PlinthModule {}
