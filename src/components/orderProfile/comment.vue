<template>
      <a-list
            id="comment"
            style=" height: 300px;overflow:auto"
            :header="$t('common.count', { 'count': data.length })"
            item-layout="horizontal"
            :data-source="data"
      >
            <template #renderItem="{ item }">
                  <a-list-item>
                        <a-comment :author="item.username" :avatar="icon">
                              <template #content>
                                    <p>{{ item.content }}</p>
                              </template>
                              <template #datetime>
                                    <a-tooltip :title="item.time">
                                          <span>{{ dayjs(item.time).fromNow() }}</span>
                                    </a-tooltip>
                              </template>
                        </a-comment>
                  </a-list-item>
            </template>
      </a-list>
      <a-comment>
            <a-avatar slot="avatar" src="/src/assets/comment/rockets.svg" />
            <div slot="content"></div>
      </a-comment>
      <a-form>
            <a-form-item>
                  <a-textarea :rows="4" v-model:value="content" />
            </a-form-item>
            <a-form-item>
                  <a-button
                        html-type="submit"
                        type="primary"
                        @click="postComment"
                  >{{ $t('order.profile.comment.add') }}</a-button>
            </a-form-item>
      </a-form>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Comment, Request } from "@/apis/orderPostApis"
import { onMounted, ref, nextTick, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import Socket from "@/socket"
import { useStore } from '@/store';

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat)

const { t } = useI18n()

const props = defineProps<{
      work_id: string
}>()

const icon = "/src/assets/comment/comment.svg"

const request = new Request

const data = ref<Comment[]>([])

const content = ref("")

let sock: Socket | null = null

const scrollTop = () => {
      let h = document.getElementById("comment") as HTMLElement
      h.scrollTop = h.scrollHeight
}

const store = useStore()

const postComment = () => {
      request.CommentPost({ work_id: props.work_id, content: content.value }).then(() => {
            data.value.push({ username: store.state.user.account.user, time: dayjs().format("YY-MM-DD HH:mm"), content: content.value, work_id: props.work_id } as Comment)
            content.value = ""
            scrollTop()
      })
}

const currentPage = (e: any) => {
      data.value = JSON.parse(e.detail.data)
}

onMounted(() => {
      window.addEventListener('comment', currentPage)
      sock = new Socket(`/fetch/comment?work_id=${props.work_id}`, "comment")
      sock.create()
      nextTick(() => {
            scrollTop()
      })
})

onUnmounted(() => {
      window.removeEventListener('comment', currentPage)
      sock?.send("1")
      sock?.close()

})

</script>