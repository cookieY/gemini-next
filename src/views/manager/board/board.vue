<template>
  <PageHeader
    :title="$t('common.board')"
    :sub-title="$t('common.board.sub')"
  ></PageHeader>
  <a-card>
    <div id="mavon-editor-id"></div>
  </a-card>
</template>

<script lang="ts" setup>
  import PageHeader from '@/components/pageHeader/pageHeader.vue';
  import { Request } from '@/apis/board';
  import { onMounted, ref } from 'vue';
  import { AxiosResponse } from 'axios';
  import { Res } from '@/config/request';
  import Vditor from 'vditor';
  import 'vditor/dist/index.css';
  import { useI18n } from 'vue-i18n';
  import { defaultLang } from '@/lang';

  let instance: any;

  const editValue = ref('');

  const request = new Request();

  const { t } = useI18n();

  onMounted(() => {
    request.Get().then((res: AxiosResponse<Res<string>>) => {
      editValue.value = res.data.payload;
      instance = new Vditor('mavon-editor-id', {
        lang: defaultLang as any,
        height: 360,
        toolbarConfig: {
          pin: true,
        },
        counter: {
          enable: true,
        },
        preview: {
          delay: 500,
          theme: {
            current:
              localStorage.getItem('theme') === 'light' ? 'vs-light' : 'dark',
          },
          markdown: {
            sanitize: false,
          },
        },
        toolbar: [
          {
            hotkey: '⇧⌘S',
            name: 'sponsor',
            tipPosition: 's',
            tip: t('common.save'),
            className: 'right',
            icon: '<svg t="1647252531803" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1526" width="200" height="200"><path d="M665.6 332.8 665.6 128C665.6 113.86151 654.13849 102.4 640 102.4 625.86151 102.4 614.4 113.86151 614.4 128L614.4 332.8C614.4 346.93849 625.86151 358.4 640 358.4 654.13849 358.4 665.6 346.93849 665.6 332.8L665.6 332.8ZM640 51.2 819.2 51.2 793.6 25.6 793.6 384.133545C793.6 426.406699 759.102946 460.8 716.727898 460.8L281.672102 460.8C239.236715 460.8 204.8 426.413438 204.8 384.133545L204.8 25.6C204.8 11.46151 193.33849 0 179.2 0 165.06151 0 153.6 11.46151 153.6 25.6L153.6 384.133545C153.6 454.707134 210.976425 512 281.672102 512L716.727898 512C787.345461 512 844.8 454.718257 844.8 384.133545L844.8 25.6 844.8 0 819.2 0 640 0C625.86151 0 614.4 11.46151 614.4 25.6 614.4 39.73849 625.86151 51.2 640 51.2L640 51.2Z" p-id="1527"></path><path d="M844.8 972.8 128.081132 972.8C85.544157 972.8 51.2 938.575806 51.2 896.163853L51.2 100.711064 51.2 25.6 25.6 51.2 102.4 51.2 896.233363 51.2C938.580175 51.2 972.8 85.414085 972.8 127.868001L972.8 998.4C972.8 1012.53849 984.26151 1024 998.4 1024 1012.53849 1024 1024 1012.53849 1024 998.4L1024 127.868001C1024 57.135182 966.85523 0 896.233363 0L102.4 0 25.6 0 0 0 0 25.6 0 100.711064 0 896.163853C0 966.892966 57.307204 1024 128.081132 1024L844.8 1024C858.93849 1024 870.4 1012.53849 870.4 998.4 870.4 984.26151 858.93849 972.8 844.8 972.8L844.8 972.8Z" p-id="1528"></path></svg>',
            click() {
              request.Post(instance.getHTML());
            },
          },
          'emoji',
          'headings',
          'bold',
          'italic',
          'strike',
          'link',
          '|',
          'list',
          'ordered-list',
          'check',
          'outdent',
          'indent',
          '|',
          'quote',
          'line',
          'code',
          'inline-code',
          'insert-before',
          'insert-after',
          '|',
          // 'record',
          'table',
          '|',
          'undo',
          'redo',
          '|',
          'edit-mode',
          // 'content-theme',
          'code-theme',
          'export',
          {
            name: 'more',
            toolbar: ['fullscreen', 'both', 'preview', 'info', 'help'],
          },
        ],
        outline: {
          enable: true,
          position: 'left',
        },
        mode: 'ir',
        cache: {
          enable: false,
        },
        after: () => {
          instance.setValue(instance.html2md(editValue.value));
        },
        theme: localStorage.getItem('theme') === 'light' ? 'classic' : 'dark',
      });
    });
  });
</script>
