import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-submitted-data-dialog',
  templateUrl: './submitted-data-dialog.component.html',
  styleUrls: ['./submitted-data-dialog.component.css']
})
export class SubmittedDataDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SubmittedDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public formData: any
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
