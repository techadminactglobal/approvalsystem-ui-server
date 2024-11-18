import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-photographname-modal',
  templateUrl: './photographname-modal.component.html',
  styleUrls: ['./photographname-modal.component.scss']
})
export class PhotographnameModalComponent {
  @Input() photograpFormCertificatename: string;

  constructor(public dialogRef: MatDialogRef<PhotographnameModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.photograpFormCertificatename = data.photograpFormCertificatename;
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
