<template>
  <div class="antv-chart-mini">
    <div class="chart-wrapper">
      <div :id="props.containerId"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Chart } from '@antv/g2';
  const props = defineProps<{
    containerId: string;
    color: string;
    type: string;
  }>();

  const Randomdata = (total: any[]) => {
    let data = [] as { [key: string]: any }[];
    for (let i of total) {
      data.push({
        x: i.date,
        totals: props.type === 'query' ? i.total_query : i.total_order,
      });
    }
    return data;
  };

  const makeBuild = (total: any[]) => {
    const chart = new Chart({
      container: props.containerId,
      autoFit: true,
      height: 46,
      // padding: [36, 0, 18, 0]
    });
    chart.forceFit();
    chart.axis(false);
    chart.data(Randomdata(total));
    chart.tooltip({
      showCrosshairs: true,
      shared: true,
    });

    chart.line().position('x*totals').shape('smooth');
    chart.area().position('x*totals').shape('smooth');
    chart.theme({ styleSheet: { brandColor: props.color } });
    chart.render();
  };

  defineExpose({
    makeBuild,
  });
</script>

<style lang="less" scoped>
  @import './chart.less';
</style>
