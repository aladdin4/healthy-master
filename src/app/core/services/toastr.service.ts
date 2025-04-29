import { Injectable } from '@angular/core';
import { ProgressAnimationType, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class ToastrDisplayService {

  constructor(private toastr: ToastrService) { }

  showError(err: any, title: string = '', timeOut: number = 3000, progressAnimation: ProgressAnimationType = 'increasing', progressBar: boolean = true, closeButton: boolean = true) {
    let errorMessage = "";
    if (typeof err.error === "object") {
      if (err.error && err.error.error)
        errorMessage = err.error.error
      if (err.error && err.error.title)
        title = `${title} ${err.error.title}`
    }
    if (typeof err.error === "string") {
      errorMessage = err.error
    }

    if (err.status == 403) {
      errorMessage = "You are not authorized to perform this operation."
    }
    if (err.status == 404) {
      errorMessage = "Error 404: Not found."
    }

    //fallback status for other errors(ex. CORS)
    if (errorMessage == "" && title == "")
      title = "An error occurred.";
    this.toastr.error(errorMessage, title, {
      timeOut: timeOut,
      progressAnimation: progressAnimation,
      progressBar: progressBar,
      closeButton: closeButton,
    });
  }

  showSuccess(message: string, title: string = '', timeOut: number = 3000, progressAnimation: ProgressAnimationType = 'increasing', progressBar: boolean = true, closeButton: boolean = true) {
    this.toastr.success(message, title, {
      timeOut: timeOut,
      progressAnimation: progressAnimation,
      progressBar: progressBar,
      closeButton: closeButton,
    });
  }
}

