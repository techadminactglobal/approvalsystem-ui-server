import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FooterComponent } from './footer/footer.component';

import { FormsModule } from '@angular/forms';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';

@NgModule({
  declarations: [FooterComponent, SideMenuComponent, SideBarComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    NgbDatepickerModule,
    RouterModule,
    RouterModule.forRoot([]),
  ],
  exports: [FooterComponent, SideMenuComponent, SideBarComponent],
})
export class StaticComponentsModule {}
