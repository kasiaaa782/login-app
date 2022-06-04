import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
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
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('pagination') pagination: ElementRef;

  cardsList: CatInfo[] = [];

  callback = () => {
    this.getCatCardInfo();
  };

  observer = new IntersectionObserver(this.callback);

  target: HTMLElement;

  constructor(
    public authenticationService: AuthenticationService,
    private http: HttpClient
  ) {}

  ngAfterViewInit(): void {
    if (globalThis.IntersectionObserver) {
      this.target = <HTMLElement>this.pagination.nativeElement;
      this.observer.observe(this.target);
    }
  }

  ngOnInit(): void {
    this.getCatCardInfo();
    this.getCatCardInfo();
    this.getCatCardInfo();
  }

  ngOnDestroy(): void {
    if (globalThis.IntersectionObserver) {
      this.observer.unobserve(this.target);
    }
  }

  logout(): void {
    this.authenticationService.logout();
  }

  getCatCardInfo(): void {
    const url = 'https://meowfacts.herokuapp.com/';

    this.http.get<CatInfo>(url).subscribe((card) => {
      if (this.checkIsDuplicatedCard(card)) {
        this.getCatCardInfo();
      } else {
        this.cardsList.push(card);
      }
    });
  }

  private checkIsDuplicatedCard(card: CatInfo): boolean {
    let isDuplicate = false;
    this.cardsList.forEach((value) => {
      if (value.data[0].normalize() === card.data[0].normalize()) {
        isDuplicate = true;
      }
    });
    return isDuplicate;
  }
}
