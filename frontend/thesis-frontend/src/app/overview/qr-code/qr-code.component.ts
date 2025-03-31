import { Component, Input } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent {
  @Input() data!: string;
  @Input() onClick?: () => void;
}
