import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { StatDashboardComponent } from '../stat-dashboard/stat-dashboard.component';
import { FormModule } from '../forms/forms.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { OccupancyDashboradComponent } from './occupancy-dashborad/occupancy-dashborad.component';
import { OccupancyComponentComponent } from './occupancy-component/occupancy-component.component';
import { OccupancyComponentViewComponent } from './occupancy-component-view/occupancy-component-view.component';
import { PlinthModule } from '../Plinth/Plinth.module';
import { StaticComponentsModule } from '../static-components/static-common.module';

@NgModule({
  declarations: [
    OccupancyDashboradComponent,
    OccupancyComponentComponent,
    OccupancyComponentViewComponent,
  ],
  exports: [
    OccupancyDashboradComponent,
    OccupancyComponentComponent,
    OccupancyComponentViewComponent,
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
    PlinthModule,
    StaticComponentsModule,
  ],
})
export class OccupancyModule {}
