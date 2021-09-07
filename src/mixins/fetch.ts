import { FetchDBNameApis, DBRelated, Timeline, FetchTimelineApis, FetchTableApis } from "@/apis/fetchDB"
import { Res, request, COMMON_URI } from "@/config/request"
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

      const FetchStepUsege = (work_id: string) => {
            return request({
                  method: "GET",
                  url: `${COMMON_URI}/fetch/steps`,
                  params: {
                        work_id: work_id
                  }
            })
      }

      const FetchProfileSQL = (work_id: string, limit: string) => {
            return request({
                  method: "GET",
                  url: `${COMMON_URI}/fetch/sql`,
                  params: {
                        work_id: work_id,
                        limit: limit
                  }
            })
      }

      const FetchDBName = async (source: string) => {
            await FetchDBNameApis(source).then((res: AxiosResponse<Res<DBRelated>>) => {
                  orderProfileArch.db = res.data.payload.results
                  editor.value.RunEditor(res.data.payload.highlight)
            })
      }

      const FetchTimeline = (idc: string) => {
            FetchTimelineApis(idc).then((res: AxiosResponse<Res<Timeline[]>>) => {
                  res.data.code === 5555 ? router.go(-1) : orderProfileArch.timeline = res.data.payload
            })
      }

      const FetchTableName = (source: string, data_base: string,) => {
            FetchTableApis(source, data_base).then((res: AxiosResponse<Res<DBRelated>>) => {
                  orderProfileArch.table = res.data.payload.results
                  editor.value.RunEditor(res.data.payload.highlight)
            })
      }

      return { orderProfileArch, editor, FetchDBName, FetchTimeline, FetchTableName, FetchStepUsege, FetchProfileSQL }

}