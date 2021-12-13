<template>
      <div id="node"></div>
</template>

<script lang="ts" setup>

import G6, { GraphOptions } from "@antv/g6"

const colorMap = {
      A: '#72CC4A',
      B: '#1A91FF',
      C: '#FFAA15',
}

const data = {
      nodes: [
            {
                  id: '1',
                  label: 'Company1',
            },
            {
                  id: '2',
                  label: 'Company2',
            },
            {
                  id: '3',
                  label: 'Company3',
            },
            {
                  id: '4',
                  label: 'Company4',
            },
            {
                  id: '5',
                  label: 'Company5',
            },
            {
                  id: '6',
                  label: 'Company6',
            },
            {
                  id: '7',
                  label: 'Company7',
            },
            {
                  id: '8',
                  label: 'Company8',
            },
            {
                  id: '9',
                  label: 'Company9',
            },
      ],
      edges: [
            {
                  source: '1',
                  target: '2',
                  data: {
                        type: 'A',
                        amount: '100,000 Yuan',
                        date: '2019-08-03',
                  },
            },
            {
                  source: '1',
                  target: '3',
                  data: {
                        type: 'B',
                        amount: '100,000 Yuan',
                        date: '2019-08-03',
                  },
            },
            {
                  source: '2',
                  target: '5',
                  data: {
                        type: 'C',
                        amount: '100,000 Yuan',
                        date: '2019-08-03',
                  },
            },
            {
                  source: '5',
                  target: '6',
                  data: {
                        type: 'B',
                        amount: '100,000 Yuan',
                        date: '2019-08-03',
                  },
            },
            {
                  source: '3',
                  target: '4',
                  data: {
                        type: 'C',
                        amount: '100,000 Yuan',
                        date: '2019-08-03',
                  },
            },
            {
                  source: '4',
                  target: '7',
                  data: {
                        type: 'B',
                        amount: '100,000 Yuan',
                        date: '2019-08-03',
                  },
            },
            {
                  source: '1',
                  target: '8',
                  data: {
                        type: 'B',
                        amount: '100,000 Yuan',
                        date: '2019-08-03',
                  },
            },
            {
                  source: '1',
                  target: '9',
                  data: {
                        type: 'C',
                        amount: '100,000 Yuan',
                        date: '2019-08-03',
                  },
            },
      ],
};

defineProps<{
      width: number
}>()

const graph = new G6.Graph({
      container: 'node',
      modes: {
            default: ['drag-canvas', 'zoom-canvas', 'drag-node'], // 允许拖拽画布、放缩画布、拖拽节点
      }
} as GraphOptions)

</script>