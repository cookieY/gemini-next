import { COMMON_URI } from '@/config/request';
import { encode } from '@msgpack/msgpack';

export default class WsSocket {
  url: string;
  socket: WebSocket;
  scheme: string;
  timer: any;
  checkTime: any;
  token: string;

  constructor(prefix: string, token: string) {
    let baseURL = '';
    import.meta.env.MODE === 'dev'
      ? (baseURL = '127.0.0.1:8000')
      : (baseURL = document.location.host);
    document.location.protocol === 'https:'
      ? (this.scheme = 'wss://')
      : (this.scheme = 'ws://');
    this.url = `${this.scheme}${baseURL}${COMMON_URI}${prefix}`;
    this.socket = null as any;
    this.timer = null;
    this.checkTime = null;
    this.token = token;
  }

  isClose(): boolean {
    return this.socket.readyState === this.socket.CLOSED;
  }

  check() {
    let flag = 0;
    this.checkTime = setInterval(() => {
      if (flag > 5) {
        return;
      }
      if (this.isClose()) {
        flag++;
        this.create();
        this.msginit();
        this.msgping();
      }
    }, 2000);
  }

  msgping() {
    this.timer = setInterval(() => {
      const encoded: Uint8Array = encode({ type: 3 });
      this.socket?.send(encoded);
    }, 5000);
  }

  msginit() {
    const inter = setInterval(() => {
      if (this.socket?.readyState === 1) {
        const encoded: Uint8Array = encode({ type: 2 });
        this.socket?.send(encoded);
        clearInterval(inter);
      }
    }, 1000);
  }

  create() {
    this.socket = new WebSocket(this.url, this.token);
    this.socket.onerror = this.close;
    this.socket.onclose = this.close;
  }

  race(impl: ((this: WebSocket, ev: MessageEvent) => any) | null) {
    this.socket.onmessage = impl;
  }

  ping() {
    this.timer = setInterval(() => {
      this.socket?.send('0');
    }, 2000);
  }

  send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
    if (this.socket?.readyState === 1) {
      this.socket.send(data);
    }
  }

  close() {
    clearInterval(this.timer);
    clearInterval(this.checkTime);
    this.socket?.close();
  }
}
