<template>
      <PageHeader :title="title.title" :subTitle="title.subTitle"></PageHeader>
      <a-back-top />
      <br>
      <a-row>
            <a-col :span="24">
                  <div id="app-container">
                        <div id="g2-customize-tooltip"></div>
                        <div id="g2-container"></div>
                  </div>
            </a-col>

      </a-row>
      <a-row>
            <a-menu mode="horizontal" v-model:selectedKeys="current">
                  <a-menu-item key="/comptroller/order/list">
                        <router-link to="/comptroller/order/record"> {{ $t('common.order') }}</router-link>
                  </a-menu-item>
                  <a-menu-item key="/comptroller/query/list">
                        <router-link to="/comptroller/query/list"> {{ $t('common.query') }}</router-link>
                  </a-menu-item>
            </a-menu>
      </a-row>
      <br>
      <router-view></router-view>

</template>

<script lang="ts" setup>
import { Request } from "@/apis/record";
import PageHeader from "@/components/pageHeader/pageHeader.vue";
import { Chart } from "@antv/g2"
import { onMounted, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { AxiosResponse } from "axios";
import { Res } from "@/config/request";
import inserCss from 'insert-css';

const { t } = useI18n()
const title = {
      title: t('record.title'),
      subTitle: ""
}

const current = ref<string[]>(['/comptroller/order/list']);

inserCss(`
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


#g2-customize-tooltip .tooltip-title {
  
}

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
`);

const count = ref({
      ddl: 0,
      dml: 0
})

const request = new Request

const OrderTypeChart = (id: string, data: any) => {

      const chart = new Chart({
            container: "g2-container",
            autoFit: true,
            height: 300

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
      const $tooltip = document.getElementById('g2-customize-tooltip') as HTMLElement;



      function getTooltipHTML (data) {
            const { title, items } = data;
            return `
                  <div class="tooltip-title">${title}</div>
                  <div class="tooltip-items">
                  ${items.map(datum => {
                  const color = datum.color;
                  const name = datum.name;
                  const value = datum.value;

                  return `
                        <div class="tooltip-item" style="border-left: 2px solid ${color}">
                        <div class="tooltip-item-name">${name}</div>
                        <div class="tooltip-item-value">${value} /per</div>
                       
                        </div>
        `;
            }).join('')}
    </div>
  `;

      }

      chart.on('afterrender', (e) => {

            // 获取最新值的数据

            const items = [
                  {
                        color: "#5B8FF9",
                        name: "DML",
                        value: "0",
                  }
            ]

            const data = {
                  title: '0000-00-00',
                  items
            }

            $tooltip.innerHTML = getTooltipHTML(data);
      });

      // tooltip 的更新
      chart.on('tooltip:change', (e) => {
            $tooltip.innerHTML = getTooltipHTML(e.data);
      });


      chart.render();

}

onMounted(() => {
      request.Axis().then((res: AxiosResponse<Res<any>>) => {
            OrderTypeChart('container', res.data.payload.order)
            count.value = res.data.payload.count
      })

})

</script>