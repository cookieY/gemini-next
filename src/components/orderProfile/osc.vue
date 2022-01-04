<template>
      <div id="terminal"></div>
</template>
<script lang="ts" setup>
import { Terminal } from 'xterm';
import { onMounted, ref } from "vue"
import 'xterm/css/xterm.css'

const term = new Terminal()

onMounted(() => {
      const cols: number = Math.floor((document.body.clientWidth - 250) / 10)
      const rows: number = Math.floor((600 - 80) / 16)
      term.resize(cols, rows)
      term.open(document.getElementById('terminal') as HTMLElement);
      term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
})

</script>

<style>
</style>