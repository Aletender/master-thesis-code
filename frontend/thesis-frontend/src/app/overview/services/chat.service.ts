import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChatService {
  private apiUrl = 'http://localhost:3000/langchain/chat';

  constructor(private http: HttpClient) {}

  sendMessage(messages: { role: string; content: string }[], sessionId: string) {
    return this.http.post<{ result: string }>(this.apiUrl, { messages, sessionId }).toPromise();
  }

}
