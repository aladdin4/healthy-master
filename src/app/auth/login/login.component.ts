import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Title } from '@angular/platform-browser';
import { UsersService } from '../../core/services/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  logInData: any;
  signIn: boolean = true;
  logInForm: FormGroup;
  constructor (
    private fb: FormBuilder,
    public dialog: MatDialog,
    private cookieService: CookieService,
    private title: Title,
    private usersService: UsersService
                                    
  ) {
    this.logInForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      firstName: [""],
      lastName: [""],
      phoneNumber: [""],
      address: [""],
      role: ["customer"],
      confirmPassword: [""],
      preferences: [""]
    }, { validators: this.confirmPasswordValidator('password', 'confirmPassword') });
  }
  logoPath = "assets/logo.png";

  loggingIn: boolean = false;
  loggingInSubscription: Subscription = new Subscription();
  ngOnInit(): void {
    this.title.setTitle('Login');
  }

  ngOnDestroy(): void {
    this.loggingInSubscription.unsubscribe();
  }

  
  logIn() {
    this.usersService.logIn(this.logInForm.value.email || "", this.logInForm.value.password || "");
  }
  signUp() {
    this.usersService.createNewUser({
      first_name: this.logInForm.value.firstName || "",
      last_name: this.logInForm.value.lastName || "",
      phone: this.logInForm.value.phoneNumber || "",
      address: this.logInForm.value.address || "",
      role: this.logInForm.value.role || "customer",
      email: this.logInForm.value.email || "",
      password: this.logInForm.value.password || "",
      customer_prefrences: this.logInForm.value.preferences || "",
      id: 0
    })
  }

  toggleSignIn() {
    this.signIn = !this.signIn;
    this.toggleValidators();
  }
  toggleValidators(): void {
    if (this.signIn)
    {
      this.logInForm.get('firstName')?.clearValidators();
      this.logInForm.get('lastName')?.clearValidators();
      this.logInForm.get('phoneNumber')?.clearValidators();
      this.logInForm.get('address')?.clearValidators();
      this.logInForm.get('role')?.clearValidators();
      this.logInForm.get('confirmPassword')?.clearValidators();
    
  }
    else
    {
      this.logInForm.get('firstName')?.setValidators([Validators.required]);
      this.logInForm.get('lastName')?.setValidators([Validators.required]);
      this.logInForm.get('phoneNumber')?.setValidators([Validators.required]);
      this.logInForm.get('address')?.setValidators([Validators.required]);
      this.logInForm.get('role')?.setValidators([Validators.required]);
      this.logInForm.get('confirmPassword')?.setValidators([Validators.required]);
    }
    this.logInForm.get('firstName')?.updateValueAndValidity();
    this.logInForm.get('lastName')?.updateValueAndValidity();
    this.logInForm.get('phoneNumber')?.updateValueAndValidity();
    this.logInForm.get('address')?.updateValueAndValidity();
    this.logInForm.get('role')?.updateValueAndValidity();
    this.logInForm.get('confirmPassword')?.updateValueAndValidity();
  }


  confirmPasswordValidator(password: string, confirmPassword: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordControl = control.get(password);
      const confirmPasswordControl = control.get(confirmPassword);
      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }
      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
        return null;
      }
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      }
      else {
        confirmPasswordControl.setErrors(null);
      }
      return null;
    };
  }
}
