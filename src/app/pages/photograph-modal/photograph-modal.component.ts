import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-photograph-modal',
  templateUrl: './photograph-modal.component.html',
  styleUrls: ['./photograph-modal.component.scss']
})
export class PhotographModalComponent {
  @Input() photoGraph: string;

  constructor(public dialogRef: MatDialogRef<PhotographModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.photoGraph = data.photoGraph;
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
