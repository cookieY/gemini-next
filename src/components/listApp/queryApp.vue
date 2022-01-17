<template>
      <a-spin :spinning="loading"></a-spin>
</template>


<script lang="ts" setup>

import { FetchSourceApis } from "@/apis/listAppApis"
import { Res } from "@/config/request"
import { AxiosResponse } from "axios"
import { onMounted, ref } from "vue"

const loading = ref(false)

</script>