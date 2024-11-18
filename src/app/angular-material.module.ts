   import { NgModule } from '@angular/core';
   import { CommonModule } from '@angular/common';

   import { MatButtonModule } from '@angular/material/button';
   import { MatSelectModule } from '@angular/material/select';
   import { MatRadioModule } from '@angular/material/radio';
   import { MatDatepickerModule } from '@angular/material/datepicker';
   import {MatNativeDateModule} from '@angular/material/core';
   import { MatTabsModule } from '@angular/material/tabs';
   import { MatTooltipModule } from '@angular/material/tooltip';
   import { MatSortModule } from '@angular/material/sort';
   import { MatPaginatorModule } from '@angular/material/paginator';
   import { MatCheckboxModule } from '@angular/material/checkbox';
   import { MatTableModule } from '@angular/material/table';
   import { MatSlideToggleModule } from '@angular/material/slide-toggle';
   import { MatCardModule } from '@angular/material/card';
   import { MatIconModule } from '@angular/material/icon';
   import { MatDialogModule } from '@angular/material/dialog';
   import {MatTreeModule} from '@angular/material/tree';
   import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
   import { MatDividerModule } from '@angular/material/divider';

   import { MatAutocompleteModule } from '@angular/material/autocomplete';
   import { MatFormFieldModule } from '@angular/material/form-field';
   import { MatInputModule } from '@angular/material/input';
   import { MatChipsModule } from '@angular/material/chips';
   import {MatStepperModule} from '@angular/material/stepper';
   import {MatToolbarModule} from '@angular/material/toolbar';


   // import { MatProgressBarModule } from '@angular/material/progress-bar';
   // import {MatToolbarModule} from '@angular/material/toolbar'; 

   @NgModule({
      imports: [
         CommonModule,
         MatButtonModule,
         // MatToolbarModule,
         // MatBadgeModule,
         // MatSidenavModule,
         // MatListModule,
         // MatGridListModule,
         MatFormFieldModule,
         MatInputModule,
         MatInputModule,
         MatSelectModule,
         MatRadioModule,
         MatDatepickerModule,
         MatNativeDateModule,
         MatChipsModule,
         MatTooltipModule,
         MatTableModule,
         MatPaginatorModule,
         // MatMenuModule,
         MatAutocompleteModule,
         MatSortModule,
         MatCheckboxModule,
         MatTabsModule,
         MatSlideToggleModule,
         MatCardModule,
         MatIconModule,
         MatDialogModule,
         MatTreeModule,
         // MatProgressBarModule,
         // MatToolbarModule,
         MatDividerModule,
         MatProgressSpinnerModule,
         MatStepperModule,
         MatToolbarModule
      ],
      exports: [
         MatButtonModule,
         // MatToolbarModule,
         // MatBadgeModule,
         // MatSidenavModule,
         // MatListModule,
         // MatGridListModule,
         MatFormFieldModule,
         MatInputModule,
         MatInputModule,
         MatSelectModule,
         MatRadioModule,
         MatDatepickerModule,
         MatNativeDateModule,
         MatChipsModule,
         MatTooltipModule,
         MatTableModule,
         MatPaginatorModule,
      // MatMenuModule,
         MatAutocompleteModule,
         MatSortModule,
         MatCheckboxModule,
         MatTabsModule,
         MatSlideToggleModule,
         MatCardModule,
         MatIconModule,
         MatDialogModule,
         MatTreeModule,
         // MatProgressBarModule ,
         // MatToolbarModule,
         MatProgressSpinnerModule,
         MatDividerModule,
         MatStepperModule,
         MatToolbarModule
      ],
      providers: [
         MatDatepickerModule,
      ]
   })

   export class AngularMaterialModule { }