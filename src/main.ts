import { createApp } from 'vue'
import App from './App.vue'
import routes from '@/router'
import Antd from 'ant-design-vue';
import { store, key } from '@/store/index'
import i18n from "@/lang"
import CTable from "@/components/table/index"

if (localStorage.getItem("theme") === null) {
      import("@/style/theme.less")
} else {
      if (localStorage.getItem("theme") === "dark") {
            import("@/style/theme.less")
      } else {
            import("@/style/light.less")
      }
}



createApp(App).directive(
      'watermark', (el, binding) => {
            addWaterMarker(binding.value.text)
      }).use(i18n).use(store, key).use(Antd).use(CTable).use(routes).mount('#app')

function addWaterMarker (text: string) {
      let id = '1.23452384164.123412415'
      if (document.getElementById(id) !== null) {
            document.body.removeChild(document.getElementById(id) as HTMLElement)
      }
      let can = document.createElement('canvas')
      // 设置canvas画布大小
      can.width = 200
      can.height = 100

      let cans = can.getContext('2d') as CanvasRenderingContext2D
      cans.rotate(-20 * Math.PI / 180) // 水印旋转角度
      cans.font = '20px Vedana'
      cans.fillStyle = '#4A4A4A'
      cans.textAlign = 'center'
      cans.textBaseline = 'middle'
      cans.fillText(text, can.width / 2, can.height) // 水印在画布的位置x，y轴

      let div = document.createElement('div')
      div.id = id
      div.style.pointerEvents = 'none'
      div.style.top = '40px'
      div.style.left = '0px'
      div.style.opacity = '0.1'
      div.style.position = 'fixed'
      div.style.zIndex = '100000'
      div.style.width = document.documentElement.clientWidth + 'px'
      div.style.height = document.documentElement.clientHeight + 'px'
      div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
      document.body.appendChild(div)

}