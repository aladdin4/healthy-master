import { Injectable } from "@angular/core";
import { BehaviorSubject, first } from 'rxjs';
import { User } from "../models/user";
import { Router } from "@angular/router";
import { ToastrDisplayService } from "./toastr.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor (
    private http: HttpClient,
    private router: Router,
    private toasterDisplayService: ToastrDisplayService,
  ) {
     
  }

  currentUserSubject = new BehaviorSubject<User>(new Object as User);
  usersSubject = new BehaviorSubject<User[]>([]);

  logIn(email: string, password: string) {
    this.http
      .post<{ data: User  }>(environment.serviceBase + 'login', { email, password })
      .subscribe((data) => {
        let rawUser = data.data
        let user = new User();

        user.email = rawUser.email;
        user.role = rawUser.role;
        user.first_name = rawUser.first_name;
        user.last_name = rawUser.last_name;
        user.id = rawUser.id;
        user.customer_address = rawUser.customer_address;
        user.customer_phone = rawUser.customer_phone;
        user.customer_prefrences = rawUser.customer_prefrences;
        user.token = rawUser.token;
        user.password = rawUser.password;

        user.fullName = `${user.first_name} ${user.last_name}`;
        if (user.first_name && user.last_name) {
          user.initials = `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`;
        };


        this.currentUserSubject.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        if (!user.role) {
          this.toasterDisplayService.showError({ error: "User Not Found" });
        }
        else {
          this.toasterDisplayService.showSuccess("Login successful");
         // reroute to home
          this.router.navigate(['/dashboard/products']);
        }
      },
        err => {
          let errMsg = err.error.data.email[0];
          this.toasterDisplayService.showError({ error: errMsg });
        });

    //let user = this.dummyUserList.find(user => user.email == email) || new User();

   
    //
    //localStorage.setItem('currentUser', JSON.stringify(user));
    //             console.log('called')
    //if (!user.id) {
    //  this.toasterDisplayService.showError({ error: "User Not Found" });
    //}
    //else {
    //  //reroute to home
    //  this.router.navigate(['/products']);
    //}
  }
  logOut() {
    this.currentUserSubject.next(new User());
    localStorage.removeItem('currentUser');
  }
  getCurrentUser() {
    let userLocalStorage = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser') || "") : new User();
    this.currentUserSubject.next(userLocalStorage);

  }                     

  dummyUserList: User[] = [
    new User("ahmed@healthy.com", "admin", "Ahmed", "Aladdin", '1', "23th Main Street, London"),
    new User("mohammed@gmail.com", "user", "Mohammed", "Ibrahim", '2', "23th Main Street, London"),
    new User("saber@gmail.com", "user", "Saber", "Osman", '3', "23th Main Street, London"),
  ]

  getUsers() {
    let currentUser  = JSON.parse(localStorage.getItem('currentUser') || "");
    let token = currentUser.token; 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);


    this.http
      .get<{ data: User[] }>(environment.serviceBase + 'users', { headers })
      .subscribe((response) => {
        response.data.forEach(user => {
          user.fullName = `${user.first_name} ${user.last_name}`;
        });
        this.usersSubject.next(response.data);
      })

    
  }

  createNewUser(user: any) {

    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = currentUserString ? JSON.parse(currentUserString) : null
    if (currentUser) {
      let token = currentUser.token;
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      if (user.id) {
        const url = environment.serviceBase + `users/${user.id}`;
        this.http
          .put<{ data: any }>(url, user, { headers })
          .subscribe((data) => {
            this.getUsers();
            this.toasterDisplayService.showSuccess('User Updated Successfully');
          },
            err => {
              let errMsg = err.error.data.email[0];
              this.toasterDisplayService.showError({ error: errMsg });
            });
      }
      else {
        this.http
          .post<{ data: any }>(environment.serviceBase + 'users/create', user, { headers })
          .subscribe((data) => {
            this.toasterDisplayService.showSuccess('User Created Successfully');

            this.getUsers();
          },
            err => {
              let errMsg = err.error.data.email[0];
              this.toasterDisplayService.showError({ error: errMsg });
            });
      }
    }
    else {
      this.http
        .post<{ data: any }>(environment.serviceBase + 'signup', user)

        .subscribe({
          next: (response: any) => {
            this.getUsers();
          },
          complete: () => {
            this.router.navigate(['/login'])
            this.toasterDisplayService.showSuccess('User Created Successfully, Please Login With Your New Credentials');
          },
          error: (err) => {
            let errMsg = err.error.data.email[0];
            this.toasterDisplayService.showError({ error: errMsg });
          }
        })
    }
  }

  deleteUser(user: any) {
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = currentUserString ? JSON.parse(currentUserString) : null
    if (currentUser) {
      let token = currentUser.token;
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http
        .delete<{ data: any }>(environment.serviceBase + `users/${user.id}`, { headers })
        .subscribe((data) => {
          this.getUsers();
          this.toasterDisplayService.showSuccess('User Deleted Successfully');
        },
          err => {
            let errMsg = err.error.data.email[0];
            this.toasterDisplayService.showError({ error: errMsg });
          });
    }
  }
}
