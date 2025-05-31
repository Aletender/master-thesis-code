import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { ChatService } from '../overview/services/chat.service';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  providers: [ChatService]
})
export class ChatComponent implements AfterViewChecked {
  opened = false;
  input = '';
  loading = false;
  messages: { role: 'user' | 'assistant', content: string }[] = [];
  sessionId = Math.random().toString(36).substring(2);

  @ViewChild('chatMessages') chatMessagesRef?: ElementRef<HTMLDivElement>;

  constructor(private chatService: ChatService) {}

  ngAfterViewChecked() {
    if (this.opened && this.chatMessagesRef) {
      setTimeout(() => {
        this.chatMessagesRef?.nativeElement.scrollTo({ top: this.chatMessagesRef.nativeElement.scrollHeight });
      });
    }
  }

  toggleChat() {
    this.opened = !this.opened;
    if (this.opened) {
      setTimeout(() => this.chatMessagesRef?.nativeElement.scrollTo({ top: this.chatMessagesRef.nativeElement.scrollHeight }), 100);
    }
  }

  async sendMessage() {
    if (!this.input.trim()) return;
    const content = this.input.trim();
    this.messages.push({ role: 'user', content });
    this.input = '';
    this.loading = true;
    try {
      const res = await this.chatService.sendMessage(this.messages, this.sessionId);
      this.messages.push({ role: 'assistant', content: res?.result ?? 'Fehler bei der Antwort.' });
    } catch {
      this.messages.push({ role: 'assistant', content: 'Fehler bei der Kommunikation mit dem Bot.' });
    }
    this.loading = false;
  }
}
