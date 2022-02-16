<template>
      <a-modal v-model:visible="is_open" :title="title" @ok="saveHandle">
            <a-form>
                  <a-form-item :label="$t('query.clip.title')">
                        <a-input v-model:value="clip.title"></a-input>
                  </a-form-item>
                  <a-form-item :label="$t('query.clip.desc')">
                        <a-textarea v-model:value="clip.desc" :rows="6"></a-textarea>
                  </a-form-item>
            </a-form>
      </a-modal>
</template>

<script lang="ts" setup>import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import CommonMixins from '@/mixins/common'
import { message } from 'ant-design-vue';

const { is_open, turnState } = CommonMixins()

const { t } = useI18n()

const clip = reactive({
      title: "",
      desc: ""
})

const title = t('common.new') + t('common.clip')

const saveHandle = () => {
      let l = localStorage.getItem('clip')
      if (l !== null) {
            let p = JSON.parse(l)
            if (p.length >= 6) {
                  return message.error(t('query.clip.overflow'))
            }
            p.push(clip)
            localStorage.setItem('clip', JSON.stringify(p))
      } else {
            localStorage.setItem('clip', JSON.stringify([clip]))
      }
      turnState()
}

defineExpose({
      turnState
})

</script>