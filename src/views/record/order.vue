<template>
      <PageHeader :title="title.title" :subTitle="title.subTitle"></PageHeader>
      <a-row type="flex" justify="space-around" align="middle">
            <div id="app-container">
                  <div id="g2-customize-tooltip">
                        <div class="tooltip-title">${title}</div>
                        <div class="tooltip-items">
                              <div class="tooltip-item" style="border-left: 2px solid ${color}">
                                    <div class="tooltip-item-name">${name}</div>
                                    <div class="tooltip-item-value">${value} °C</div>
                                    <div class="tooltip-item-info">
                                          <div class="info-item">
                                                <div class="info-item-name">最新值</div>
                                                <div class="info-item-value">9.6</div>
                                          </div>
                                          <div class="info-item">
                                                <div class="info-item-name">平均值</div>
                                                <div class="info-item-value">4.8</div>
                                          </div>
                                          <div class="info-item">
                                                <div class="info-item-name">最大值</div>
                                                <div class="info-item-value">16.9</div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      </a-row>
      <br>
      <a-row>
            <a-col :span="24">
                  <div id="container"></div>
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
import { Request } from "@/apis/record";
import PageHeader from "@/components/pageHeader/pageHeader.vue";
import { Chart } from "@antv/g2"
import { LikeOutlined } from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { AxiosResponse } from "axios";
import { Res } from "@/config/request";
const { t } = useI18n()
const title = {
      title: t('record.title'),
      subTitle: ""
}

const count = ref({
      ddl: 0,
      dml: 0
})

const request = new Request

const OrderTypeChart = (id: string, data: any) => {

      const chart = new Chart({
            container: id,
            autoFit: true,
            height: 300,
      });

      chart.data(data);
      chart.scale({
            count: {
                  nice: true,
            },
            type: {
                  formatter: (value) => {
                        if (value === '0') {
                              return 'DDL'
                        }
                        if (value === '1') {
                              return 'DML'
                        }
                  }
            }
      });
      chart.tooltip({
            showCrosshairs: true,
            shared: true,
      });

      chart.axis("count", {
            label: {
                  formatter: (val) => {
                        return val + ' /per';
                  },
            },
            grid: {
                  line: {
                        style: {
                              opacity: 0
                        }
                  }
            }
      });

      chart
            .line()
            .position('time*count')
            .color('type')
            .shape('smooth');

      chart
            .point()
            .position('time*count')
            .color('type')
            .shape('circle');

      // customize tooltip



      // chart.on('afterrender', (e) => {
      //       const elements = e.view.getElements();
      //       console.log(111, elements);
      //       // 获取最新值的数据

      //       $tooltip.innerHTML = getTooltipHTML(data);
      // });

      // chart.on('tooltip:change', (e) => {
      //       $tooltip.innerHTML = getTooltipHTML(e.data);
      // });


      chart.render();

}

onMounted(() => {
      request.Axis().then((res: AxiosResponse<Res<any>>) => {
            OrderTypeChart('container', res.data.payload.order)
            count.value = res.data.payload.count
      })

})

</script>

<style lang="less" scoped>
#app-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
}

#g2-container {
      flex: auto;
}

#g2-customize-tooltip {
      margin-bottom: 16px;
      font-size: 12px;
}


#g2-customize-tooltip .tooltip-title {}

#g2-customize-tooltip .tooltip-items {
      display: flex;
      flex-direction: row;
}

#g2-customize-tooltip .tooltip-item {
      flex-basis: 240px;
      padding-left: 8px;
      margin-right: 12px;
}

#g2-customize-tooltip .tooltip-item .tooltip-item-value {
      font-size: 16px;
      font-weight: bold;
}



#g2-customize-tooltip .tooltip-item-info {
      display: flex;
      justify-content: space-between;
}

#g2-customize-tooltip .tooltip-item-info .info-item {
      display: flex;
}

#g2-customize-tooltip .tooltip-item-info .info-item .info-item-name {
      opacity: 0.65;
}

#g2-customize-tooltip .tooltip-item-info .info-item .info-item-value {
      margin-left: 8px;
}
</style>