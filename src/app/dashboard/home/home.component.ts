import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from '../../core/services/products.service';
import { MainService } from '../../core/services/main.service';
import { ToastrDisplayService } from '../../core/services/toastr.service';
import { Title } from '@angular/platform-browser';
import { UsersService } from '../../core/services/users.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  constructor (public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private productsService: ProductsService,
    private mainService: MainService,
    private toasterDisplayService: ToastrDisplayService,
    private title: Title,
    private usersService: UsersService
  ) { }

  voteCategories:{ [key: string]: number } = {
    'Keto Food':  0,
    'Vegan': 0,
    'Smoothie': 0 ,
    'Healthy Sweets': 0
  }
             

  ngOnInit() {
    // Retrieve vote counts from localStorage
    const storedVoteCategories = localStorage.getItem('voteCategories');
    if (storedVoteCategories) {
      this.voteCategories = JSON.parse(storedVoteCategories);
    }
    this.title.setTitle('Welcome To Healthy 🎉');
  }
  increaseVoteCount(Category: string) {
    this.voteCategories[Category]++;

    // Save vote counts to localStorage
    localStorage.setItem('voteCategories', JSON.stringify(this.voteCategories));
    this.toasterDisplayService.showSuccess('Your Vote Was Recorded For ' + Category + '', 'Success');

  }
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    const video = this.videoElement.nativeElement;
    video.muted = true;
    video.play().catch(() => {
      // Wait for a user gesture to start playback
      document.addEventListener('click', () => {
        video.play().catch(err => console.error('Error after user interaction', err));
      }, { once: true });
    });
  }
}
