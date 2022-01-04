import { FetchDBNameApis, DBRelated, Timeline, FetchTableApis, Request } from "@/apis/fetchSchema"
import { Res, request, COMMON_URI } from "@/config/request"
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

      const FetchTableName = (source: string, data_base: string,) => {
            FetchTableApis(source, data_base).then((res: AxiosResponse<Res<DBRelated>>) => {
                  orderProfileArch.table = res.data.payload.results
                  editor.value.RunEditor(res.data.payload.highlight)
            })
      }

      const fetchRequest = new Request

      return { orderProfileArch, editor, FetchDBName, FetchTableName, FetchStepUsege, FetchProfileSQL, fetchRequest }

}