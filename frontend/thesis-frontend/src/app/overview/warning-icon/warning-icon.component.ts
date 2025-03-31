import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-warning-icon',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './warning-icon.component.html',
  styleUrls: ['./warning-icon.component.scss']
})
export class WarningIconComponent {}
