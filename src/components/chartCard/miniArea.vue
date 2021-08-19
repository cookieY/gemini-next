<template>
      <div class="antv-chart-mini">
            <div class="chart-wrapper">
                  <div :id="props.containerId"></div>
            </div>
      </div>
</template>
<script setup lang="ts">
import { onMounted } from "@vue/runtime-core"
import { Chart } from "@antv/g2"
import moment from "moment"

const Randomdata = () => {
      let data = [] as { [key: string]: any }[]
      for (let i = 0; i < 10; i++) {
            data.push({
                  x: moment(new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
                  y: Math.round(Math.random() * 10)
            })
      }
      return data
}

const props = defineProps<{
      containerId: string,
      color: string
}>()


onMounted(() => {
      const chart = new Chart({
            container: props.containerId,
            autoFit: true,
            height: 70,
      });
      chart.data(Randomdata());
      chart.data(Randomdata());
      chart.axis(false);
      chart.line().position('x*y').shape('smooth');
      chart.area().position('x*y').shape('smooth')
      chart.theme({ "styleSheet": { "brandColor": props.color, } })
      chart.render();
})

</script>

<style lang="less">
.antv-chart-mini {
      position: relative;
      width: 100%;

      .chart-wrapper {
            position: absolute;
            bottom: -28px;
            width: 100%;
      }
}
</style>