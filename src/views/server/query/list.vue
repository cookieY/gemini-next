<template>
      <PageHeader :title="title.title" :subTitle="title.subTitle"></PageHeader>
      <QuerySearch @search="(exp) => { expr.find = exp; currentPage() }"></QuerySearch>
      <Table :col="col" :t-data="tData" bordered @change="changePage"></Table>
</template>
<script lang="ts"  setup>
import { QueryExpr, QueryParams, QueryResp, Request } from "@/apis/query";
import PageHeader from "@/components/pageHeader/pageHeader.vue";
import Table from "@/components/table/table.vue";
import QuerySearch from "./querySearch.vue";
import { Res } from "@/config/request";
import { AxiosResponse } from "axios";
import { onMounted, reactive, ref } from "vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const request = new Request

let tData = ref<any[]>([])

const col = [
      {
            title: t('order.query.table.work_id'),
            dataIndex: "work_id"
      },
      {
            title: t('order.query.table.username'),
            dataIndex: "username"
      },
      {
            title: t('order.query.table.real_name'),
            dataIndex: "real_name"
      },
      {
            title: t('order.query.table.time'),
            dataIndex: "date"
      },
      {
            title: t('order.query.table.export'),
            dataIndex: "export"
      },
      {
            title: t('order.query.table.status'),
            dataIndex: "status"
      },
      {
            title: t('common.action'),
            dataIndex: "action"
      },
]

const title = {
      title: t('order.query.title'),
      subTitle: t('order.query.desc')
}

let expr = reactive<QueryParams>({
      page: 1,
      find: {
            work_id: "",
            username: "",
            status: 0
      } as QueryExpr
})

const changePage = (page: number) => {
      expr.page = page
      currentPage()
}


const currentPage = () => {
      request.List(expr).then((res: AxiosResponse<Res<any>>) => tData.value = res.data.payload.data)
}

onMounted(() => {
      currentPage()
})

</script>