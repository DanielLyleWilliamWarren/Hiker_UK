import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-drawer-content',
  imports: [MatButtonModule, MatButtonToggleModule, MatChipsModule],
  templateUrl: './drawer-content.component.html',
  styleUrl: './drawer-content.component.scss',
})
export class DrawerContentComponent {
}
