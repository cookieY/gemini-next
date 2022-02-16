<template>
      <PageHeader :title="title.title" :subTitle="title.subTitle"></PageHeader>
      <a-row type="flex" justify="space-around" align="middle">
            <a-col :span="12">
                  <a-statistic title="工单数" :value="1128">
                        <template #suffix>
                              <like-outlined />
                        </template>
                  </a-statistic>
            </a-col>
            <a-col :span="12">
                  <a-statistic title="查询数" :value="93">
                        <template #suffix>
                              <span>/ 100</span>
                        </template>
                  </a-statistic>
            </a-col>
      </a-row>
      <a-row>
            <a-col span="12">
                  <div id="container"></div>
            </a-col>
            <a-col :span="12">
                  <div id="container1"></div>
            </a-col>
      </a-row>
      <a-row>
            <a-tabs>
                  <a-tab-pane key="1" tab="工单"></a-tab-pane>
                  <a-tab-pane key="2" tab="查询"></a-tab-pane>
            </a-tabs>
      </a-row>
</template>

<script lang="ts" setup>
import PageHeader from "@/components/pageHeader/pageHeader.vue";
import { Chart } from "@antv/g2"
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n()
const title = {
      title: t('record.title'),
      subTitle: t('record.subtitle')
}

const deadline = new Date()

const OrderTypeChart = (id: string, data: any) => {
      const chart = new Chart({
            container: id,
            autoFit: true,
            height: 400,
      });

      chart.data(data);

      chart.coordinate('theta', {
            radius: 0.85
      });

      chart.scale('percent', {
            formatter: (val) => {
                  val = val * 100 + '%';
                  return val;
            },
      });
      chart.tooltip({
            showTitle: false,
            showMarkers: false,
      });
      chart.axis(false); // 关闭坐标轴
      const interval = chart
            .interval()
            .adjust('stack')
            .position('percent')
            .color('item')
            .label('percent', {
                  offset: -40,
                  style: {
                        textAlign: 'center',
                        shadowBlur: 2,
                        shadowColor: 'rgba(0, 0, 0, .45)',
                        fill: '#fff',
                  },
            })
            .tooltip('item*percent', (item, percent) => {
                  percent = percent * 100 + '%';
                  return {
                        name: item,
                        value: percent,
                  };
            })
            .style({
                  lineWidth: 1,
                  stroke: '#fff',
            });
      chart.interaction('element-single-selected');
      chart.render();

      // 默认选择
      interval.elements[0].setState('selected', true);
}

onMounted(() => {
      const data = [
            { item: '事例一', count: 40, percent: 0.4 },
            { item: '事例二', count: 21, percent: 0.21 },
            { item: '事例三', count: 17, percent: 0.17 },
            { item: '事例四', count: 13, percent: 0.13 },
            { item: '事例五', count: 9, percent: 0.09 },
      ];
      OrderTypeChart('container', data)
      OrderTypeChart('container1', data)
})

</script>