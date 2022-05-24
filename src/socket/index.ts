import { COMMON_URI } from "@/config/request"
import { useStore } from "@/store"
import { encode } from "@msgpack/msgpack";


export default class WsSocket {

      url: string
      socket: WebSocket
      scheme: string
      timer: any
      checkTime: any
      token: string



      constructor(prefix: string) {
            let baseURL = ""
            const store = useStore()
            import.meta.env.MODE === "dev" ? baseURL = "127.0.0.1:8000" : baseURL = document.location.host
            document.location.protocol === "https:" ? this.scheme = "wss://" : this.scheme = "ws://"
            this.url = `${this.scheme}${baseURL}${COMMON_URI}${prefix}`
            this.socket = null as any
            this.timer = null
            this.checkTime = null
            this.token = store.state.user.account.token

      }

      isClose (): boolean {
            return this.socket.readyState === this.socket.CLOSED
      }

      check () {
            let vm = this
            this.checkTime = setInterval(() => {
                  if (vm.isClose()) {
                        vm.create()
                  }
            }, 1000)
      }

      msgping () {
            let vm = this
            this.timer = setInterval(() => {
                  const encoded: Uint8Array = encode({ "heartbeat": 1 });
                  vm.socket?.send(encoded)
            }, 2000)
      }

      create () {
            this.socket = new WebSocket(this.url, this.token)
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
            clearInterval(this.checkTime)
            this.socket?.close()
      }
}
