import { FetchDBNameApis, DBRelated, Timeline, FetchTimelineApis, FetchTableApis } from "@/apis/fetchDB"
import { Res } from "@/config/request"
import router from "@/router"
import { AxiosResponse } from "axios"
import { reactive, ref } from "vue"

export default function () {

      const orderProfileArch = reactive({
            db: [] as string[],
            table: [] as string[],
            timeline: [] as Timeline[]
      })

      const editor = ref()

      const FetchDBName = (source: string) => {
            FetchDBNameApis(source).then((res: AxiosResponse<Res<DBRelated>>) => {
                  orderProfileArch.db = res.data.payload.results
                  editor.value.RunEditor(res.data.payload.highlight)
            })
      }

      const FetchTimeline = (idc: string) => {
            FetchTimelineApis(idc).then((res: AxiosResponse<Res<Timeline[]>>) => {
                  res.data.code === 5555 ? router.go(-1) : orderProfileArch.timeline = res.data.payload
            })
      }

      const FetchDBTable = (source: string, data_base: string,) => {
            FetchTableApis(source, data_base).then((res: AxiosResponse<Res<DBRelated>>) => {
                  orderProfileArch.table = res.data.payload.results
                  editor.value.RunEditor(res.data.payload.highlight)
            })
      }

      return { orderProfileArch, editor, FetchDBName, FetchTimeline, FetchDBTable }

}