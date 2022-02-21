import { COMMON_URI } from "@/config/request"
import { useStore } from "@/store"


export default class WsSocket {

      url: string
      socket: WebSocket
      scheme: string
      timer: any


      constructor(prefix: string) {
            document.location.protocol === "https:" ? this.scheme = "wss://" : this.scheme = "ws://"
            // this.url = `${this.scheme}${document.location.host}${prefix}`
            this.url = `${this.scheme}127.0.0.1:8000${COMMON_URI}${prefix}`
            this.socket = null as any
            this.timer = null
      }

      create () {
            const store = useStore()
            this.socket = new WebSocket(this.url, store.state.user.account.token)
            this.socket.onerror = this.close
            this.socket.onclose = this.close
      }

      race (impl: ((this: WebSocket, ev: MessageEvent) => any) | null) {
            this.socket.onmessage = impl
      }

      ping () {
            let vm = this
            this.timer = setInterval(() => {
                  vm.socket?.send("0")
            }, 2000)
      }

      send (data: string | ArrayBufferLike | Blob | ArrayBufferView) {
            if (this.socket?.readyState === 1) {
                  this.socket.send(data)
            }
      }

      close () {
            clearInterval(this.timer)
            this.socket?.close()
      }
}
