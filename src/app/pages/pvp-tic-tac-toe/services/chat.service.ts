import { Message } from '@/ts/enums';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;

  private roomId: string;

  public messages$ = new Subject<Message>();

  constructor() {}

  public connect() {
    this.socket = io(`${environment.socketUrl}/chat`);

    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.socket.emit('joinRoom', this.roomId);
    });

    this.socket.on('chatToClient', ({ message }: any) => {
      console.log('Received message:', message);
      this.messages$.next(message);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  }

  public sendMessage(message: Message) {
    this.socket.emit('chatToServer', message, this.roomId);
  }

  public disconnect() {
    this.socket.emit('leaveRoom', this.roomId);
  }

  set room(value: string) {
    this.roomId = value;
  }
}
