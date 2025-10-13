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

  /**
   * The function `setSidenav` sets the `sidenav` property to the provided `MatSidenav` parameter.
   * @param {MatSidenav} sidenav - The `setSidenav` method is a TypeScript function that sets the
   * `sidenav` property of the class to the provided `MatSidenav` object. The `sidenav` parameter is of
   * type `MatSidenav`, which is a reference to a Material Design sidenav component in Angular
   */
  public setSidenav(sidenav: MatSidenav): void {
    this.sidenav = sidenav;
  }

  /**
   * The function `sideNavOpen` returns a boolean value indicating whether the side navigation is open or
   * not.
   * @returns The method `sideNavOpen()` is returning the value of `this.sidenav.opened`, which is a
   * boolean value.
   */
  public sideNavOpen(): boolean {
    return this.sidenav.opened;
  }

  /**
   * The function "open" in TypeScript opens a side navigation and returns a promise with the result.
   * @returns The `open()` method is returning a Promise with a `MatDrawerToggleResult` type.
   */
  public open(): Promise<MatDrawerToggleResult> {
    this.sidenavState.next(true);
    return this.sidenav.open();
  }

  /**
   * This function closes a side navigation menu and returns a promise with the result.
   * @returns The `close()` method returns a `Promise` with a `MatDrawerToggleResult` as the resolved
   * value.
   */
  public close(): Promise<MatDrawerToggleResult> {
    this.sidenavState.next(false);
    return this.sidenav.close();
  }

  /**
   * The function toggles the state of a sidenav and updates the sidenav state accordingly.
   */
  public toggle(): void {
    this.sidenav.toggle();
    this.sidenavState.next(this.sidenav.opened);
  }
}
