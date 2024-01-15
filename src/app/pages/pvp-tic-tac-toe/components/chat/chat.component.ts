import { messageTransition } from '@/transitions/message-transition';
import { Message } from '@/ts/enums';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations: [messageTransition],
})
export class ChatComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chatScrollable') chatScrollable: ElementRef;

  @ViewChild('progressCircle') progressCircle: ElementRef;

  public progressStyles$ = new BehaviorSubject<{ [key: string]: string }>({});

  public levelStyles$ = new BehaviorSubject<{ [key: string]: string }>({});

  public level$ = new Subject<number>();

  public currentLevel: number;

  public chatInput = new FormControl('', { nonNullable: true });

  public messages$ = new BehaviorSubject<Message[]>([
    {
      userName: 'Madness',
      text: 'hello fellas. please tip me',
      // image: 'assets/images/user-1.png',
    },
    {
      userName: 'POP2DR',
      text: 'dev fix this pls',
      // image: 'assets/images/user-2.png',
    },
    {
      userName: 'POP2DR',
      text: 'dev fix this pls',
      // image: 'assets/images/user-2.png',
    },
    {
      userName: 'Madness',
      text: 'hello fellas. please tip me',
      // image: 'assets/images/user-1.png',
    },
    {
      userName: 'POP2DR',
      text: 'dev fix this pls dev fix this pls dev fix this pls',
      // image: 'assets/images/user-2.png',
    },
    {
      userName: 'POP2DR',
      text: 'Some random text',
      // image: 'assets/images/user-2.png',
    },
    {
      userName: 'Madness',
      text: 'Lorem ipsum dolor sit amet c',
      // image: 'assets/images/user-1.png',
    },
  ]);

  public thereIsNewMessages = false;

  public animateMessage = false;

  public animateChat = false;

  public chatOpen = false;

  constructor(private chat: ChatService, private route: ActivatedRoute) {
    this.chat.messages$.subscribe((message: Message) => {
      this.messages$.next(this.messages$.getValue().concat([message]));

      this.animateMessage = true;

      setTimeout(() => this.scrollDown(true), 0);
    });
  }

  ngOnInit(): void {
    this.chat.room = this.route.snapshot.paramMap.get('id') as string;
    this.chat.connect();
  }

  ngAfterViewInit(): void {
    this.scrollDown();
  }

  ngOnDestroy(): void {
    this.chat.disconnect();
  }

  set progressStyles(value: { [key: string]: string }) {
    this.progressStyles$.next(value);
  }

  set levelStyles(value: { [key: string]: string }) {
    this.levelStyles$.next(value);
  }

  set level(level: number) {
    this.currentLevel = level;
    this.level$.next(level);
  }

  get chatScrollableHeight(): number {
    return this.chatScrollable.nativeElement.clientHeight;
  }

  get messageText(): string {
    return this.chatInput.value;
  }

  scrollDown(smooth = false) {
    const height = this.chatScrollableHeight;
    const behavior = smooth ? 'smooth' : 'auto';

    this.chatScrollable.nativeElement.parentElement.scroll({
      behavior,
      top: height,
    });

    this.thereIsNewMessages = false;
    this.animateMessage = false;
  }

  onKeyDown() {
    const text = this.chatInput.value;

    if (text) {
      const newMessage: Message = {
        text,
        userName: localStorage.getItem('credentials') as string,
        // image: 'assets/images/user-1.png',
      };

      this.chat.sendMessage(newMessage);

      this.chatInput.setValue('');

      this.animateMessage = true;

      setTimeout(() => this.scrollDown(true), 0);
    }
  }
}
