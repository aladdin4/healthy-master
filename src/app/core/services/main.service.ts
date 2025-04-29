import { Injectable } from "@angular/core";
import { BehaviorSubject} from 'rxjs';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor (
  ) { }

  NavbarVisibleSubject = new BehaviorSubject<boolean>(false);
  isVisible = false;

  toggleNavbar() {
    this.isVisible = !this.isVisible;
    this.NavbarVisibleSubject.next(this.isVisible);
  }

  setNavbarVisible(visible: boolean) {
    this.isVisible = visible;
    this.NavbarVisibleSubject.next(this.isVisible);
  }
}
