import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { AddEditUserDialog } from './add-edit-user-dialog/add-edit-user.dialog';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../core/models/user';
import { UsersService } from '../../core/services/users.service';
import { MainService } from '../../core/services/main.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {

  constructor (
    private title: Title,
    private userService: UsersService,
    private dialog: MatDialog,
    private mainService: MainService
  ) { }

  usersSubscription: Subscription = new Subscription();

  users: User[] = [];

  currentUser: User = new User();
  currentUserSubscription: Subscription = new Subscription();


  showDeleted = false;
  @Input() filter = ""

  ngOnInit(): void {
    this.userService.getUsers();
    this.usersSubscription = this.userService.usersSubject
      .subscribe((data: User[]) => {
        this.users = data;

      });

    this.mainService.setNavbarVisible(true);
    this.title.setTitle('Users');
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
    this.currentUserSubscription.unsubscribe();
  }


  AddUser(element: any = null) {
    let newUser = new Object() as User;
    const dialogRef = this.dialog.open(AddEditUserDialog, {
      data: { user: element ? element : newUser, currentUser: this.currentUser },
      position: { right: '0px' },
      width: '40%',
      height: "100%",
      maxHeight: "100%"
    });
  }
}
