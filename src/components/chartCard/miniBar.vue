<template>
      <div :id="props.containerId"></div>
</template>

<script lang="ts"  setup>
import { onMounted, ref } from "vue"
import { Chart } from "@antv/g2"
import { Request } from "@/apis/dash";
import { AxiosResponse } from "axios";
import { Res } from "@/config/request";

const props = defineProps<{
      containerId: string,
      color: string,
}>()
const request = new Request

onMounted(() => {
      request.Top().then((res: AxiosResponse<Res<any>>) => {
            const chart = new Chart({
                  container: props.containerId,
                  autoFit: true,
                  height: 450
            });
            chart.data(res.data.payload);
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
            chart
                  .interval()
                  .position('source*count')
                  .size(26)
            chart.interaction('element-active');
            chart.theme({ "styleSheet": { "brandColor": props.color, } })
            chart.render();
      })

})

</script>

<style lang="less" scoped>
@import "chart.less";
</style>