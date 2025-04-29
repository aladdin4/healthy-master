
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
    selector: 'delete-confirmation-dialog',
    templateUrl: 'delete-confirmation.dialog.html',
    styleUrls: ['delete-confirmation.dialog.css']
})
export class DeleteConfirmationDialog {
    constructor(private fb: FormBuilder,
        public dialogRef: MatDialogRef<DeleteConfirmationDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    onNoClick(): void {
        this.dialogRef.close(false);
    }
    onYesClick(): void {
        this.dialogRef.close(true);
    }
}
