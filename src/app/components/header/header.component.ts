import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
// import { SideNavService } from '../services/side-nav.service';

@Component({
  selector: 'app-header',
  // imports: [MatIconModule, CommonModule],
  imports: [MatIconModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // constructor(public sidenavService: SideNavService) {}

  public static toggleSideNav(): void {
    // this.sidenavService.toggle();
  }
}
