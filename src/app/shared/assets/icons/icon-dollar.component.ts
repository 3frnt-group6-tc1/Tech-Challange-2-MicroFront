import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-dollar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-dollar.component.html',
  styleUrl: './icon-dollar.component.scss',
})
export class IconDollarComponent {
  @Input() class = '';
}
