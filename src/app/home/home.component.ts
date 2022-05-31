import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthenticationService } from '../core/service/authentication/authentication.service';

interface CatInfo {
  data: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @HostListener('window:wheel') onWheel(e: Event): void {
    this.getCatCardInfo();

    console.log(window.pageYOffset);
  }

  cardsList: CatInfo[] = [];

  constructor(
    public authenticationService: AuthenticationService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getCatCardInfo();
  }

  logout() {
    this.authenticationService.logout();
  }

  getCatCardInfo(): void {
    const url = 'https://meowfacts.herokuapp.com/';

    this.http.get<CatInfo>(url).subscribe((card) => {
      let isDuplicate = false;
      this.cardsList.forEach((value) => {
        if (value.data[0].normalize() === card.data[0].normalize()) {
          isDuplicate = true;
        }
      });
      if (!isDuplicate) {
        this.cardsList.push(card);
      }
    });
  }
}
