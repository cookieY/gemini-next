import { COMMON_URI } from "@/config/request"


export default class WsSocket {

      url: string
      socket: WebSocket | null
      scheme: string
      eventName: string
      timer: any

      constructor(prefix: string, eventName: string) {
            document.location.protocol === "https:" ? this.scheme = "wss://" : this.scheme = "ws://"
            // this.url = `${this.scheme}${document.location.host}${prefix}`
            this.url = `${this.scheme}127.0.0.1:8000${COMMON_URI}${prefix}`
            this.eventName = eventName
            this.socket = null
            this.timer = null
      }

      create () {
            this.socket = new WebSocket(this.url)
            this.socket.onmessage = this.recv.bind(this)
            this.socket.onerror = this.close
            this.socket.onclose = this.close
            let vm = this
            this.timer = setInterval(() => {
                  vm.socket?.send("0")
            }, 1000)

      }

      recv (e: any) {
            window.dispatchEvent(new CustomEvent(this.eventName, {
                  detail: {
                        data: e.data
                  }
            }))
      }

      send (data: string) {
            if (this.socket?.readyState === 1) {
                  this.socket.send(data)
            }
      }

      close () {
            clearInterval(this.timer)
            this.socket?.send("1")
            this.socket?.close()
      }
}
