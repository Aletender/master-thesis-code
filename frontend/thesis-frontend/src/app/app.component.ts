import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ChatComponent} from './chat/chat.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, ChatComponent],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'thesis-frontend';
}
