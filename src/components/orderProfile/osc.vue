<template>
      <pre style="height: 500px; overflow: auto;">
            {{ pre }}
      </pre>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue"
import Socket from "@/socket"
import { useStore } from "@/store";

const pre = ref("")

const store = useStore()


const props = defineProps<{
      work_id: string
}>()

let sock: Socket | null = null

const recv = (e: any) => {
      pre.value = e.data
}

onMounted(() => {
      sock = new Socket(`/audit/order/osc?work_id=${props.work_id}`, store.state.user.account.token)
      sock.create()
      sock.race(recv)
      sock.ping()
})

onUnmounted(() => {
      sock?.send("1")
      sock?.close()

})
</script>

<style>
</style>