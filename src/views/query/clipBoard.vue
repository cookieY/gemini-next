<template>
  <a-card
    :title="clips.title"
    hoverable
    :body-style="{ height: '200px' }"
    size="small"
  >
    <template #extra>
      <a-space :size="15">
        <CopyOutlined
          :class="btnId"
          data-clipboard-action="copy"
          :data-clipboard-target="`#${barId}`"
        ></CopyOutlined>
        <CloseOutlined @click="delBtn" />
      </a-space>
    </template>
    <div @click="btnClip()">
      <div :id="barId">{{ clips.desc }}</div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
  import { Clip } from '@/types';
  import { message } from 'ant-design-vue';
  import ClipboardJS from 'clipboard';
  import { useI18n } from 'vue-i18n';
  import { CloseOutlined, CopyOutlined } from '@ant-design/icons-vue';

  const props = defineProps<{
    idRef: number;
    clips: Clip;
  }>();

  const emit = defineEmits(['delBtn']);

  const { t } = useI18n();

  const btnId = `copyBtn${props.idRef}`;

  const barId = `bar${props.idRef}`;

  const clipboard = new ClipboardJS(`.${btnId}`);

  const btnClip = () => {
    clipboard.on('success', (e) => {
      message.info(t('query.clip.is.paste'));
      e.clearSelection();
    });
  };

  const delBtn = () => {
    emit('delBtn', props.idRef);
  };
</script>
