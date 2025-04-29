
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { User } from '../../../core/models/user';
import { UsersService } from '../../../core/services/users.service';
import { DeleteConfirmationDialog } from '../../../shared/modals/delete-confirmation-dialog/delete-confirmation.dialog';


@Component({
  selector: 'add-edit-user-dialog',
  templateUrl: 'add-edit-user.dialog.html',
  styleUrls: ['add-edit-user.dialog.css']
})
export class AddEditUserDialog implements OnInit, OnDestroy {

  roleNamesSubscription: Subscription = new Subscription();
  roleNames: string[] = [];

  userState: string = "Add New User";

  user: User = new User();
  currentUser: User = new User();
  permissions: string = '';
  allowedWrite: boolean = true;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditUserDialog>,
    private userService: UsersService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.user = data.user;
    this.currentUser = data.currentUser;
    if (this.user.id) {
      this.userState = "Edit User";
    }
  }

  ngOnInit(): void {
    if (this.user) {
      this.addEditUserForm.patchValue({
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        role: this.user.role,
      });
    }
  }
   
  ngOnDestroy() {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  addEditUserForm = this.fb.group({
    first_name: ["", [Validators.required]],
    last_name: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    role: ["", [Validators.required]],
    password: ["", [Validators.required]],
  });

  saveUser() {

    let user: User = new Object() as User;

    user = { ...this.user };
    user.first_name = this.addEditUserForm.get('first_name')?.value || this.user.first_name;
    user.last_name = this.addEditUserForm.get('last_name')?.value || this.user.last_name;
    user.email = this.addEditUserForm.get('email')?.value || this.user.email;
    user.role = this.addEditUserForm.get('role')?.value || this.user.role;
    user.password = this.addEditUserForm.get('password')?.value || this.user.password;

    this.userService.createNewUser(user);
   // this.userService.saveUser(user);
    this.dialogRef.close();
  }
  deleteUser(): void {
    const dialogRef =
      this.dialog.open(DeleteConfirmationDialog, {
        data: { title: 'Delete User', message: 'Are you sure you want to delete this user?' },
        position: { top: '6rem' },
        width: '600px',

      }).afterClosed().subscribe(result => {
        if (result) {
          this.userService.deleteUser(this.user);
          this.dialogRef.close();
        }
      })
  }

  restoreUser() {
    const dialogRef =
      this.dialog.open(DeleteConfirmationDialog, {
        data: { btnText: 'Restore', primaryBtn: true, title: 'Restore User', message: 'Are you sure you want to Restore this user?' },
        position: { top: '6rem' },
        width: '600px',

      }).afterClosed().subscribe(result => {
        if (result) {
         // this.userService.restoreUser(this.user);
          this.dialogRef.close();
        }
      })
  }
}
