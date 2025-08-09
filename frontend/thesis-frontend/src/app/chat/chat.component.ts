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
  private shouldAutoScroll = false; // Nur nach Bot-Antwort true

  @ViewChild('chatMessages') chatMessagesRef?: ElementRef<HTMLDivElement>;

  constructor(private chatService: ChatService) {}

  ngAfterViewChecked() {
    if (this.opened && this.chatMessagesRef && this.shouldAutoScroll) {
      setTimeout(() => {
        this.chatMessagesRef?.nativeElement.scrollTo({ top: this.chatMessagesRef.nativeElement.scrollHeight });
        this.shouldAutoScroll = false; // Nach dem Scrollen wieder deaktivieren
      });
    }
  }

  toggleChat() {
    this.opened = !this.opened;
    // Kein automatisches Scrollen beim Öffnen mehr
  }

  onScroll() {
    if (!this.chatMessagesRef) return;
    const el = this.chatMessagesRef.nativeElement;
    this.shouldAutoScroll = false; // User scrollt selbst, daher nie auto-scroll
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
      this.shouldAutoScroll = true; // Nur nach Bot-Antwort auto-scroll aktivieren
    } catch {
      this.messages.push({ role: 'assistant', content: 'Fehler bei der Kommunikation mit dem Bot.' });
      this.shouldAutoScroll = true;
    }
    this.loading = false;
  }

  isJsonCodeBlock(msg: { role: string; content: string }): boolean {
    if (msg.role !== 'assistant') return false;
    const trimmed = msg.content.trim();
    return trimmed.startsWith('```json') && trimmed.endsWith('```');
  }

  extractJsonFromCodeBlock(msg: { role: string; content: string }): string | null {
    if (!this.isJsonCodeBlock(msg)) return null;
    // Entferne die Markdown-Formatierung
    return msg.content.trim().replace(/^```json[\r\n]*/i, '').replace(/```$/, '').trim();
  }
}
