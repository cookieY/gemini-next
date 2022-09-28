<template>
  <div>
    <a-row :gutter="24">
      <a-col :xs="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <ChartCard
          :loading="loading"
          :title="$t('common.order') + $t('common.sum')"
          :total="banner.order"
        >
          <template #action>
            <InfoCircleOutlined />
          </template>
          <template #content>
            <MiniArea container-id="order" color="#2094F3" />
          </template>
        </ChartCard>
      </a-col>
      <a-col :xs="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <ChartCard
          :loading="loading"
          :title="$t('common.query') + $t('common.sum')"
          :total="banner.query"
        >
          <template #action>
            <InfoCircleOutlined />
          </template>
          <template #content>
            <MiniArea container-id="query" color="#Ff9900" />
          </template>
        </ChartCard>
      </a-col>
      <a-col :xs="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <ChartCard
          :loading="loading"
          :title="$t('common.table.source') + $t('common.sum')"
          :total="banner.source"
        >
          <template #action>
            <InfoCircleOutlined />
          </template>
          <template #content>
            <MiniCol container-id="source" color="#009485" />
          </template>
        </ChartCard>
      </a-col>
      <a-col :xs="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <ChartCard
          :loading="loading"
          :title="$t('menu.manage.user') + $t('common.sum')"
          :total="banner.user"
        >
          <template #action>
            <InfoCircleOutlined />
          </template>
          <template #content>
            <a-progress
              :percent="85"
              status="active"
              :show-info="false"
              :stroke-width="15"
              :stroke-color="{
                '0%': '#108ee9',
                '100%': '#87d068',
              }"
            />
          </template>
        </ChartCard>
      </a-col>
    </a-row>

    <a-card style="text-align: center">
      <a-row :gutter="24">
        <a-col :xs="24" :md="12" :xl="6">
          <a-statistic
            :title="$t('common.bash.self.dml')"
            :value="banner.self_dml"
          />
        </a-col>
        <a-col :xs="24" :md="12" :xl="6">
          <a-statistic
            :title="$t('common.bash.self.ddl')"
            :value="banner.self_ddl"
          />
        </a-col>
        <a-col :xs="24" :md="12" :xl="6">
          <a-statistic
            :title="$t('common.bash.self.query')"
            :value="banner.self_query"
          />
        </a-col>
        <a-col :xs="24" :md="12" :xl="6">
          <a-statistic
            :title="$t('common.bash.self.audit')"
            :value="banner.self_audit"
          />
        </a-col>
      </a-row>
    </a-card>
    <br />
    <a-row :gutter="24">
      <a-col :xs="24" :md="24" :xl="16" :style="{ marginBottom: '24px' }">
        <a-card :title="$t('common.board')">
          <div v-html="boardContent" />
        </a-card>
      </a-col>
      <a-col :xs="24" :md="24" :xl="8" :style="{ marginBottom: '24px' }">
        <a-card :title="$t('common.table.source') + ' Top10'">
          <MiniBar container-id="trend" color="#Ff9900" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
  import ChartCard from '@/components/chartCard/chartCard.vue';
  import MiniArea from '@/components/chartCard/miniArea.vue';
  import MiniCol from '@/components/chartCard/miniCol.vue';
  import MiniBar from '@/components/chartCard/miniBar.vue';
  import { InfoCircleOutlined } from '@ant-design/icons-vue';
  import { getBannerContext } from '@/apis/dash';
  import { getBoardContext } from '@/apis/board';
  import { onMounted, ref } from 'vue';

  const loading = false;

  const banner = ref<any>([]);

  const boardContent = ref<string>('');

  const getBanner = async () => {
    const { data } = await getBannerContext();
    banner.value = data.payload;
  };

  const getBoard = async () => {
    const { data } = await getBoardContext();
    boardContent.value = data.payload;
  };

  onMounted(() => {
    getBanner();
    getBoard();
  });
</script>

<style>
  .v-note-wrapper .v-note-panel .v-note-show .v-show-content,
  .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
    color: aliceblue;
  }
</style>
