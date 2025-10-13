import { Component, ViewChild } from '@angular/core';
// import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
// import { DrawerContentComponent } from './drawer-content/drawer-content.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SideNavService } from '../services/side-nav.service';
import { DrawerContentComponent } from './drawer-content/drawer-content.component';
import { HeaderComponent } from './header/header.component';
// import { MapComponent } from './map/map.component';
// import { SideNavService } from './services/side-nav.service';

@Component({
  selector: 'app-components',
  imports: [HeaderComponent, MatSidenavModule, DrawerContentComponent],
  // imports: [HeaderComponent, MapComponent, MatSidenavModule, DrawerContentComponent],
  templateUrl: './components.component.html',
  styleUrl: './components.component.scss',
})
export class ComponentsComponent {
  @ViewChild('drawer') public sidenav!: MatSidenav;

  constructor(private readonly sidenavService: SideNavService) { }

  public ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
