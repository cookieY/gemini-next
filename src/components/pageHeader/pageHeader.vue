<template>

      <a-page-header :title="props.title" @back="() => $router.go(-1)" :ghost="false">
            <span style="opacity: 0.8;">{{ props.subTitle }}</span>
      </a-page-header>
      <div style="margin-top:5px"></div>


</template>
<script lang="ts" setup>


const props = defineProps<{
      title: string,
      subTitle: string
}>()

</script>