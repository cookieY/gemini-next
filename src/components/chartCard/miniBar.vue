<template>
      <div :id="props.containerId"></div>
</template>

<script lang="ts"  setup>
import { onMounted } from "@vue/runtime-core"
import { Chart } from "@antv/g2"
import dayjs from 'dayjs';

const props = defineProps<{
      containerId: string,
      color: string
}>()

const Randomdata = () => {
      let data = [] as { [key: string]: any }[]
      for (let i = 0; i < 10; i++) {
            data.push({
                  x: dayjs(new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
                  y: Math.round(Math.random() * 5)
            })
      }
      return data
}

onMounted(() => {
      const chart = new Chart({
            container: props.containerId,
            autoFit: true,
            height: 450
      });
      chart.data(Randomdata());
      chart.axis('x', {
            title: null,
            tickLine: null,
            line: null,
      });

      chart.axis('y', false);
      chart.coordinate().transpose();
      chart
            .interval()
            .position('x*y')
            .size(26)
      chart.interaction('element-active');
      chart.theme({ "styleSheet": { "brandColor": props.color, } })
      chart.render();
})

</script>

<style lang="less" scoped>
@import "chart.less";
</style>