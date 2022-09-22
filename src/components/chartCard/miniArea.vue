<template>
  <div class="antv-chart-mini">
    <div class="chart-wrapper">
      <div :id="props.containerId"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { Chart } from '@antv/g2';
  import dayjs from 'dayjs';

  const RandomData = () => {
    let data = [] as { [key: string]: any }[];
    for (let i = 0; i < 10; i++) {
      data.push({
        x: dayjs(
          new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * i)
        ).format('YYYY-MM-DD'),
        y: Math.round(Math.random() * 5),
      });
    }
    return data;
  };

  const props = defineProps<{
    containerId: string;
    color: string;
  }>();

  onMounted(() => {
    const chart = new Chart({
      container: props.containerId,
      autoFit: true,
      height: 46,
      // padding: [36, 0, 18, 0]
    });
    chart.forceFit();
    chart.axis(false);
    chart.data(RandomData());
    chart.tooltip({
      showCrosshairs: true,
      shared: true,
    });

    chart.line().position('x*y').shape('smooth');
    chart.area().position('x*y').shape('smooth');
    chart.theme({ styleSheet: { brandColor: props.color } });
    chart.render();
  });
</script>

<style lang="less" scoped>
  @import './chart.less';
</style>
