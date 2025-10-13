import { Injectable } from '@angular/core';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SideNavService {
  private sidenav!: MatSidenav;

  private readonly sidenavState = new BehaviorSubject<boolean>(false);

  public sidenavStateObservable = this.sidenavState.asObservable();

  public setSidenav(sidenav: MatSidenav): void {
    this.sidenav = sidenav;
  }

  public sideNavOpen(): boolean {
    return this.sidenav.opened;
  }

  public open(): Promise<MatDrawerToggleResult> {
    this.sidenavState.next(true);
    return this.sidenav.open();
  }

  public close(): Promise<MatDrawerToggleResult> {
    this.sidenavState.next(false);
    return this.sidenav.close();
  }

  public toggle(): void {
    this.sidenav.toggle();
    this.sidenavState.next(this.sidenav.opened);
  }
}
