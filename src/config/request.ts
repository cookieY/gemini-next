import axios, { AxiosInstance } from "axios"
import { notification } from "ant-design-vue";
import { store } from "@/store"
import router from "@/router";


interface Res<T> {
      code: number;
      text: string;
      payload: T;
}

const ACCESS_TOKEN = sessionStorage.getItem("jwt")

const COMMON_URI = "/api/v2"

const request: AxiosInstance = axios.create({
      timeout: 200000,
      headers: {
            'Content-Type': 'application/json'
      },
      baseURL: "http://127.0.0.1:8001"
})

const errorHandler = (error: { response: { data: { message: string }; status: number } }) => {
      if (error.response) {
            if (error.response.status === 401) {
                  notification.error({
                        message: '会话过期',
                        description: '会话已失效,请返回登陆页面重新登录！'
                  })
                  router.replace("/login")
                  return Promise.reject(error)
            }
            const data = error.response.data
            notification.error({
                  message: `状态码:${error.response.status}`,
                  description: data.message
            })
      }
      return Promise.reject(error)
}

const responseInject = (res: Res<never>) => {
      if (res.text !== '' && res.code === 1200) {
            notification.info({
                  message: '状态码:1200',
                  description: res.text
            })
      }

      if (res.code > 1200) {
            notification.error({
                  message: `状态码:${res.code}`,
                  description: res.text
            })
      }

}

request.interceptors.request.use(config => {
      if (ACCESS_TOKEN !== null) {
            config.headers['Authorization'] = ACCESS_TOKEN
      }
      return config
}, errorHandler)

request.interceptors.response.use((response) => {
      responseInject(response.data)
      return response
}, errorHandler)

const overrideHeaders = () => { request.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.user.account.token }

export {
      request, COMMON_URI, overrideHeaders, Res
}