import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private showBar$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  getShowBar(): Observable<any> {
    return this.showBar$.asObservable();
  }

  setShowNav(showHide: boolean): void {
    this.showBar$.next(showHide);
  }

  toggleNavState(): void {
    this.showBar$.next(!this.showBar$.value);
  }

  isNavOpen(): boolean {
    return this.showBar$.value;
  }
}
