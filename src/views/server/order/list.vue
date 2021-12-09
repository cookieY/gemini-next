<template>
      <PageHeader :title="title.title" :subTitle="title.subTitle"></PageHeader>
      <OrderTable></OrderTable>
</template>
<script lang="ts"  setup>
import { ref } from "@vue/runtime-core";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { checkTitle } from "./impl"
import PageHeader from "@/components/pageHeader/pageHeader.vue";
import OrderTable from "@/components/table/orderTable.vue";


const route = useRoute()

let title = ref(checkTitle(route.params.tp as string))

onBeforeRouteUpdate((to) => {
      title.value = checkTitle(to.params.tp as string)
})

</script>