<template>
  <div :id="props.containerId"></div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { Chart } from '@antv/g2';
  import { getTopContext } from '@/apis/dash';

  const props = defineProps<{
    containerId: string;
    color: string;
  }>();

  onMounted(async () => {
    const { data } = await getTopContext();
    const chart = new Chart({
      container: props.containerId,
      autoFit: true,
      height: 450,
    });
    chart.data(data.payload);
    chart.scale({
      value: {
        alias: 'SQL执行数',
      },
    });
    chart.axis('source', {
      title: null,
      tickLine: null,
      line: null,
    });

    chart.axis('count', false);
    chart.legend(false);
    chart.coordinate().transpose();
    chart.interval().position('source*count').size(26);
    chart.interaction('element-active');
    chart.theme({ styleSheet: { brandColor: props.color } });
    chart.render();
  });
</script>

<style lang="less" scoped>
  @import 'chart.less';
</style>
